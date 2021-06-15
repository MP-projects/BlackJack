class Result {
    constructor() {
        let _resultPlayer = 0
        let _resultAi = 0

        this.resultPlayer = () => {
            return _resultPlayer
        }
        this.resultAi = () => {
            return _resultAi
        }
        // Zliczanie punktów
        this.result = (playerCards, aiCards) => {

            _resultPlayer = 0;
            _resultAi = 0;
            playerCards = playerCards
            aiCards = aiCards;
            playerCards.forEach(card => {
                _resultPlayer += card.value
            });
            if (_resultPlayer > 21) {
                _resultPlayer = 0
                playerCards.forEach(card => {
                    _resultPlayer += card.altValue
                });

            }
            aiCards.forEach(card => {
                _resultAi += card.value
            })
            if (_resultAi > 21) {
                _resultAi = 0
                aiCards.forEach(card => {
                    _resultAi += card.altValue
                })
            }

            if (_resultPlayer > 21 || _resultAi > 21) {

                return
            }

            // Sprawdzenie czy gracz może dobrać kartę
            this.canPickCard = () => {
                if (_resultPlayer > 21) return false
                else return true
            }

            // Sprawdzenie wyniku rozdania
            this.checkWin = () => {
                if (_resultPlayer === 21) {
                    if (_resultAi !== 21) return "win"
                    else if (_resultAi === 21) return "draw"
                } else if (_resultPlayer > 21) {
                    if (_resultPlayer < _resultAi) return "win"
                    else if (_resultPlayer === _resultAi) return "draw"
                    else if (_resultPlayer > _resultAi) return "loss"
                } else if (_resultPlayer < 21 && _resultAi <= 21) {
                    if (_resultPlayer > _resultAi) return "win"
                    else if (_resultPlayer === _resultAi) return "draw"
                    else if (_resultPlayer < _resultAi) return "loss"
                } else if (_resultPlayer < 21 && _resultAi > 21) return "win"

            }



        }

    }

}