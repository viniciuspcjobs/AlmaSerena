import { auth, createUserWithEmailAndPassword } from "./firebase.js";

document.querySelector("#btn-primary").addEventListener("click", () => {

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem!");
        return;
    }

    createUserWithEmailAndPassword(auth, email, password)
        .then(() => {
            alert("Cadastro realizado com sucesso!");
            window.location.href = "Login.html";
        })
        .catch(error => {
            alert("Erro: " + error.message);
        });

});
