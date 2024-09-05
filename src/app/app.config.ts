import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import {getAuth, provideAuth} from '@angular/fire/auth';
import {getFirestore, provideFirestore} from '@angular/fire/firestore';
import {getMessaging, provideMessaging} from '@angular/fire/messaging';
import {firebaseConfig} from "./core/environment/environment";
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideFirebaseApp(() => initializeApp(firebaseConfig)),
        provideAuth(() => getAuth()),
        provideFirestore(() => getFirestore()),
        provideMessaging(() => getMessaging()),
        provideAnimations(),
        provideToastr()
    ]
};
