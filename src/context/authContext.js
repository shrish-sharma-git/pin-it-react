import React, { createContext, useContext, useEffect, useState } from 'react'
import { auth } from '../firebase/config';
import { firestore } from '../firebase/config';

const AuthContext = createContext()

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function signUp(email, password, firstName, lastName) {
        return auth.createUserWithEmailAndPassword(
            email, 
            password
        ).then(resp => {
            return firestore.collection('users').doc(resp.user.uid).set({
                firstName: firstName,
                lastName: lastName,
                initials: firstName[0] + lastName[0]
            });
        })
    }
    
    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)            
            setLoading(false)
        })

        return unsubscribe;
    }, [])

    const value = {
        signUp,
        login,
        currentUser
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
