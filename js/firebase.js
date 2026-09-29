// Importa os SDKs essenciais do Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-app.js";
import {
    getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import {
    getFirestore,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

// Configuração do seu Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDZKJ4WeB56aqD7Aade3OFK8XaLs6SCIvA",
    authDomain: "meditacaomoppe.firebaseapp.com",
    projectId: "meditacaomoppe",
    storageBucket: "meditacaomoppe.appspot.com",
    messagingSenderId: "734794787956",
    appId: "1:734794787956:web:cbc454e8a88c14a3bf3521"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa serviços
const auth = getAuth(app);
const db = getFirestore(app);

// Exporta tudo o que outros arquivos podem precisar
export {
    app,
    auth,
    db,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    doc,
    getDoc,
    setDoc,
    updateDoc,
    collection,
    addDoc
};
