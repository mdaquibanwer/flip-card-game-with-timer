const Allcards = document.querySelectorAll(".card");
const time = document.querySelector(".time");
const totalflips = document.querySelector(".flips")
const refreshBtn = document.querySelector(".btn");

let cardOne,cardTwo,timer;
let disablaDeck = false;
let matchedCards = 0;
let totalTime = 60;
let timeLeft = totalTime;
let flips = 0;
let isPlaying = false;

const initTimer = ()=>{
    if(timeLeft === 0){
        return clearInterval(timer);
    }
    timeLeft--;
    time.innerText = `Time : ${timeLeft}`;
}

const shuffleCard = ()=>{
    matchedCards = 0;
    flips = 0;
    cardOne = cardTwo = "";
    timeLeft = totalTime;
    time.innerText = `Time : ${timeLeft}`;
    totalflips.innerText = `Flips : ${flips}`;
    disablaDeck = isPlaying = false; // reset all the variables
    // creating arr of 8 pairs of items
    let imgArr = [1,2,3,4,5,6,7,8,1,2,3,4,5,6,7,8]
    imgArr.sort(()=>Math.random() > 0.5 ? 1 : -1)   // sorting the array randomly
    Allcards.forEach((card,index)=>{
        card.classList.remove("flip");
        let imgTag = card.querySelector("img") // passsing radom image to each card
        imgTag.src = `images/img-${imgArr[index]}.png`
        card.addEventListener("click",flipCard)
    }) 
}

const matchCards = (img1,img2)=>{
    // console.log(img1,img2)
    if(img1 === img2){  // checking whether two card matched
        matchedCards++;   // increment the total no. of matched card

        if(matchedCards === 8){ // doing this because in this game total matched card possible is 8;
            setTimeout(() => {
                return shuffleCard();   // calling the function after 1 second
            }, 1000);
        }
        cardOne.removeEventListener("click",flipCard)
        cardTwo.removeEventListener("click",flipCard)
        cardOne = cardTwo = "";   // setting both card value to blank
        return disablaDeck = false;
    }
    // if cards not matched
    setTimeout(() => {
        // adding a class shake in the claslist of cards
        cardOne.classList.add("shake")
        cardTwo.classList.add("shake")
    }, 400);
    setTimeout(() => {
        // removing the class shake and flip from the claslist of cards if cards not matched
        cardOne.classList.remove("shake","flip")
        cardTwo.classList.remove("shake","flip")
        cardOne = cardTwo = "";   // setting both card value to blank
        disablaDeck = false;
    }, 1000);
}

const flipCard = (e)=>{
    // console.log(e.target);
    let clickedCard = e.target; // getting user clicked card
    if(!isPlaying){
        isPlaying = true;
        timer = setInterval(() => {
            initTimer();
        }, 1000);
    }
    if(clickedCard !== cardOne && !disablaDeck && timeLeft > 0){
        flips++;
        totalflips.innerText = `Flips : ${flips}`
        clickedCard.classList.add("flip");
        if(!cardOne){
            // returned the cardOne Value to clickedCard
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disablaDeck = true;
        let cardOneImg = cardOne.querySelector("img").src;
        let cardTwoImg = cardTwo.querySelector("img").src;

        matchCards(cardOneImg,cardTwoImg);
    }
}
shuffleCard(); // shuffle card is called here so that game starts with shuffling it

refreshBtn.addEventListener("click",shuffleCard);

Allcards.forEach(card=>{
    card.addEventListener("click",flipCard)
})