// src/components/Login.js
import React, { useState } from 'react';
import { auth } from '../firebaseConfig';  // Adjusted import statement
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import './styles.css';

function Login({ onLogin }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isRegistering, setIsRegistering] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            await signInWithEmailAndPassword(auth, email, password);
            alert('Login successful!');
            window.location.href = '/';  // Redirect to home page after successful login
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            alert('Registration successful! You can now log in.');
            setIsRegistering(false);
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <section id="login">
            <h2>{isRegistering ? 'Register' : 'Login'}</h2>
            <form onSubmit={isRegistering ? handleRegister : handleLogin}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">{isRegistering ? 'Register' : 'Login'}</button>
            </form>
            <button onClick={() => setIsRegistering(!isRegistering)}>
                {isRegistering ? 'Have an account? Login' : 'No account? Register'}
            </button>
        </section>
    );
}

export default Login;