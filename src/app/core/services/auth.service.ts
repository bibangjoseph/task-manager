import {inject, Injectable} from '@angular/core';
import {collections} from "../models/collections";
import {collection, CollectionReference, doc, Firestore, getDoc, getDocs, setDoc} from '@angular/fire/firestore';
import {Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from '@angular/fire/auth';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    firestore = inject(Firestore);
    auth = inject(Auth);
    userCollection = collection(
        this.firestore,
        collections.userCollection
    ) as CollectionReference;


    async registerUser(email: string, password: string, additionalData: any) {
        try {
            let userCredential = await createUserWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            await setDoc(doc(this.userCollection, user.uid), {
                uid: user.uid,
                email: user.email,
                ...additionalData  // Autres informations supplémentaires fournies
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }


    // Méthode d'authentification avec e-mail et mot de passe
    async loginUser(email: string, password: string): Promise<any> {
        try {
            let userCredential = await signInWithEmailAndPassword(this.auth, email, password);
            const user = userCredential.user;
            console.log('User logged in:', user);

            // Optionnel : récupérer les informations utilisateur depuis Firestore
            const userDocRef = doc(this.firestore, `users/${user.uid}`);
            let docSnapshot = await getDoc(userDocRef);
            if (docSnapshot.exists()) {
                return {...docSnapshot.data(), uid: user.uid};  // Retourner les données utilisateur
            } else {
                return null;
            }

        } catch (error) {
            console.error('Error during login:', error);
            return Promise.reject(error);
        }
    }


    logoutUser(): Promise<void> {
        return this.auth.signOut().then(() => {
        }).catch((error) => {
            return Promise.reject(error);
        });
    }


    async getUsers(): Promise<any[]> {
        const usersRef = collection(this.firestore, 'users');
        const snapshot = await getDocs(usersRef);
        return snapshot.docs.map(doc => ({id: doc.id, ...doc.data()}));
    }

}
