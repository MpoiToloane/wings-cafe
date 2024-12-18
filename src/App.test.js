// src/AuthContext.js

import React, { createContext, useContext, useState } from 'react';

// Create context
const AuthContext = createContext();

// AuthProvider component
export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null); // Manage authentication state

    return (
        <AuthContext.Provider value={{ currentUser, setCurrentUser }}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook for using auth context
export const useAuth = () => {
    return useContext(AuthContext);
};