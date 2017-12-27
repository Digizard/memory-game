/*
 * Create a list that holds all of your cards
 */

const baseCards = ['anchor', 'bicycle', 'bolt', 'bomb', 'cube', 'diamond', 'leaf', 'paper-plane-o'];
const cardStack = [...baseCards, ...baseCards];
const playingField = document.getElementsByClassName('deck')[0];
let flippedCards = [];

function hasTwoFlipped() {
    return flippedCards.length === 2;
}

/*
* Display the cards on the page
*   - shuffle the list of cards using the provided "shuffle" method below
*   - loop through each card and create its HTML
*   - add each card's HTML to the page
*/

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function beginNewGame() {
    clearCards();
    shuffle(cardStack);
    layCards();
}

function clearCards() {
    removeAllChildNodes(playingField);

    function removeAllChildNodes(element) {
    while (element.hasChildNodes()) {
        element.removeChild(element.lastChild);
    }
    }
}

function layCards() {
    for (let card of cardStack) {
        const newCard = createCard(card);
        const cardFace = createCardFace(card);

        newCard.appendChild(cardFace);
        playingField.appendChild(newCard);
    }

    function createCardFace(card) {
        const cardFace = document.createElement('span');
        const cardDesign = 'fa-' + card;
        cardFace.classList.add('fa', cardDesign);

        return cardFace;
    }

    function createCard(cardFace) {
        const card = document.createElement('li');
        card.classList.add('card');
        card.addEventListener('click', function() {
            if (isUnflipped(card)) {
                manageFlippingCards(card, cardFace);
            }
        });

        return card;
   }
}

function manageFlippingCards(card, cardFace) {
    flipCard(card, cardFace);
    checkFlippedCards();
}

function checkFlippedCards() {
    if (hasTwoFlipped()) {
        checkBothCards();
    }
}

function checkBothCards() {
    let lastCard = flippedCards[0];
    let currentCard = flippedCards[1];
    if (lastCard.face === currentCard.face) {
        markCardsMatching();
    } else {
        unflipCards();
    }
}

function isUnflipped(card) {
    const cardClass = 'card';
    return card.className === cardClass;
}

function flipCard(card, cardFace) {
    card.classList.add('open', 'show');
    let flippedCard = {
        face: cardFace,
        element: card
    };

    flippedCards.push(flippedCard);
}

function unflipCards() {
    const waitTime = 500;
    setTimeout(resetFlippedCards, waitTime);

    function resetFlippedCards() {
        flippedCards.forEach(resetCard);
        flippedCards = [];
     }
}

function markCardsMatching() {
    flippedCards.forEach(setFlippedToMatch);
    flippedCards = [];

    function setFlippedToMatch(card) {
        const matchClass = 'match';
        resetCard(card);
        card.element.classList.add(matchClass);
    }
}

function resetCard(card) {
    let cardClass = 'card';
    card.element.className = cardClass;
}


/*
* set up the event listener for a card. If a card is clicked:
*  - display the card's symbol (put this functionality in another function that you call from this one)
*  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
*  - if the list already has another card, check to see if the two cards match
*    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
*    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
*    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
*    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
*/

beginNewGame();