class Game {
    constructor() {
        this.cards = new Cards
        this.result = new Result

        this.btnDeal = document.querySelector("button.deal")
        this.playerBoard = document.querySelector("div.wrapPlayer");
        this.aiBoard = document.querySelector("div.wrapAi");
        this.h2 = document.querySelector("div.game h2");
        this.scorePlayer = document.querySelector(".player span")
        this.scoreAi = document.querySelector(".ai span")
        this.btnGetCard = document.querySelector("button.getCard")
        this.btnFinish = document.querySelector("button.finish")
        this.btnStart = document.querySelector("button.begin")
        this.main = document.querySelector("main")
        this.divMsg = document.querySelector("div.message")

    }

    // Wyświetlanie wylosowanych kart
    render(cards, playerCards, aiCards, checkWin) {
        this.playerBoard.textContent = ''
        this.aiBoard.textContent = ''

        cards = cards
        playerCards = playerCards
        aiCards = aiCards;

        for (let i = 0; i < playerCards.length; i++) {
            const divCard = document.createElement("div")
            divCard.classList.add("card")
            this.playerBoard.appendChild(divCard);
            divCard.innerHTML = `${playerCards[i].name} <img src="${playerCards[i].color}" alt="">`
        }
        for (let i = 0; i < aiCards.length; i++) {
            const divCard = document.createElement("div")
            divCard.classList.add("card")
            this.aiBoard.appendChild(divCard);
            divCard.innerHTML = `${aiCards[i].name} <img src="${aiCards[i].color}" alt="">`
        }
    }

    //Start programu, nieaktywne przyciski gry przed rozdaniem
    start() {
        this.main.style.display = "none"
        this.h2.style.display = "block"
        this.btnGetCard.disabled = true
        this.btnFinish.disabled = true

        // Start-  wyświetla pustą planszę
        this.btnStart.addEventListener("click", () => {
            this.btnDeal.disabled = false
            this.main.style.display = "flex"
            this.h2.style.display = "none"
            this.cards.clearGame();
            this.result.result(this.cards.getPlayerCards(), this.cards.getAiCards())
            this.renderScore(this.result.resultPlayer(), this.result.resultAi())
            this.render(this.cards.getCards(), this.cards.getPlayerCards(), this.cards.getAiCards())
        })

        // Rozdaj karty
        this.btnDeal.addEventListener("click", () => {
            this.btnGetCard.disabled = false
            this.btnFinish.disabled = false
            this.cards.newCards()
            this.cards.deal()
            this.result.result(this.cards.getPlayerCards(), this.cards.getAiCards())
            this.renderScore(this.result.resultPlayer(), this.result.resultAi())
            this.render(this.cards.getCards(), this.cards.getPlayerCards(), this.cards.getAiCards())
            this.btnDeal.disabled = true

        })
        //Dobranie karty przez gracza, sprawdzenie czy gracz może dobrać kartę. Jeśli gracz przekroczył liczbę 21 nie może dobierać kart
        this.btnGetCard.addEventListener("click", () => {
            if (this.result.canPickCard()) {
                this.cards.pickCard(this.result.resultPlayer())
                this.result.result(this.cards.getPlayerCards(), this.cards.getAiCards())
                this.renderScore(this.result.resultPlayer(), this.result.resultAi())
                this.render(this.cards.getCards(), this.cards.getPlayerCards(), this.cards.getAiCards())
            }
            if (!this.result.canPickCard()) {
                this.btnGetCard.disabled = true
            }

        })
        // Zakończenie dobierania kart przez gracza, dobranie kart przez AI i sprawdzenie wyniku rozgrywki
        this.btnFinish.addEventListener("click", () => {
            for (let i = 2; i < 9; i++) {
                this.cards.pickCardAi(this.result.resultAi(), this.result.resultPlayer())
                this.result.result(this.cards.getPlayerCards(), this.cards.getAiCards())
            }
            this.renderScore(this.result.resultPlayer(), this.result.resultAi(), this.result.checkWin())
            this.render(this.cards.getCards(), this.cards.getPlayerCards(), this.cards.getAiCards())
            this.btnGetCard.disabled = true
            this.btnFinish.disabled = true
            this.btnDeal.disabled = false
            // this.btnStart.addEventListener("click", this.start())
        })

    }
    // Wyświetlenie punktacji i sprawdzenie wyniku rozgrywki
    renderScore(resultPlayer, resultAi, checkWin = '') {
        this.scorePlayer.textContent = resultPlayer
        this.scoreAi.textContent = resultAi
        if (checkWin === "win") {
            this.btnGetCard.disabled = true
            this.btnFinish.disabled = true
            setTimeout(() => {
                this.divMsg.style.display = "block"
                this.divMsg.textContent = "WYGRAŁEŚ"
                this.btnDeal.disabled = true
            }, 500);
            setTimeout(() => {
                this.divMsg.style.display = "none"
                this.btnDeal.disabled = false
            }, 2000);
        } else if (checkWin === "loss") {
            this.btnGetCard.disabled = true
            this.btnFinish.disabled = true
            setTimeout(() => {
                this.divMsg.style.display = "block"
                this.divMsg.textContent = "PRZEGRAŁEŚ"
                this.btnDeal.disabled = true
            }, 500);
            setTimeout(() => {
                this.divMsg.style.display = "none"
                this.btnDeal.disabled = false
            }, 2000);

        } else if (checkWin === "draw") {
            this.btnGetCard.disabled = true
            this.btnFinish.disabled = true
            setTimeout(() => {
                this.divMsg.style.display = "block"
                this.divMsg.textContent = "REMIS"
                this.btnDeal.disabled = true
            }, 500);
            setTimeout(() => {
                this.divMsg.style.display = "none"
                this.btnDeal.disabled = false
            }, 2000);

        }

    }
}


const game = new Game

game.start()