// Defining text characters for the empty and full hearts for you to use later.
const EMPTY_HEART = '♡'
const FULL_HEART = '♥'

// Your JavaScript code goes here!
//Get error bar
let errorBar = document.querySelector("div#modal")
let errorMsg = document.querySelector("p#modal-message")

//Iterate through all of the articles like icons
let likeHearts = document.querySelectorAll("span.like-glyph")
//add event listener so that if the heart is clicked, check if the inner text(the heart) is full or empty
likeHearts.forEach(heart => {
  //heart = <span class="like-glyph">♡</span>
  heart.addEventListener("click", () => {
    if (heart.innerText === EMPTY_HEART) {
      //if empty, call for a "server request"
      mimicServerCall()
        .then(resp => {
          //if "request" successful, change heart to full heart and color to red(add .activated-heart to class list)
          console.log(resp)
        
          heart.innerText = FULL_HEART
          heart.classList.add("activated-heart")
        })
        .catch(err => {
          //if not, show error at the top of the page for 3 seconds with details of the error (remove .hidden from classlist)
          errorMsg.innerText = err
          errorBar.classList.remove("hidden")

          setTimeout(() =>{
            errorMsg.innerText = "Error!"
            errorBar.classList.add("hidden")
          }, 3000)
          
        })
    } else {
      //if full change heart to empty and remove .activated-heart class
      heart.innerText = EMPTY_HEART
      heart.classList.remove("activated-heart")
    }
  })
});




//------------------------------------------------------------------------------
// Don't change the code below: this function mocks the server response
//------------------------------------------------------------------------------

function mimicServerCall(url="http://mimicServer.example.com", config={}) {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      let isRandomFailure = Math.random() < .2
      if (isRandomFailure) {
        reject("Random server error. Try again.");
      } else {
        resolve("Pretend remote server notified of action!");
      }
    }, 300);
  });
}
