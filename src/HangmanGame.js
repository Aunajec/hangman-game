import './App.css';
import React from 'react';
import LetterBox from './LetterBox';
import SingleLetterSearchbar from './SingleLetterSearchBar';

const pics = [
  '/images/mnm_end.png',       // Final stage - M&M bag
  '/images/no_left_arm.png',   // Left arm removed
  '/images/no_right_arm.png',  // Right arm removed
  '/images/no_left_leg.png',   // Left leg removed
  '/images/no_right_leg.png',  // Right leg removed
  '/images/full_mnm.png'       // Full M&M character
];

const words = ["Adventure", "Balance", "Courage", "Dolphin", "Eclipse", "Festival", "Harmony", "Jigsaw", "Lantern", "Mystery", "Notebook", "Orbit", "Pioneer", "Quest", "Rainbow", "Sunset", "Treasure", "Universe", "Voyager", "Whisper"];

class HangmanGame extends React.Component {
  state = {
    wordList: words,
    curWord: 0,  // Ensuring curWord is a valid index
    lifeLeft: 5,
    usedLetters: []
  }

  componentDidMount() {
    this.startNewGame();
  }

  handleGuess = (letter) => {
    const { usedLetters, lifeLeft, wordList, curWord } = this.state;
    if (usedLetters.includes(letter) || lifeLeft === 0) return;
    
    const newUsedLetters = [...usedLetters, letter];
    const currentWord = wordList[curWord].toLowerCase();
    
    let newLifeLeft = lifeLeft;
    if (!currentWord.includes(letter)) {
      newLifeLeft -= 1;
    }

    this.setState({
      usedLetters: newUsedLetters,
      lifeLeft: newLifeLeft
    });
  }

  renderWordDisplay = () => {
    const word = this.state.wordList[this.state.curWord] ? this.state.wordList[this.state.curWord].toLowerCase() : "";
    return word.split('').map((letter, index) => (
      this.state.usedLetters.includes(letter) || letter === ' ' ? letter : '_'
    )).join(' ');
  }

  startNewGame = () => {
    this.setState({
      curWord: Math.floor(Math.random() * this.state.wordList.length),
      lifeLeft: 5,
      usedLetters: []
    });
  }

  render(){
    if (!this.state.wordList[this.state.curWord]) {
      return <p>Loading...</p>;
    }
    
    return(
      <div>
        <img src={process.env.PUBLIC_URL + pics[this.state.lifeLeft]} alt="Hangman Stage" style={{ width: '250px', height: 'auto' }} />
        <button onClick={this.startNewGame}>New Game</button>
        <div>
          {this.state.wordList[this.state.curWord].split('').map((letter, index) => (
            <LetterBox 
              key={index} 
              letter={letter} 
              guessed={this.state.usedLetters.includes(letter)}
            />
          ))}
        </div>
        <SingleLetterSearchbar onGuess={this.handleGuess} />
        <p>Used Letters: {this.state.usedLetters.join(', ')}</p>
        {this.state.lifeLeft === 0 && <p>Game Over! The word was {this.state.wordList[this.state.curWord]}</p>}
      </div>
    )
  }
}

export default HangmanGame;
