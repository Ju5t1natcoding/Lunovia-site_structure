const complimentsContainer = document.getElementById("compliments");
const overlay = document.getElementById("recaptcha-overlay");
const mainContent = document.getElementById("main-content");

// List of compliments (one correct)
const compliments = [
    { text: "Aveți un sens de stil uimitor!", correct: false },
    { text: "Sunteți niște persoane incredibil de grijulii!", correct: true },
    { text: "Creativitatea voastră este de inspirat!", correct: false },
    { text: "Faceți lumea un loc mai bun!", correct: false },
];

// Shuffle compliments
compliments.sort(() => Math.random() - 0.5);

// Render compliments
compliments.forEach(compliment => {
    const div = document.createElement("div");
    div.className = "compliment";
    div.textContent = compliment.text;

    div.addEventListener("click", () => {
        // Reset all compliment styles
        document.querySelectorAll(".compliment").forEach(el => el.classList.remove("correct", "wrong"));

        // If the answer is correct, hide the overlay with animation
        if (compliment.correct) {
            div.classList.add("correct");

            // Adaugă clasa "hidden" pentru a declanșa animația CSS
            overlay.classList.add("hidden");

            // După animație, elimină complet overlay-ul și afișează conținutul principal
            setTimeout(() => {
                overlay.style.display = "none";
                mainContent.style.display = "block";
                document.body.style.overflow = "auto"; // Enable scrolling
            }, 500); // Durata animației (500ms)
        } else {
            // If the answer is wrong, highlight the wrong answer and reset
            div.classList.add("wrong");
            setTimeout(() => {
                document.querySelectorAll(".compliment").forEach(el => el.classList.remove("correct", "wrong"));
            }, 1000); // Wait for 1 second before resetting
        }
    });

    complimentsContainer.appendChild(div);
});
