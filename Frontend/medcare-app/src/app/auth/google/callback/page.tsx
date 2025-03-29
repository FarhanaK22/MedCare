"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../context/context";
import { jwtDecode }  from "jwt-decode";

export default function GoogleCallback() {
    const router = useRouter();
    const { setUser,setIsAuthenticated } = useAuth();

    useEffect(() => {
        const handleCallback = async () => {
            try {
                const urlParams = new URLSearchParams(window.location.search);
                const token = urlParams.get("token");

                if (!token) {
                    throw new Error("No token received");
                }

                document.cookie = `token=${token}; path=/; secure; samesite=strict`;
                localStorage.setItem("token", token);
                const user = jwtDecode(token);
                console.log(token) 
                setUser(user);
                setIsAuthenticated(true);
                    router.push("/");
                console.log("google user", user)
            } catch (error) {
                console.error("Google callback error:", error);
                router.push("/login");
            }
        };

        handleCallback();
    }, [router, setUser,setIsAuthenticated]);

    return (
        <div
            style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
                backgroundImage: "url('/LoginHero.png')",
                backgroundSize: "cover",
            }}
        >
            <div
                style={{
                    background: "rgba(255, 255, 255, 0.15)",
                    padding: "2rem",
                    borderRadius: "10px",
                    backdropFilter: "blur(16px)",
                    textAlign: "center",
                    color: "#0b4b2f",
                    fontWeight: "500",
                }}
            >
                Completing Google sign-in...
            </div>
        </div>
    );
}