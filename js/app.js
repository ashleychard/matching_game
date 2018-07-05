/*
 * Create a list that holds all of your cards
 */


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

//set up an event listener to see if the card is clicked

const cards = document.getElementsByClassName("card");
console.log(cards);

const deck = document.querySelector(".deck");

deck.addEventListener("click",cardClicked);

function cardClicked(evt){
	console.log("The card clicked was", evt.target);
	displaySymbol(evt);
	addCardToList(evt.target);
}

function displaySymbol(evt){
	evt.target.classList.add("show");
}

//make a list of cards
const cardList = [];

//make a function to increase the turn counter
let turnCounter = 0;

function incrementTurn(){
	turnCounter++;
	const moveCount = document.querySelector(".moves");
	moveCount.textContent = turnCounter;
}

//add the card to a list of cards
function addCardToList(ele){
	cardList.push(ele);
	console.log(cardList);

	//create a function that compares the cards to each other as long as there are two cards added to the list
	if(cardList.length > 0 && cardList.length % 2 === 0){
		let cardsMatch = cardCompare(cardList[cardList.length-1], cardList[cardList.length-2]);
		console.log("The cards match...?", cardsMatch);
		incrementTurn();

		//if the cards do not match, then set the CSS properties to hidden and remove them from the list 
		if(cardsMatch === false){
			setTimeout(matchNegative, 1000);
		}else{
			matchPositive();
		}
	}

}

//create a function to remove the cards from the list if they do not match
function matchNegative(){
	console.log("The cards don't match! WHYYYYYYYYY?");
	let removedElement = cardList.pop();
	removedElement.classList.remove("show");
	removedElement = cardList.pop();
	removedElement.classList.remove("show");
}

//create a function to add the match property to the card
function matchPositive(){
	console.log("Yay!The cards match");
	cardList[cardList.length-1].classList.remove("show");
	cardList[cardList.length-1].classList.add("match");
	cardList[cardList.length-2].classList.remove("show");
	cardList[cardList.length-2].classList.add("match");

}


//compare the cards
function cardCompare(card0,card1){
	console.log("Comparing", card0, "and", card1);
	const cardID0 = card0.firstElementChild.classList[1];
	const cardID1 = card1.firstElementChild.classList[1];
	console.log("Card0 has symbol", cardID0, "card1 has symbol", cardID1);

	return cardID0 === cardID1;

	}

//set up an event listener to see if the reset button was clicked
const restart = document.querySelector(".restart");

restart.addEventListener("click", resetClicked);

function resetClicked(evt){
	console.log("Reset was clicked");
}