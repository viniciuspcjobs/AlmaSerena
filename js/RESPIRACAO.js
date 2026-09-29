

document.addEventListener("DOMContentLoaded", function() {
  const instrucao = document.getElementById("instrucao");
  function cicloRespiracao() {
    instrucao.innerText = "Inspire...";
    setTimeout(() => {
      instrucao.innerText = "Respire...";
      setTimeout(cicloRespiracao, 6000);
    }, 6000);
  }
  cicloRespiracao();
});
console.log("RESPIRACAO.js carregado");
window.addEventListener("DOMContentLoaded", function() {
  const instrucao = document.getElementById("instrucao");
  if (!instrucao) {
    console.error("Elemento #instrucao não encontrado!");
    return;
  }
  function cicloRespiracao() {
    instrucao.innerText = "Inspire...";
    console.log("Texto: Inspire...");
    setTimeout(() => {
      instrucao.innerText = "Respire...";
      console.log("Texto: Respire...");
      setTimeout(cicloRespiracao, 6000);
    }, 6000);
  }
  cicloRespiracao();
});
