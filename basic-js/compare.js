"use strict";

const { workerData } = require("worker_threads");

/* DO NOT MODIFY EXCEPT WHERE ALLOWED */
module.exports = compare; // DO NOT MODIFY - USED FOR TESTING

function compare( word, guess ) { 
   // DO NOT MODIFY

   let count = 0;
   let wordFreq = { };
   let guessFreq = { };
   guess = guess.toLowerCase();
   word = word.toLowerCase();

    for(let index in word) {
       if(word[index] in wordFreq){
         wordFreq[word[index]]++;
         
       }
       else{
        wordFreq[word[index]]=1;
       }
    }

  for(let index in guess) {
    if(guess[index] in guessFreq){
      guessFreq[guess[index]]++;
      
    }
    else{
     guessFreq[guess[index]]=1;
    }
  }

  for ( const property in guessFreq) {
   
       if(wordFreq[property]===guessFreq[property]){
         count = count + wordFreq[property];   
       }
       else{
         if(guessFreq[property]===undefined || wordFreq[property]===undefined){

            continue;
         }
        
         count = count + Math.min(wordFreq[property], guessFreq[property]); 
         

       }

    
  }
    return count;
}

