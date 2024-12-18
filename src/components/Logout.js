// src/Logout.js
import React from 'react';
import { auth } from './firebaseConfig'; 
import { signOut } from 'firebase/auth';
import './styles.css';

function Logout({ onLogout }) {
    const handleLogout = async () => {
        if (window.confirm("Are you sure you want to log out?")) {
            try {
                await signOut(auth);
                onLogout();
                alert('Logout successful!');
            } catch (error) {
                console.error(error);
                alert('Logout failed. Please try again.');
            }
        }
    };

    return (
        <section id="logout">
            <h2>Logout</h2>
            <button onClick={handleLogout}>Logout</button>
        </section>
    );
}

export default Logout;