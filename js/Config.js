/*****************************************
 * 1. MENU DE CONFIGURAÇÃO
 *****************************************/
document.addEventListener("DOMContentLoaded", () => {
    const config = document.querySelector(".config");
    const config_div = document.querySelector(".config_div");

    if (config && config_div) {
        config.addEventListener("click", () => {
            config_div.style.display =
                config_div.style.display === "flex" ? "none" : "flex";
        });
    }
});


/*****************************************
 * 2. FIREBASE: Controle da sessão
 *****************************************/
import { auth, db } from "./firebase.js";
import { onAuthStateChanged, signOut }
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-auth.js";
import { doc, getDoc, updateDoc }
    from "https://www.gstatic.com/firebasejs/12.6.0/firebase-firestore.js";

let inicioSessao = null;


/*****************************************
 * 3. Salvar minutos localmente (GARANTIDO)
 *****************************************/
function calcularMinutos() {
    if (!inicioSessao) return 0;
    return Math.floor((Date.now() - inicioSessao) / 60000);
}

function salvarMinutosLocal() {
    const minutos = calcularMinutos();
    if (minutos > 0) {
        const atual = Number(localStorage.getItem("minutosPendentes") || 0);
        localStorage.setItem("minutosPendentes", atual + minutos);
    }
    inicioSessao = Date.now(); // reinicia a contagem
}


/*****************************************
 * 4. Quando o usuário loga → aplica minutos pendentes
 *****************************************/
onAuthStateChanged(auth, async (user) => {
    if (!user) {
        window.location.href = "Login.html";
        return;
    }

    // marca início da sessão
    inicioSessao = Date.now();

    // aplica minutos pendentes
    const pendentes = Number(localStorage.getItem("minutosPendentes") || 0);

    if (pendentes > 0) {
        const ref = doc(db, "usuarios", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
            const atual = snap.data().minutosMeditados || 0;
            await updateDoc(ref, {
                minutosMeditados: atual + pendentes
            });
        }

        localStorage.removeItem("minutosPendentes");
    }
});


/*****************************************
 * 5. Eventos para salvar automaticamente
 *****************************************/

// Quando muda aba (mobile e desktop)
document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
        salvarMinutosLocal();
    }
});

// Quando troca de página
window.addEventListener("pagehide", salvarMinutosLocal);

// Quando fecha aba (desktop)
window.addEventListener("beforeunload", salvarMinutosLocal);


/*****************************************
 * 6. Logout manual
 *****************************************/
document.getElementById("logoutBtn")?.addEventListener("click", async () => {
    salvarMinutosLocal(); // garante salvar pendentes no logout
    await signOut(auth);
    window.location.href = "Login.html";
});
