import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage'; // Import the Firebase storage module

import './assets/main.css';
import './assets/media.css';
import './assets/normalize.css';

/* code from our Firebase console */
const firebaseConfig = {
  apiKey: "AIzaSyCxpFord-RG601KEwEvw1k5PSLxRtcTDZk",
  authDomain: "join-web-9b1f8.firebaseapp.com",
  projectId: "join-web-9b1f8",
  storageBucket: "join-web-9b1f8.appspot.com",
  messagingSenderId: "1046190171024",
  appId: "1:1046190171024:web:3660b51437daf011830915",
  measurementId: "G-5Q8S04JHD0"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Get a reference to the Firebase database and storage
const db = getDatabase(firebaseApp);
const storage = getStorage(firebaseApp);

const app = createApp(App);

app.use(router);

// Make the Firebase database and storage references available in all components
app.config.globalProperties.$db = db;
app.config.globalProperties.$storage = storage;

app.mount('#app');
