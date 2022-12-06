let currentQuestion = 0;
let score = 0;
let lifeLineUses = 2;
let lifeLineUsedThisTurn = false;
let questions = [
   {
	   "question": "Which ocean is the biggest?",
	   "a": "Atlantic",
	   "b": "Arctic",
	   "c": "Pacific",
	   "d": "Indian",
	   "image":"quizimages/Ocean.jpg",
	   "answer": "c",
      "wronganswer1": "b",
      "wronganswer2": "d",
      "hint": "We are in it"
   },
   {
	   "question": "Which country has the most people?",
	   "a": "U.S.A",
	   "b": "Russia",
	   "c": "India",
	   "d": "China",
	   "image":"quizimages/crowd_v2.jpg",
	   "answer": "d",
      "wronganswer1": "a",
      "wronganswer2": "b",
      "hint": "It's in asia"
   },
   {
      "question": "Which country is the biggest?",
      "a": "Russia",
      "b": "U.S.A",
      "c": "Canada",
      "d": "Brazil",
      "image":"quizimages/Globe.jpg",
      "answer": "a",
      "wronganswer1": "b",
      "wronganswer2": "c",
      "hint": "They do not speak english there"
   },
   {
      "question": "What mountain is the tallest?",
      "a": "Everest",
      "b": "Fuji",
      "c": "Douglas",
      "d": "Tolmie",
      "image":"quizimages/Mountain.jpg",
      "answer": "a",
      "wronganswer1": "c",
      "wronganswer2": "d",
      "hint": "It is not in victoria"
   },
   {
      "question": "What is the coldest place?",
      "a": "Arctic",
      "b": "Canada",
      "c": "Russia",
      "d": "Antarctic",
      "image":"quizimages/Tundra.jpg",
      "answer": "d",
      "wronganswer1": "a",
      "wronganswer2": "b",
      "hint": "It is not a country"
   },
   {
      "question": "What is the hottest place?",
      "a": "Sahara",
      "b": "Iceland",
      "c": "Death Valley",
      "d": "Mexico",
      "image":"quizimages/Desert.jpg",
      "answer": "c",
      "wronganswer1": "b",
      "wronganswer2": "d",
      "hint": "It is not a country"
   },
   {
      "question": "Which island is bigger?",
      "a": "Vancouver Island",
      "b": "Australia",
      "c": "Japan",
      "d": "Madagascar",
      "image":"quizimages/Island.jpg",
      "answer": "b",
      "wronganswer1": "c",
      "wronganswer2": "d",
      "hint": "It is a country"
   },
   {
      "question": "What is the biggest continent?",
      "a": "Asia",
      "b": "Africa",
      "c": "North America",
      "d": "Europe",
      "image":"quizimages/Continent.jpg",
      "answer": "a",
      "wronganswer1": "c",
      "wronganswer2": "d",
      "hint": "It is also home to the biggest country"
   },
   {
      "question": "How many people live in Canada?",
      "a": "32 Million",
      "b": "55 Million",
      "c": "38 Million",
      "d": "27 Million",
      "image":"quizimages/Canada.jpg",
      "answer": "c",
      "wronganswer1": "b",
      "wronganswer2": "d",
      "hint": "XXXVIII"
   },
   {
      "question": "What body of water is always salty?",
      "a": "Lake",
      "b": "River",
      "c": "Pond",
      "d": "Ocean",
      "image":"quizimages/Water.jpg",
      "answer": "d",
      "wronganswer1": "a",
      "wronganswer2": "c",
      "hint": "They are also the biggest bodies of water"
   }
 ];

 if ('serviceWorker' in navigator) {
   navigator.serviceWorker.register('/sw.js');
 };
 
 
 function loadQuestion() {

    // close light box for first question
    if (currentQuestion == 0) {
       closeLightBox();
    }
     
    // load the image
    let img = document.getElementById("image");
    img.src = questions[currentQuestion].image;
    img.style.maxWidth = "70vh";
	img.style.maxHeight = "80vh";
    
    // load the question and answers
    document.getElementById("question").innerHTML = questions[currentQuestion].question;
    document.getElementById("a").innerHTML = "A. " + questions[currentQuestion].a;
    document.getElementById("b").innerHTML = "B. " + questions[currentQuestion].b;
    document.getElementById("c").innerHTML = "C. " + questions[currentQuestion].c;
    document.getElementById("d").innerHTML = "D. " + questions[currentQuestion].d;
    document.getElementById("hint").innerHTML = "Click for a hint";
 } // loadQuestion
 
 
 function markIt(ans) {
   lifeLineUsedThisTurn = false;
    
   let message = "";
    
   if (ans == questions[currentQuestion].answer) {
        
      // add 1 to score
      score++;
       
      // display score 
      document.getElementById("score").innerHTML = score + " / " + questions.length;
       
      message = "Correct!!!! Your score is " + score + " / " + questions.length;
   } else {
      message = "Incorrect Your score is " + score + " / " + questions.length; 
   } // else
        
   
    
   // move to the next question
   currentQuestion++;
   if (currentQuestion >= questions.length) {
      // create a special message
      if(score <= 5){
         message = "You Failed!";
      }else if(score >= 9){
         message = "You Did Great!";
      }else{
         message = "You Did Ok";
      }
   } else {
      loadQuestion();
   }
    
   // show the lightbox
   document.getElementById("lightbox").style.display = "block";
   document.getElementById("message").innerHTML = message;
  
 }  // markIt
 
 function closeLightBox() {
    document.getElementById("lightbox").style.display = "none";
 } // closeLightbox
 
 function lifeline(){
      if(lifeLineUsedThisTurn == false && lifeLineUses > 0){
         document.getElementById(questions[currentQuestion].wronganswer1).innerHTML = "";
         document.getElementById(questions[currentQuestion].wronganswer2).innerHTML = "";
         lifeLineUses--;
         lifeLineUsedThisTurn = true;
         console.log(lifeLineUsedThisTurn);
         document.getElementById("uses").innerHTML = "Uses: " + lifeLineUses;
      }
}

function hint(){
   if(lifeLineUsedThisTurn == false && lifeLineUses > 0){
      document.getElementById("hint").innerHTML = questions[currentQuestion].hint;
      lifeLineUses--;
      lifeLineUsedThisTurn = true;
      document.getElementById("uses").innerHTML = "Uses: " + lifeLineUses;
   }
}
 
 
 
 
 
 
 
 
 
 
   
