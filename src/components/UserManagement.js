import React, { useState, useEffect } from 'react';
import { db } from '../firebaseConfig';
import { collection, addDoc, updateDoc, deleteDoc, doc, getDocs } from 'firebase/firestore';
import './UsersManagement.css'; 

const UserManagement = () => {
    const [users, setUsers] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [editUserId, setEditUserId] = useState(null);

    // Fetch users on component mount
    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const snapshot = await getDocs(collection(db, 'users'));
            const userList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setUsers(userList);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            setErrorMessage("Failed to fetch users. Please try again later.");
        }
    };

    const addUser = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (username.trim() === '') {
            setErrorMessage("Please enter a username");
            return;
        }

        try {
            const newUser = { name: username, password: password };
            const docRef = await addDoc(collection(db, 'users'), newUser);
            setUsers([...users, { id: docRef.id, ...newUser }]);
            setUsername('');
            setPassword('');
            setSuccessMessage("User added successfully!");
        } catch (error) {
            console.error("Failed to add user:", error);
            setErrorMessage("Failed to add user. Please try again.");
        }
    };

    const updateUser = async (id) => {
        const currentUser = users.find(user => user.id === id);
        if (!currentUser) return;

        setUsername(currentUser.name);
        setPassword(currentUser.password);
        setIsEditing(true);
        setEditUserId(id);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        setErrorMessage('');
        setSuccessMessage('');

        if (!editUserId || username.trim() === '') return;

        try {
            const userRef = doc(db, 'users', editUserId);
            await updateDoc(userRef, { name: username, password: password });
            const updatedUsers = users.map(user => 
                user.id === editUserId ? { ...user, name: username, password: password } : user
            );
            setUsers(updatedUsers);
            setSuccessMessage("User updated successfully!");
            setUsername('');
            setPassword('');
            setIsEditing(false);
            setEditUserId(null);
        } catch (error) {
            console.error("Failed to update user:", error);
            setErrorMessage("Failed to update user. Please try again.");
        }
    };

    const deleteUser = async (id) => {
        if (window.confirm("Are you sure you want to delete this user?")) {
            try {
                await deleteDoc(doc(db, 'users', id));
                setUsers(users.filter((user) => user.id !== id));
                setSuccessMessage("User deleted successfully!");
            } catch (error) {
                console.error("Failed to delete user:", error);
                setErrorMessage("Failed to delete user. Please try again.");
            }
        }
    };

    return (
        <div className="usersManagement">
            <h1>User Management</h1>

            {/* User Management Form */}
            <div>
                <form onSubmit={isEditing ? handleUpdate : addUser}>
                    {errorMessage && <div className="error">{errorMessage}</div>}
                    {successMessage && <div className="success">{successMessage}</div>}
                    <input 
                        type="text" 
                        value={username} 
                        onChange={(e) => setUsername(e.target.value)} 
                        placeholder="Enter Username" 
                        required 
                    />
                    <input 
                        type="password" 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                        placeholder="Enter Password" 
                        required 
                    />
                    <button type="submit">{isEditing ? 'Update User' : 'Add User'}</button>
                </form>

                <ul className="usersList">
                    {users.map((user) => (
                        <li key={user.id}>
                            {user.name} 
                            <button onClick={() => updateUser(user.id)}>Edit</button>
                            <button onClick={() => deleteUser(user.id)}>Delete</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManagement;