import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    signInWithPopup,
    GoogleAuthProvider,
    onAuthStateChanged
} from 'firebase/auth';
import { strapiService } from '../services/strapi';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null); // Firebase user
    const [profile, setProfile] = useState(null); // Strapi user profile
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    /**
     * Synchronize Firebase user with Strapi backend
     * Creates "shadow user" if doesn't exist
     */
    const syncWithStrapi = async (firebaseUser) => {
        setError(null);
        if (!firebaseUser) {
            setProfile(null);
            return;
        }

        try {
            console.log('Syncing with Strapi for:', firebaseUser.email);
            // Try to login first to get token
            try {
                const loggedInUser = await strapiService.login(firebaseUser.email, firebaseUser.uid);
                console.log('Strapi login successful:', loggedInUser.id);
                console.log('User profile data:', loggedInUser);
                setProfile({
                    id: loggedInUser.id,
                    firebase_uid: loggedInUser.firebase_uid,
                    email: loggedInUser.email,
                    username: loggedInUser.username,
                    has_pin_setup: loggedInUser.has_pin_setup || false,
                    pin_hash: loggedInUser.pin_hash
                });
                return;
            } catch (loginError) {
                // Login failed (user might not exist or password mismatch), proceed to check/create
                console.log('Strapi login failed (expected for new/unlinked users):', loginError.message);
            }

            // Check if user exists in Strapi by Firebase UID
            console.log('Checking for user by Firebase UID...');
            let strapiUser = await strapiService.findUserByFirebaseUid(firebaseUser.uid);
            console.log('User by UID result:', strapiUser?.id);
            console.log('Full user object from UID search:', strapiUser);

            if (!strapiUser) {
                // Check if user exists by email (partial creation or pre-existing)
                console.log('Checking for user by Email...');
                const existingUserByEmail = await strapiService.findUserByEmail(firebaseUser.email);
                console.log('User by Email result:', existingUserByEmail?.id);

                if (existingUserByEmail) {
                    console.log('User found by email, linking Firebase UID...');
                    try {
                        // Attempt to update anyway (might fail if no token/permissions)
                        // For now, just use the found user.
                        strapiUser = existingUserByEmail;
                    } catch (e) {
                        console.error("Failed to link existing user", e);
                        strapiUser = existingUserByEmail;
                    }
                } else {
                    console.log('Creating shadow user in Strapi...');
                    const uniqueUsername = firebaseUser.email || `user_${firebaseUser.uid.substring(0, 8)}`;
                    strapiUser = await strapiService.createUser({
                        firebase_uid: firebaseUser.uid,
                        email: firebaseUser.email,
                        username: uniqueUsername,
                        has_pin_setup: false,
                        pin_hash: null
                    });
                    console.log('Shadow user created:', strapiUser?.id);
                }
            }

            // Set profile state with Strapi user data
            console.log('Setting profile with strapiUser:', strapiUser);
            if (strapiUser) {
                setProfile({
                    id: strapiUser.id,
                    firebase_uid: strapiUser.firebase_uid,
                    email: strapiUser.email,
                    username: strapiUser.username,
                    has_pin_setup: strapiUser.has_pin_setup || false,
                    pin_hash: strapiUser.pin_hash
                });
            } else {
                throw new Error("Failed to find or create Strapi user");
            }
        } catch (error) {
            console.error('Error syncing with Strapi:', error);
            const errorMsg = error.response?.data?.error?.message || error.message || 'Unknown error syncing with Strapi';
            setError(errorMsg);

            // Set basic profile even if Strapi sync fails
            setProfile({
                id: null,
                firebase_uid: firebaseUser.uid,
                email: firebaseUser.email,
                username: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                has_pin_setup: false
            });
        }
    };

    useEffect(() => {
        // Listen to Firebase auth state changes
        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                // Set Firebase user
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    name: firebaseUser.displayName || firebaseUser.email?.split('@')[0],
                    photoURL: firebaseUser.photoURL
                });

                // Sync with Strapi
                await syncWithStrapi(firebaseUser);
            } else {
                setUser(null);
                setProfile(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const login = async (email, password) => {
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error('Login error:', error);
            throw error;
        }
    };

    const loginWithGoogle = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            return result.user;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            // Clear session storage
            sessionStorage.removeItem('pin_verified');
            await signOut(auth);
        } catch (error) {
            console.error('Logout error:', error);
            throw error;
        }
    };

    const register = async (email, password) => {
        try {
            const result = await createUserWithEmailAndPassword(auth, email, password);
            return result.user;
        } catch (error) {
            console.error('Registration error:', error);
            throw error;
        }
    };

    /**
     * Update user profile in Strapi
     */
    const updateProfile = async (updates) => {
        if (!profile?.id) return;

        try {
            const updatedUser = await strapiService.getUserProfile(profile.id);
            setProfile({
                ...profile,
                ...updates,
                ...updatedUser.attributes
            });
        } catch (error) {
            console.error('Error updating profile:', error);
            throw error;
        }
    };

    return (
        <AuthContext.Provider value={{
            user,
            profile,
            loading,
            error,
            login,
            loginWithGoogle,
            logout,
            register,
            updateProfile,
            syncWithStrapi
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
