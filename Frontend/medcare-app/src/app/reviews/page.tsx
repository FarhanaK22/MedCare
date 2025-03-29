"use client"
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import star from "../../../public/images/Star.png"
import Image from 'next/image';
type Review = {
  rating_id: number;
  rating: number;
  comment: string;
  doctor_id: number;
  user_id: number;
};
export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const fetchReviews = async () => {
    try {
      const response = await fetch('http://localhost:3001/doctors/reviews');
      if (!response.ok) {
        throw new Error('Failed to fetch reviews');
      }
      const data = await response.json();
      setReviews(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [router]);

  // Handle navigation to doctor details page
  const handleDoctorClick = (id: number) => {
    router.push(`http://localhost:3000/doctor/${id}`);
  };

  return (
    <div 
    style={{ display: 'flex', flexDirection: 'column' 
    , margin:'20px auto',
    justifyContent: 'center',
    alignItems:'center',padding:"20px", color:"white"}}>
      <h1 style={{textAlign:'center',color:'#1C4A2A'}}>🩺Doctor Reviews</h1>
      {loading && <p style={{color:"white"}}>Loading reviews...</p>}
      {error && <p>Error: {error}</p>}
      {!loading && !error && reviews.length === 0 && <p>No reviews available.</p>}
      {!loading && !error && reviews.length > 0 && (
        <div>
          {reviews.map((review) => (
            <div key={review.rating_id}
             style={{width:'90%',color:"white",
                         backgroundColor:"#1C4A2A",
                         borderRadius:'10px', 
                         border:'none',
                          margin:'10px auto'
                          ,padding:'10px', lineHeight:'2'}}>
             <div style={{display:'flex', justifyContent:'space-between',alignItems:'baseline'
             }}>
             <h3
                onClick={() => handleDoctorClick(review.doctor_id)}
                style={{ cursor: 'pointer', textDecoration: 'none', color: 'white' }}
              >
                Doctor ID: {review.doctor_id}
              </h3>
              <p>Ratings :
                {Array.from({ length: Math.floor(review.rating|| 0) }).map((_, i) => (
                  <Image key={`star-${i}`} src={star} alt="star" height={17.5} width={17.5} />
                ))}</p>
             </div>
              <p style={{color:'voilet',fontWeight:'500'}}>Comment: {review.comment || 'No comment provided.'}
                <span style={{textAlign:'right', marginLeft:'20px'}}> | user-ID : {review.user_id}</span></p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
