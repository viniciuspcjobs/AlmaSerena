console.log("estatisticas.js carregado!");

// Firebase imports
import {
    getFirestore,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

import {
    getAuth,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";

import { app } from "./firebase.js";

// Instâncias
const db = getFirestore(app);
const auth = getAuth(app);

// Carrega estatísticas sempre que o usuário estiver autenticado
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    console.log("Usuário autenticado:", user.uid);

    const ref = doc(db, "usuarios", user.uid);

    try {
        const snap = await getDoc(ref);

        if (!snap.exists()) {
            console.warn("Documento do usuário não existe.");
            return;
        }

        const data = snap.data();
        console.log("Dados Firestore:", data);

        // Corrigido: pega exatamente os campos salvos no login e logout
        const acessos = data.acessos ?? 0;
        const minutos = data.minutosMeditados ?? 0;

        let ultimaData = "—";
        if (data.ultimoLogin?.toDate) {
            ultimaData = data.ultimoLogin.toDate().toLocaleDateString("pt-BR");
        }

        // Atualiza a interface
        document.getElementById("totalSessoes").innerText = acessos;
        document.getElementById("minutosTotal").innerText = minutos;
        document.getElementById("ultimaMeditacao").innerText = ultimaData;

    } catch (err) {
        console.error("Erro ao carregar estatísticas:", err);
    }
});
