export class Game {
    constructor(){
        this.deck = createDeck()
        this.hand = get_card(5, this.deck)
        this.field = get_card(2, this.deck)
        this.spareDeck = get_card(10, this.deck)
    }
    get_hand() {
        return this.hand
    }
    get_deck() {
        return this.deck
    }
    get_field() {
        return this.field
    }
    get_spare() {
        return this.spareDeck
    }
}

function createDeck() {
    var deck = []
    for(let i = 0; i < 4; i++) {
        for(let j = 1; j <= 13; j++) {
            var card = new Card(j)
            deck.push(card)
        }
    }
    shuffle(deck)
    return deck
}


export function get_card(number, deck) {
    if (deck.length < 1) return "No can do, sir."
    if(number > deck.length) return "No can do, sir."
    let new_deck = []
    for(let i = 0; i < number; i++) {
        new_deck.push(deck[deck.length-1])
        deck.pop()
    }
    return new_deck
}

function shuffle(array) {
    array.sort(() => Math.random() - 0.5)
}

export class Card {
    constructor(value) {
        this.value = value
    }
    get_value() {
        return this.value.toString()
    }
    set_value(value) {
        this.value = value
    }
}