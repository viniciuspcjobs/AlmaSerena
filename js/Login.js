import { auth, db, signInWithEmailAndPassword } from "./firebase.js";
import { doc, getDoc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

document.getElementById("btn-primary").addEventListener("click", async () => {
    const email = document.getElementById("Email").value;
    const senha = document.getElementById("Password").value;

    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, senha);
        const user = userCredential.user;

        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            await updateDoc(ref, {
                ultimoLogin: new Date(),
                acessos: (snap.data().acessos || 0) + 1
            });
        } else {
            await setDoc(ref, {
                acessos: 1,
                ultimoLogin: new Date(),
                minutosMeditados: 0,
                meditacoes: []
            });
        }

        window.location.href = "../HTML/Main.html";

    } catch (error) {
        alert("Erro ao logar: " + error.message);
    }
});
