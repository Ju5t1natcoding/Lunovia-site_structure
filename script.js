const complimentsContainer = document.getElementById("compliments");
const overlay = document.getElementById("recaptcha-overlay");
const mainContent = document.getElementById("main-content");
const recaptcha = document.getElementById("recaptcha");
const logo = document.getElementById('logo');
const buttons = document.querySelectorAll('.button'); // Presupunând că butoanele au clasa 'button'

// Funcție de blocare a interacțiunii (pentru logo și butoane)
function disableInteraction() {
    // Blochează interacțiunea cu logo și butoane
    logo.classList.add('no-click');
    buttons.forEach(button => button.classList.add('no-click'));
}

// Funcție de reactualizare a interacțiunii (după animație)
function enableInteraction() {
    // Permite interacțiunea cu logo și butoane
    logo.classList.remove('no-click');
    buttons.forEach(button => button.classList.remove('no-click'));
}

// Logo-ul are un eveniment de click
logo.addEventListener('click', function() {
    // Dezactivează interacțiunea cu logo și butoane
    disableInteraction();
    
    // Aplică animația de rotație și "saritura" pe axa Y
    logo.style.animation = 'rotateJumpY 1s ease forwards';
    
    // După terminarea animației de rotație, reactualizează interacțiunea
    setTimeout(function() {
        logo.style.animation = ''; // Resetează animația
        enableInteraction(); // Permite din nou click-ul
    }, 1000); // Timpul de durată al animației (1s)
});

// Listă extinsă de complimente corecte și greșite
const compliments = [
    { text: "Aveți un sens de stil uimitor!", correct: false },
    { text: "Sunteți niște persoane incredibil de grijulii!", correct: true },
    { text: "Creativitatea voastră este de inspirat!", correct: false },
    { text: "Faceți lumea un loc mai bun!", correct: false },
    { text: "Vă puneți sufletul în tot ce faceți!", correct: true },
    { text: "Zâmbetul vostru luminează încăperea!", correct: true },
    { text: "Ați adus un zâmbet pe fața mea astăzi!", correct: false },
    { text: "Suntem norocoși să vă avem!", correct: false },
];

// Funcție pentru amestecarea unui array (Fisher-Yates shuffle)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Selectează 1 compliment corect și 3 complimente greșite
const correctCompliments = compliments.filter(c => c.correct);
const wrongCompliments = compliments.filter(c => !c.correct);

// Alegem 1 compliment corect
const selectedCompliments = [];
const correct = correctCompliments[Math.floor(Math.random() * correctCompliments.length)];
selectedCompliments.push(correct);

// Eliminăm complimentul corect din lista generală
const remainingCompliments = compliments.filter(c => c !== correct);

// Alegem 3 complimente greșite unice
const shuffledWrong = wrongCompliments.slice(); // Copie a listei greșite
shuffleArray(shuffledWrong);
selectedCompliments.push(...shuffledWrong.slice(0, 3));

// Amestecă cele 4 complimente selectate
shuffleArray(selectedCompliments);

// Afișează cele 4 complimente selectate
selectedCompliments.forEach(compliment => {
    const div = document.createElement("div");
    div.className = "compliment";
    div.textContent = compliment.text;

    div.addEventListener("click", () => {
        // Resetează stilurile pentru toate complimentele
        document.querySelectorAll(".compliment").forEach(el =>
            el.classList.remove("correct", "wrong")
        );

        if (compliment.correct) {
            div.classList.add("correct");

            // Arată imediat conținutul principal (cu animație de fade-in)
            mainContent.classList.add("visible");

            // Adaugă clasa pentru a începe animația overlay-ului
            setTimeout(() => {
                overlay.classList.add("hidden");
            }, 0); // Overlay-ul începe să dispară imediat

            // Începe efectul de fade-in pentru reCaptcha
            setTimeout(() => {
                recaptcha.style.display = "block"; // Asigură-te că este vizibil
                recaptcha.classList.add("fade-in"); // Adaugă clasa pentru fade-in
            }, 0); // Începe imediat tranziția

            // Începe animația de mișcare pentru reCaptcha
            setTimeout(() => {
                recaptcha.style.transform = "translateY(0)"; // Mișcă-l în centru
            }, 500); // După ce efectul de fade-in începe

            // După terminarea animației de dispariție
            setTimeout(() => {
                overlay.style.display = "none"; // Ascunde complet overlay-ul
                document.body.style.overflow = "auto"; // Permite scroll-ul

                // Permite interacțiunea cu butoanele și imaginea
                enableInteraction();
            }, 2500); // După finalizarea animației de dispariție (2.5 secunde)
        } else {
            // Subliniază răspunsul greșit
            div.classList.add("wrong");
            setTimeout(() => {
                document.querySelectorAll(".compliment").forEach(el =>
                    el.classList.remove("correct", "wrong")
                );
            }, 1000); // Reset după 1 secundă
        }
    });

    complimentsContainer.appendChild(div);
});
