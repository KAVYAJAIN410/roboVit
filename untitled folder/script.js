document.addEventListener("DOMContentLoaded", function () {
    const player = {
        name: "Per",
        chips: 200
    };

    let cards = [];
    let sum = 0;
    let hasBlackJack = false;
    let isAlive = false;
    let message = "";

    const messageEl = document.getElementById("message-el");
    const sumEl = document.getElementById("sum-el");
    const cardsEl = document.getElementById("cards-el");
    const playerEl = document.getElementById("player-el");
    const startBtn = document.getElementById("start-btn");
    const newCardBtn = document.getElementById("new-card-btn");

    function getRandomCard() {
        const randomNumber = Math.floor(Math.random() * 13) + 1;
        if (randomNumber > 10) {
            return 10;
        } else if (randomNumber === 1) {
            return 11;
        } else {
            return randomNumber;
        }
    }

    function startGame() {
        isAlive = true;
        cards = [];
        sum = 0;
        hasBlackJack = false;
        message = "";
        const firstCard = getRandomCard();
        const secondCard = getRandomCard();
        cards.push(firstCard);
        cards.push(secondCard);
        sum = firstCard + secondCard;
        renderGame();
    }

    function renderGame() {
        cardsEl.innerHTML = "<p>Cards:</p>";
        cards.forEach(card => {
            cardsEl.innerHTML += `<span>${card}</span>`;
        });

        sumEl.textContent = `Sum: ${sum}`;

        if (isAlive && sum <= 20) {
            message = "Do you want to draw a new card?";
        } else if (sum === 21) {
            message = "You've got Blackjack!";
            hasBlackJack = true;
        } else {
            message = "You're out of the game!";
            isAlive = false;
        }
        messageEl.textContent = message;
    }

    function newCard() {
        if (isAlive && !hasBlackJack) {
            const card = getRandomCard();
            cards.push(card);
            sum += card;
            renderGame();
        }
    }

    startBtn.addEventListener("click", startGame);
    newCardBtn.addEventListener("click", newCard);

    playerEl.textContent = `${player.name}: $${player.chips}`;
});
