import {inject, Injectable} from '@angular/core';
import {Auth} from "@angular/fire/auth";
import {doc, Firestore, setDoc} from "@angular/fire/firestore";
import {getMessaging} from "firebase/messaging";
import {getToken} from "@angular/fire/messaging";

@Injectable({
    providedIn: 'root'
})
export class NotificationService {
    auth = inject(Auth);
    firestore = inject(Firestore);
    private messaging = getMessaging();

    constructor() {
    }


    async getAndSaveToken() {
        const user = this.auth.currentUser;
        if (user) {
            try {
                const token = await getToken(this.messaging, {vapidKey: 'YOUR_PUBLIC_VAPID_KEY'});
                if (token) {
                    await setDoc(doc(this.firestore, 'users', user.uid), {fcmToken: token}, {merge: true});
                    console.log('Token saved:', token);
                }
            } catch (error) {
                console.error('Error getting FCM token:', error);
            }
        }
    }
}
