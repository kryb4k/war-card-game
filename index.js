let myDeck
let link = `https://www.deckofcardsapi.com/api/deck`
let computerScore = 0
let playerScore = 0

const newDeckButton = document.getElementById("get-new-deck")
const drawCardsButton = document.getElementById("draw-cards")
const cardsContainer = document.getElementById("cards")
const winningMessage = document.getElementById("winning-text")

newDeckButton.addEventListener("click", getNewDeck)

function getNewDeck(){
    fetch(`${link}/new/shuffle/?deck_count=1`)
    .then(res => res.json())
    .then(newDeck => {
        document.getElementById("cards-remain").innerText = `Cards left: ${newDeck.remaining}`
        return myDeck = newDeck.deck_id
    })
    newDeckButton.disabled = true;
    drawCardsButton.disabled = false;
}

drawCardsButton.addEventListener("click", drawCards)

function drawCards() {
    fetch(`${link}/${myDeck}/draw/?count=2`)
    .then(res => res.json())
    .then(data => {
        cardsContainer.children[0].innerHTML = `
            <img class="card" src=${data.cards[0].image} />
        `
        cardsContainer.children[1].innerHTML = `
             <img class="card" src=${data.cards[1].image} />
        `
        const winningText = checkWinningCard(data.cards[0], data.cards[1])
        winningMessage.textContent = winningText
        document.getElementById("cards-remain").innerText = `Cards left: ${data.remaining}`
        endGame(data.remaining)
    })
}

function checkWinningCard(card1, card2) {
    const values = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const cardValue1 = values.indexOf(card1.value)
    const cardValue2 = values.indexOf(card2.value)

    if (cardValue1 > cardValue2) {
        computerScore++
        document.getElementById("computers-score").textContent = `Computer's score: ${computerScore}`
        return "Computer score a point!"
    } else if( cardValue1 < cardValue2) {
        playerScore++
        document.getElementById("players-score").textContent = `Player's score: ${playerScore}`
        return "You score a point!"
    } else {
        return "WAR!"
    }
}

function endGame(cardsLeft) {
    if (cardsLeft == 0){
        drawCardsButton.disabled = true;
        newDeckButton.disabled = false;
        if (computerScore > playerScore){
            winningMessage.textContent = `???? Computer won the game! ????`
        } else {
            winningMessage.textContent = `???? You won the game! ????`
        }
    }
}
