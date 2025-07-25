let score = JSON.parse(localStorage.getItem('score')) || {
    wins: 0,
    losses: 0,
    ties: 0 

  }

  if(score === null){
    score={
      wins: 0,
      losses: 0,
      ties: 0,
    }
  }

  JSscore();

  let isAutoplaying = false;
  let intervalId;
  
  function autoPlay(){
    try {
      if(!isAutoplaying) {
        intervalId = setInterval(function(){
          const playerMove = pickComputerMove();
          playGame(playerMove);
        }, 2000);
        isAutoplaying = true;
        
        // Update button text to show it's active
        const autoplayButton = document.querySelector('.autoplay');
        if(autoplayButton) {
          autoplayButton.textContent = 'Stop Auto Play';
          autoplayButton.style.background = 'linear-gradient(45deg, #ff6b6b, #ee5a24)';
        }
      } else {
        clearInterval(intervalId);
        isAutoplaying = false;
        
        // Reset button text
        const autoplayButton = document.querySelector('.autoplay');
        if(autoplayButton) {
          autoplayButton.textContent = 'Auto Play';
          autoplayButton.style.background = 'linear-gradient(45deg, #4ecdc4, #44a08d)';
        }
      }
    } catch (error) {
      console.error('Error in autoplay function:', error);
      // Reset state in case of error
      isAutoplaying = false;
      if(intervalId) {
        clearInterval(intervalId);
      }
    }
  }

  function playGame(playerMove) {
    const computerMove = pickComputerMove();

    let result = '';

    if (playerMove === 'scissors') {
      if (computerMove === 'rock') {
        result = 'You lose.';
      } else if (computerMove === 'paper') {
        result = 'You win.';
      } else if (computerMove === 'scissors') {
        result = 'Tie.';
      }

    } else if (playerMove === 'paper') {
      if (computerMove === 'rock') {
        result = 'You win.';
      } else if (computerMove === 'paper') {
        result = 'Tie.';
      } else if (computerMove === 'scissors') {
        result = 'You lose.';
      }
      
    } else if (playerMove === 'rock') {
      if (computerMove === 'rock') {
        result = 'Tie.';
      } else if (computerMove === 'paper') {
        result = 'You lose.';
      } else if (computerMove === 'scissors') {
        result = 'You win.';
      }
    }
    
    if(result === 'You win.'){
      score.wins += 1;
    }
    else if(result === 'You lose.'){
      score.losses += 1;
    }
    else if(result ==='Tie.'){
      score.ties += 1;
    }

    localStorage.setItem('score', JSON.stringify(score));

    document.querySelector('.JSresult').innerHTML = result;

    document.querySelector('.JSresult1').innerHTML = `Your move
    <img src=" images/${playerMove}-emoji.png" class="styleImg"> 
    <img src=" images/${computerMove}-emoji.png" class="styleImg">
    ComputerMove`;

    JSscore();

  }
  function JSscore(){
    document.querySelector('.JSscore').innerHTML = `Wins: ${score.wins}, losses: ${score.losses}, Ties: ${score.ties}`;
  }

  function resetthescore(){
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
  }

  function pickComputerMove() {
    const randomNumber = Math.random();

    let computerMove = '';

    if (randomNumber >= 0 && randomNumber < 1 / 3) {
      computerMove = 'rock';
    } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
      computerMove = 'paper';
    } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
      computerMove = 'scissors';
    }

    return computerMove;
  }