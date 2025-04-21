"use client"
import React, { useEffect, useState } from 'react';
import styles from '../patient-registration.module.css';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../context/context';

interface PatientData {
    name: string;
    age: string;
    phone: string;
    diseaseHistory: string;
    address: string;
}

export default function PatientRegistration() {
    const [step, setStep] = useState(1);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();
    const { checkAuth, user } = useAuth();
    const params = useParams();
    const { id } = params;
    const [patientData, setPatientData] = useState<PatientData>({
        name: '',
        age: '',
        phone: '',
        diseaseHistory: '',
        address: '',
    });
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
          router.push("/login");
          return;
        }
        console.log("user id",user?.id);
        setIsMounted(true);
      }, []);
    
      useEffect(() => {
        if (isMounted) {
          const initializeData = async () => {
            try {
              await checkAuth();
            } catch (error) {
              console.error("Error initializing data:", error);
            }
          };
          initializeData();
        }
      }, [isMounted]);
    const isStepValid = (step: number): boolean => {
        switch (step) {
            case 1:
                return (
                    patientData.name.trim() !== '' &&
                    patientData.age.trim() !== '' &&
                    patientData.phone.trim() !== '' &&
                    /^\d{10}$/.test(patientData.phone) &&
                    !isNaN(Number(patientData.age)) &&
                    Number(patientData.age) > 0
                );
            case 2:
                return patientData.diseaseHistory.trim() !== '';
            case 3:
                return patientData.address.trim() !== '';
            default:
                return false;
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setPatientData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const nextStep = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (isStepValid(step)) {
            setStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        setStep(prev => prev - 1);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (isStepValid(step)) {
            try{
                const urlParams = new URLSearchParams();

                const userId = user?.id;
                const token = localStorage.getItem("token");
                urlParams.append("userId", userId || '');
                urlParams.append("name", patientData.name);
                const checkpatient = await fetch(`http://localhost:3001/user/getPatient?${urlParams.toString()}`, {
                    method: 'GET',
                    credentials: "include",
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    },
                });
                const message = await checkpatient.json();
                console.log("message",message);
                if(checkpatient.ok){
                    alert("Patient already exists");
                    router.push(`/booking/${id}`);
                    return;
                }
                else{
                
                const response = await fetch('http://localhost:3001/user/patient', {
                    method: 'POST',
                    credentials: "include",
                    headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      name: patientData.name,
                      age: patientData.age,
                      phone: patientData.phone,
                      disease_history: patientData.diseaseHistory,
                      address: patientData.address,
                      userId: user?.id || ''
                    }),
                });
                console.log("patient data",patientData);
                console.log("user id",user?.id);
                if (response.ok) {
                    const data = await response.json();
                    console.log("patient data",data);
                    alert('Patient registration successful!');
                    router.push(`/booking/${id}`);
                } else {
                    const error = await response.json();
                    alert(error.error || 'Failed to register patient. Please try again.');
                }
            } }
            catch (error) {
                console.error('Error registering patient:', error);
                alert('An error occurred while registering. Please try again.');
            }
        }
    };
    
    const renderStep = () => {
        switch (step) {
            case 1:
                return (
                    <div className={styles.step}>
                        <h2>Step 1: Personal Information</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Full Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={patientData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="age">Age</label>
                            <input
                                type="number"
                                id="age"
                                name="age"
                                value={patientData.age}
                                onChange={handleChange}
                                required
                                min="1"
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="phone">Phone Number</label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={patientData.phone}
                                onChange={handleChange}
                                required
                                pattern="[0-9]{10}"
                                placeholder="10 digits only"
                            />
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className={styles.step}>
                        <h2>Step 2: Medical History</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="diseaseHistory">Disease History</label>
                            <textarea
                                id="diseaseHistory"
                                name="diseaseHistory"
                                value={patientData.diseaseHistory}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className={styles.step}>
                        <h2>Step 3: Address</h2>
                        <div className={styles.formGroup}>
                            <label htmlFor="address">Full Address</label>
                            <textarea
                                id="address"
                                name="address"
                                value={patientData.address}
                                onChange={handleChange}
                                rows={4}
                                required
                            />
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };
    if (!isMounted) return <div>Loading...</div>;
    return (
        <div className={styles.container}>
            <div className={styles.progressBar}>
                <div 
                    className={`${styles.progressStep} ${step >= 1 ? styles.active : ''}`}
                    onClick={() => setStep(1)}
                >
                    1
                </div>
                <div 
                    className={`${styles.progressStep} ${step >= 2 ? styles.active : ''}`}
                    onClick={() => setStep(2)}
                >
                    2
                </div>
                <div 
                    className={`${styles.progressStep} ${step >= 3 ? styles.active : ''}`}
                    onClick={() => setStep(3)}
                >
                    3
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                {renderStep()}
                
                <div className={styles.buttonGroup}>
                    {step > 1 && (
                        <button 
                            type="button" 
                            onClick={prevStep}
                            className={styles.button}
                        >
                            Back
                        </button>
                    )}
                    
                    {step < 3 ? (
                        <button 
                            type="button" 
                            onClick={nextStep}
                            className={`${styles.button} ${!isStepValid(step) ? styles.disabled : ''}`}
                            disabled={!isStepValid(step)}
                        >
                            Next
                        </button>
                    ) : (
                        <button 
                            type="submit" 
                            className={`${styles.button} ${!isStepValid(step) ? styles.disabled : ''}`}
                            disabled={!isStepValid(step)}
                        >
                            Submit
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
} 