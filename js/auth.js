import { auth, db } from './firebase-config.js';
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword, 
    onAuthStateChanged 
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signupForm = document.getElementById('signup-form');

    // Check if user is already logged in
    onAuthStateChanged(auth, async (user) => {
        if (user) {
            // Hardcoded Admin Email Check
            if (user.email === 'admin@cloudpass.com') {
                window.location.href = 'admin.html';
                return;
            }

            // User is signed in, redirect based on role
            try {
                const docRef = doc(db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                
                if (docSnap.exists()) {
                    const userData = docSnap.data();
                    if (userData.role === 'admin') {
                        window.location.href = 'admin.html';
                    } else {
                        window.location.href = 'dashboard.html';
                    }
                } else {
                    window.location.href = 'dashboard.html';
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                window.location.href = 'dashboard.html';
            }
        }
    });

    if (signupForm) {
        signupForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const name = document.getElementById('signup-name').value;
            const email = document.getElementById('signup-email').value;
            const password = document.getElementById('signup-password').value;

            toggleLoader(true);
            try {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Save user details to Firestore
                await setDoc(doc(db, "users", user.uid), {
                    email: user.email,
                    fullName: name,
                    role: 'user', // Default role
                    createdAt: new Date().toISOString()
                });

                showNotification('Account created successfully!', 'success');
                // onAuthStateChanged will handle redirection
            } catch (error) {
                console.error("Signup error:", error);
                showNotification(error.message, 'error');
                toggleLoader(false);
            }
        });
    }

    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            toggleLoader(true);
            try {
                await signInWithEmailAndPassword(auth, email, password);
                showNotification('Login successful!', 'success');
                // onAuthStateChanged will handle redirection
            } catch (error) {
                console.error("Login error:", error);
                showNotification(error.message, 'error');
                toggleLoader(false);
            }
        });
    }
});
