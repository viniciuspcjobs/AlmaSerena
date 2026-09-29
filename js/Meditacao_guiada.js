document.addEventListener("DOMContentLoaded", function() {
    // Carrossel de passos
    const steps = [
        ["Encontre uma posição confortável.", "Feche os olhos e respire profundamente.", "Sinta seu corpo relaxando a cada respiração.", "Acompanhe o áudio e deixe-se guiar."],
        ["Concentre-se na sua respiração.", "Sinta o ar entrando e saindo.", "Relaxe os ombros.", "Deixe os pensamentos passarem."],
        ["Observe as sensações do corpo.", "Relaxe a mandíbula.", "Solte as mãos no colo.", "Mantenha a atenção na respiração."],
        ["Imagine um lugar tranquilo.", "Sinta a paz ao seu redor.", "Respire lentamente.", "Agradeça pelo momento."],
        ["Perceba sons ao redor sem julgamentos.", "Aceite cada sensação.", "Relaxe os pés.", "Sorria levemente."],
        ["Traga atenção para o coração.", "Sinta batidas suaves.", "Respire fundo mais uma vez.", "Aprecie o silêncio."],
        ["Prepare-se para finalizar.", "Movimente os dedos lentamente.", "Abra os olhos devagar.", "Leve a calma com você."]
    ];
    let currentStep = 0;
    const carouselList = document.getElementById("carousel-list");
    const indicator = document.getElementById("carousel-indicator");
    const prevBtn = document.getElementById("prevStep");
    const nextBtn = document.getElementById("nextStep");

    function renderSteps(idx) {
        carouselList.innerHTML = "";
        steps[idx].forEach(step => {
            const li = document.createElement("li");
            li.textContent = step;
            carouselList.appendChild(li);
        });
        indicator.textContent = `${idx+1}/7`;
    }
    renderSteps(currentStep);

    prevBtn.addEventListener("click", function() {
        if (currentStep > 0) {
            currentStep--;
            renderSteps(currentStep);
        }
    });
    nextBtn.addEventListener("click", function() {
        if (currentStep < steps.length - 1) {
            currentStep++;
            renderSteps(currentStep);
        }
    });

    // Áudio guiado
    const audio = document.getElementById("audioMeditacao");
    const playBtn = document.getElementById("playMeditacao");
    let playing = false;

    playBtn.addEventListener("click", function() {
        if (!playing) {
            audio.play();
        } else {
            audio.pause();
            audio.currentTime = 0;
            playBtn.textContent = "Começar";
            playing = false;
            playBtn.style.backgroundColor = "#2e6f6e";
        }
    });

    audio.addEventListener("play", () => {
        playBtn.textContent = "Terminar";
        playing = true;
        playBtn.style.backgroundColor = "red";
    });

    audio.addEventListener("ended", () => {
        alert("Sessão concluída. Abra os olhos lentamente e aproveite a calma.");
        playBtn.textContent = "Começar";
        playing = false;
        playBtn.style.backgroundColor = "#2e6f6e";
    });
    audio.addEventListener("pause", () => {
        if (!audio.ended && playing) {
            playBtn.textContent = "Começar";
            playing = false;
            playBtn.style.backgroundColor = "#2e6f6e";
        }
    });
});



