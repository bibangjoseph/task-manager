import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(
            {
                "projectId": "task-manager-37ebc",
                "appId": "1:790456319072:web:87bb096f0bd93863765705",
                "storageBucket": "task-manager-37ebc.appspot.com",
                "apiKey": "AIzaSyB1uqW7mnuYObBItPzHFmjv_uVE_ya2dTs",
                "authDomain": "task-manager-37ebc.firebaseapp.com",
                "messagingSenderId": "790456319072",
                "measurementId": "G-7ZDGY22NDZ"
            }
        )),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideMessaging(() => getMessaging())
    ]
};
