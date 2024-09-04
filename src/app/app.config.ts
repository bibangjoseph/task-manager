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
                "projectId": "xxxxxxxxxxx",
                "appId": "xxxxxxxxxxxxxxx",
                "storageBucket": "xxxxxxxxxxxxxxxxxxx",
                "apiKey": "xxxxxxxxxxxx",
                "authDomain": "xxxxxxxxxx",
                "messagingSenderId": "xxxxxxxxxxxxxx",
                "measurementId": "xxxxxxxxxx"
            }
        )),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideMessaging(() => getMessaging())
    ]
};
