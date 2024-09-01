const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");
const shareQuote = document.getElementById("share-quote");

//Share btns
const threadBtn = document.querySelector(".fa-threads");
const whatsappBtn = document.querySelector(".fa-whatsapp");
const twitterBtn = document.querySelector(".fa-x-twitter");

let apiQuotes = [];

//Show Loading
function loading() {
  loader.hidden = false;
  shareQuote.hidden = true;
  quoteContainer.hidden = true;
}

//Hide Loading
function complete() {
  quoteContainer.hidden = false;
  shareQuote.hidden = false;
  loader.hidden = true;
}

//Show new Quote
function newQuote() {
  loading();
  //Pick a random quote from apiQuotes array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //Triming author's field
  let words = quote.author.split(",");
  let newAuthor = words.slice(0, 1);

  //Check if Author field is blank
  if (newAuthor == "type.fit") {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = newAuthor;
  }

  //Quote is very long
  if (quote.text.length > 70) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }

  //Set quote, Hide Loader

  quoteText.textContent = quote.text;
  complete();
}
// Get Quotes from API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (err) {
    //Catch Error here
  }
}

//Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

//Instagram Quote
function instaShare() {
  const instaUrl = `https://threads.net/intent/post?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(instaUrl, "_blank");
}

//Whatsapp share
function WhatsappQuote() {
  const whatsappUrl = `whatsapp://send?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(whatsappUrl, "_blank");
}

// On Load
getQuotes();
// loading();

//Event Listeners
whatsappBtn.addEventListener("click", WhatsappQuote);
twitterBtn.addEventListener("click", tweetQuote);
threadBtn.addEventListener("click", instaShare);
newQuoteBtn.addEventListener("click", getQuotes);
