class Cards {
    constructor() {

        let _cards = [];
        let _playerCards = [];
        let _aiCards = []
        this.getCards = () => {
            return _cards
        }
        this.getPlayerCards = () => {
            return _playerCards
        }
        this.getAiCards = () => {
            return _aiCards
        }
        this.clearGame = () => {
            _cards = [];
            _playerCards = [];
            _aiCards = []
        }

        // Tworzenie talii kart
        this.newCards = () => {
            _cards = []
            let counter = 2
            let name = 2
            let value = 2
            let altValue = value
            let imgSrc = ["KIER.png", "KARO.png", "PIK.png", "TREFL.png"]
            let index = 0

            for (let i = 0; i < 52; i++) {
                _cards.push({
                    name: name,
                    color: imgSrc[index],
                    value: value,
                    altValue: altValue
                })
                if (counter < 10) {
                    name++
                    value++
                    altValue = value
                } else if (counter === 10) {
                    name = "J "
                    value = 10
                    altValue = value
                } else if (counter === 11) {
                    name = "D "
                    value = 10
                    altValue = value

                } else if (counter === 12) {
                    name = "K "
                    value = 10
                    altValue = value
                } else if (counter === 13) {
                    name = "A "
                    value = 11
                    altValue = 1
                } else if (counter === 14) {
                    counter = 1;
                    name = 2
                    index++
                    value = 2
                    altValue = value
                }
                counter++
            }
        }

        // Pierwsze rozdanie - wylosowanie z talii kart ręki gracza i AI, talia kart zostaje pomniejszona o wylosowane karty    
        this.deal = () => {
            _playerCards = [];
            _aiCards = []
            for (let i = 1; i < 4; i++) {
                const card = _cards.splice(Math.floor(Math.random() * _cards.length), 1)

                if (i % 2 !== 0) {
                    _playerCards.push(card[0])
                } else {
                    _aiCards.push(card[0])
                }
            }
        }

        // Dobranie karty przez gracza
        this.pickCard = (result) => {
            if (result > 21) {
                return
            }

            const card = _cards.splice(Math.floor(Math.random() * _cards.length), 1)
            _playerCards.push(card[0])
        }

        // Dobranie karty przez AI
        this.pickCardAi = (resultAi, resultPlayer) => {
            if (resultAi < 17) {
                const card = _cards.splice(Math.floor(Math.random() * _cards.length), 1)
                _aiCards.push(card[0])
            } else return
        }
    }
}