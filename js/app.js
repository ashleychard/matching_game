/*
 * Create a list that holds all of your cards
 */
const cardOrder=[];


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
const deck = document.querySelector(".deck");

/*idea of implementing shuffle feature from tutorial by Matthew Cranford 
/*(https://matthewcranford.com/memory-game-walkthrough-part-4-shuffling-decks/)
*/
function shuffleCards(){
  const cardsToShuffle = Array.from(document.querySelectorAll(".deck li"));
  const shuffled = shuffle(cardsToShuffle);

  for(card of shuffled){
    deck.appendChild(card);
  }
}
shuffleCards();

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



deck.addEventListener("click",cardClicked);

function cardClicked(evt){
	displaySymbol(evt);
	addCardToList(evt.target);
}

function displaySymbol(evt){
	evt.target.classList.add("open");
	evt.target.classList.add("show");
}

//make a list of cards matched
let cardList = [];

//make a function to increase the turn counter
let turnCounter = 0;

function incrementTurn(){
	turnCounter++;
  stars();
	const moveCount = document.querySelector(".moves");
	moveCount.textContent = turnCounter;
}

//Function to add the card to a list of cards
function addCardToList(ele){
	cardList.push(ele);
	//create a function that compares the cards to each other as long as there are two cards added to the list
	if(cardList.length > 0 && cardList.length % 2 === 0){
		let cardsMatch = cardCompare(cardList[cardList.length-1], cardList[cardList.length-2]);
		incrementTurn();
		//if the cards do not match, then set the CSS properties to hidden and remove them from the list 
		if(cardsMatch === false){
			setTimeout(matchNegative, 1000);
		}else{
			matchPositive();
			//bring up a modal if all the cards are matched  
				if(cardList.length == 16){
					modalShow();
				}
		}
	}


}

//create a function to remove the cards from the list if they do not match
function matchNegative(){
	let removedElement = cardList.pop();
	removedElement.classList.remove("open");
	removedElement.classList.remove("show");
	removedElement = cardList.pop();
	removedElement.classList.remove("show");
	removedElement.classList.remove("open");
}

//create a function to add the match property to the card
function matchPositive(){
	cardList[cardList.length-1].classList.remove("show");
	cardList[cardList.length-1].classList.add("match");
	cardList[cardList.length-2].classList.remove("show");
	cardList[cardList.length-2].classList.add("match");

}


//compare the cards
function cardCompare(card0,card1){
	const cardID0 = card0.firstElementChild.classList[1];
	const cardID1 = card1.firstElementChild.classList[1];

	return cardID0 === cardID1;

	}

//global variable for the timer
let time = 0;
//pauses the timer 
let paused = false;

//Function to create use a timer
function timer(){
  const timerValue = document.querySelector(".timerCount");
  if(!paused){
    setTimeout(timer,1000);
    time++;
    timerValue.textContent = time;
  }
}

setTimeout(timer,1000);

//set the star count in the display
function stars(){
  const two = document.querySelector(".two");
  const three = document.querySelector(".three");
  if(turnCounter >= 20){
    two.classList.add("hidden");
    three.classList.add("hidden");
  }else if(turnCounter > 13 && turnCounter <20){
    three.classList.add("hidden");
  }

}

//Function to show the modal
function modalShow(){
  let modal = document.querySelector(".modal");
  modal.classList.add("modalShow");
  //set the moves
  let endMoves = document.querySelector(".endMoves");  
  endMoves.textContent = turnCounter;
  //set the timer
  paused = true;
  let endTime= document.querySelector(".endTime"); 
  endTime.textContent = time;
  //display the final star rating
  const two = document.querySelector(".endTwo");
  const three = document.querySelector(".endThree");
  //display the star rating in the modal
  if(turnCounter >= 20){
    two.classList.add("hidden");
    three.classList.add("hidden");
  }else if(turnCounter > 13 && turnCounter <20){
    three.classList.add("hidden");
  }
  //make the reset button do actually reset the application
  let button = document.querySelector(".button");
  button.addEventListener("click",resetClicked);
}

//Function to hide the modal
function modalHide(){
  let modal = document.querySelector(".modal");
  modal.classList.remove("modalShow");
}

//Function to set all the cards back to the default state by removing the properties match and show
function resetCards(){
  cardList.forEach((card) => {
    card.classList.remove("show", "match", "open");
  });
}

//Function to set up a function to reset the turn counter
function resetCounter(){
  turnCounter = 0;
  const moveCount = document.querySelector(".moves");
  moveCount.textContent = turnCounter;

}

//Function to set the timer back to zero
function resetTimer(){
  const timerValue = document.querySelector(".timerCount");
  time = 0;
  timerValue.textContent = time;
  paused=false;
  setTimeout(timer,1000);
}

//Function to reset the stars displayed above the grid
function resetStars(){
  const two = document.querySelector(".two");
  const three = document.querySelector(".three");

  three.classList.remove("hidden");
  two.classList.remove("hidden");
  
}

//set up an event listener to see if the reset button was clicked
const restart = document.querySelector(".restart");

restart.addEventListener("click", resetClicked);

//Function to reset all the things.
function resetClicked(evt){
	//hide the modal
  modalHide();	
	//reset the cards
  resetCards();
	//reset the turn counter
  resetCounter();
  //reset the card list
  cardList = [];
	//reset the timer
  resetTimer();
  //reset stars
  resetStars();
  //shuffle the deck
  shuffleCards();
}

