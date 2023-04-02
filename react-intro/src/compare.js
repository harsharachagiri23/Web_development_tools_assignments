function compare( word, guess ) {  
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


export function compWord(secret_Word, guess_Word){

    if(guess_Word.toLowerCase() === secret_Word.toLowerCase()){
        return true;
    }
    else if(guess_Word.length !== secret_Word.length){
        return false;
    }
    else{
        const commonLetters = compare(secret_Word, guess_Word);
        return commonLetters;
    }
  }

