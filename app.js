let images = [
    "fa-apple",
    "fa-chrome",
    "fa-facebook",
    "fa-twitter",
    "fa-stack-overflow",
    "fa-spotify",
    "fa-youtube-play",
    "fa-windows",
    "fa-yahoo",
    "fa-reddit-square",
    "fa-android",
    "fa-firefox",
    "fa-github",
    "fa-html5",
    "fa-instagram",
    "fa-pinterest",
    "fa-google",
    "fa-telegram"
]

let cards = [];

let moves = 0;
let counter = document.querySelector(".moves");

let matchedCard = document.getElementsByClassName("match");
console.log(matchedCard);

const deck = document.querySelector(".deck");

const gameOver = document.querySelector(".congratulations");

let deckSize = document.querySelector(".deck-size");

deckSize.addEventListener("change", startGame);

let openedCards = [];

let displayCard = function()
{
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
}

function shuffle(array)
{
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0)
    {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    
    return array;
}

function setDeckSize(selectedSize)
{

    let shuffledImages = shuffle(images);

    let pair = 1;

    for (let i = 0; i < selectedSize; i++)
    {
        for (let j = 0; j < selectedSize; j++)
        {
            if (pair > selectedSize * selectedSize / 2)
            pair = 1;

            let item = document.createElement("li");
            item.classList.add("card");
            item.type = "img" + pair;
            let image = document.createElement("i");
            image.classList.add("fa", shuffledImages[pair - 1]);
            item.appendChild(image);
            cards.push(item);
            deck.appendChild(item);
            pair++;
        }   
    }

    switch(selectedSize)
    {
        case "2":
            deck.style.width = "330px";
            deck.style.height = "330px";
            [].forEach.call(cards, element => {
                element.style.width = "125px";
                element.style.height = "125px";
            });
            break;
        case "4":
            deck.style.width = "660px";
            deck.style.height = "660px";
            [].forEach.call(cards, element => {
                element.style.width = "125px";
                element.style.height = "125px";
            });
            break;
        case "6":
            deck.style.width = "660px";
            deck.style.height = "660px";
            [].forEach.call(cards, element => {
                element.style.width = "80px";
                element.style.height = "80px";
            });
            break;
    }
    deck.style.gridTemplateColumns = `repeat(${selectedSize}, 1fr)`;

    let card = document.getElementsByClassName("card");

    for (let i = 0; i < card.length; i++)
    {
        card[i].addEventListener("click", displayCard);
        card[i].addEventListener("click", cardOpen);
        // card[i].addEventListener("click", congratulations);
    }
}

let selectedSize;

function startGame()
{
    cards = [];
    
    deck.innerHTML = "";

    selectedSize = deckSize.value;

    setDeckSize(selectedSize);
    openedCards = [];

    let shuffledCards = shuffle(cards);

    for (let i = 0; i < shuffledCards.length; i++)
    {
        [].forEach.call(shuffledCards, item => deck.appendChild(item));
        cards[i].classList.remove("show", "open", "match", "disabled");
    }
    moves = 0;
    counter.innerHTML = moves;

    second = 0;
    minute = 0; 
    hour = 0;
    var timer = document.querySelector(".timer");
    timer.innerHTML = "0 min 0 sec";
    clearInterval(interval);
}

function cardOpen()
{
    openedCards.push(this);
    
    if (openedCards.length === 2)
    {
        moveCounter();
        disable();
        setTimeout(function(){
            if (openedCards[0].type === openedCards[1].type)
                matched();
            else
                unmatched();
        }, 800);
    }
}

function matched()
{
    openedCards[0].classList.add("match");
    openedCards[1].classList.add("match");
    congratulations();
    openedCards[0].classList.add("show", "open");
    openedCards[1].classList.add("show", "open");
    enable();
    openedCards = [];
}

function unmatched()
{
    openedCards[0].classList.add("unmatched");
    openedCards[1].classList.add("unmatched");
    //disable();
    setTimeout(function(){
        openedCards[0].classList.remove("show", "open", "unmatched");
        openedCards[1].classList.remove("show", "open", "unmatched");
        enable();
        openedCards = [];
    }, 500);
}

function disable()
{
    Array.prototype.filter.call(cards, function(card){
        card.classList.add('disabled');
    });
}

function enable()
{
    Array.prototype.filter.call(cards, function(card){
        card.classList.remove('disabled');
        for (let i = 0; i < matchedCard.length; i++)
            matchedCard[i].classList.add("disabled");
    });
}

let second = 0;
let minute = 0;
let hour = 0;
let timer =  document.querySelector(".timer");
let interval;
function startTimer()
{
    interval = setInterval(function(){
        timer.innerHTML = minute + " min " + second + " sec";
        second++;
        if (second == 60)
        {
            minute++;
            second = 0;
        }
        if (minute == 60)
        {
            hour++;
            minute = 0;
        }
    }, 1000);
}

function moveCounter()
{
    moves++;
    counter.innerHTML = moves;
    
    if(moves == 1)
    {
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
}

function congratulations()
{
    
    console.log(matchedCard.length);
    // console.log(matchedCard)
    if (matchedCard.length == selectedSize * selectedSize)
    {
        clearInterval(interval);
        setTimeout(function(){

            console.log("Game over");
            deck.innerHTML = "Game over!";
            deck.style.gridTemplateColumns = "1fr";
        }, 2000);
        
        
    }
}

window.onload = startGame();

