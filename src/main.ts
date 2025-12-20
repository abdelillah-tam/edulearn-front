import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyBy_ShNxJDybd_kvZ4wqdxJ1iVC2R9wIhg',
  authDomain: 'feedmedia-572e2.firebaseapp.com',
  databaseURL: 'https://feedmedia-572e2-default-rtdb.firebaseio.com',
  projectId: 'feedmedia-572e2',
  storageBucket: 'feedmedia-572e2.appspot.com',
  messagingSenderId: '789596897667',
  appId: '1:789596897667:web:fe8593743ffc090a0d76b6',
  measurementId: 'G-64Q5CTX4JS',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
