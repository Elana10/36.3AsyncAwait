
// PART ONE

let favNum = 4;
let baseURL = 'http://numbersapi.com/'
// 'year?json

// 1) Make a request to the Numbers API (http://numbersapi.com/) to get a fact about your favorite number. (Make sure you get back JSON by including the json query key, specific to this API.?

async function numsRequest(){
    try{
        let numFact = await axios.get(`${baseURL}${8}?json`)
        console.log(`Question 1: ${numFact.data.text}`)
    } catch(e){
        console.log(`Error: ${e}`)
    }
}
numsRequest()



// 2) Figure out how to get data on multiple numbers in a single request. Make that request and when you get the data back, put all of the number facts on the page.

let numbers = [3,7,9]

async function manyNumFacts(){
    try{
        let response = await axios.get(`${baseURL}${numbers}`);
        for (let res in response.data){
            console.log(`Question 2:`)
            console.log(response.data[res])
        }
    } catch(e){
        console.log(`Error: ${e}`)
    }
}
manyNumFacts()

// 3) Use the API to get 4 facts on your favorite number. Once you have them all, put them on the page. It’s okay if some of the facts are repeats.

async function fourFacts(){
    let fourInfo = []
    for(let i=1; i<5; i++){
        let ans = await axios.get(`${baseURL}${favNum}?json`)
        fourInfo.push(ans.data.text)
    }
    for(let fact of fourInfo){
        console.log('Question 3:')
        console.log(fact)
    }
}
fourFacts()

// PART TWO

// 1) Make a request to the Deck of Cards API to request a single card from a newly shuffled deck. Once you have the card, console.log the value and the suit (e.g. “5 of spades”, “queen of diamonds”).

let cardURL = 'https://deckofcardsapi.com/api/deck/'
// <<deck_id>>/draw/?count=2

async function newCard(){
    let card = await axios.get(`${cardURL}new/draw/?count=1`)
    console.log(`Part 2, Q1: ${card.data.cards[0].value} of ${card.data.cards[0].suit}`)
}
newCard()


// 2) Make a request to the deck of cards API to request a single card from a newly shuffled deck. Once you have the card, make a request to the same API to get one more card from the **same** deck.
// Once you have both cards, ***console.log*** the values and suits of both cards.

async function twoCardDraw(){
    try{
    let card = await axios.get(`${cardURL}new/draw/?count=1`)
    let card2 = await axios.get(`${cardURL}${card.data.deck_id}/draw/?count=1`)
    console.log(`Part 2, Q2: First = ${card.data.cards[0].value} of ${card.data.cards[0].suit} and Second = ${card2.data.cards[0].value} of ${card2.data.cards[0].suit}`)        
    } catch(e){
        console.log(e)
    }
}
twoCardDraw()

// 3) Build an HTML page that lets you draw cards from a deck. When the page loads, go to the Deck of Cards API to create a new deck, and show a button on the page that will let you draw a card. Every time you click the button, display a new card, until there are no cards left in the deck.

document.addEventListener("DOMContentLoaded", function(event){ 
    const cardArea = document.querySelector("#card_area")
    const button = document.querySelector("#next_card")
    let deck_id = null;

    async function getTheDeck(){
        try{
        let res = await axios.get('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        deck_id = res.data.deck_id            
        } catch(e) {
            console.log(e)
        }
    }
    getTheDeck()

    async function drawTheNextCard(){
        try{
            let res = await axios.get(`https://deckofcardsapi.com/api/deck/${deck_id}/draw/?count=1`)
            const card = document.createElement('img')
            card.setAttribute('src',res.data.cards[0].image)
            card.style.transform = `translate(${Math.random()* 40-20}px, ${Math.random()*40-20}px) rotate(${Math.random()* 90 -45}deg)`
            cardArea.append(card)

            if(res.data.remaining === 0){
                button.textContent = 'All Done!';
                button.removeEventListener()
            }            
        } catch(e){
            console.log(e)
        }
    }

    button.addEventListener('click', drawTheNextCard)


})