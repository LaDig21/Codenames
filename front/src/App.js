import React, { Component } from 'react'
import shuffle from 'lodash.shuffle'

import './App.scss'
import Card from './Card'
import Button from './Button'
import ScoreCount from './ScoreCount'
import Seed from './Seed'

const SIDE = 5
const WORDS = ['Accident',
'Achat',
'Acné',
'Action',
'Adolescent',
'Afrique',
'Aiguille',
'Allumer',
'Alpes',
'Alphabet',
'Altitude',
'Amérique',
'Ami',
'Amour',
'Ampoule',
'Anniversaire',
'Appétit',
'Araignée',
'anticonstitutionnellement']

var shuffleSeed = require('shuffle-seed');
var randomString = require('random-string');
var randomNumber = require('random-seed');
var seedValueDefault = randomString();
var seedValue = ''

const queryString = require('query-string');
// récupération de la Seed si elle existe, sinon génération d'une seed aléatoire
const parsed = queryString.parse(window.location.search);
if (parsed.seed==undefined) {
  seedValue = seedValueDefault
}
else {
  seedValue = parsed.seed
}
console.log(seedValue);
var turnInit = defineFirstTurn(seedValue)

function defineFirstTurn(seedValue) {
  var rand = randomNumber.create(seedValue);
  var numberTest = rand(99)
  console.log(numberTest);
  if (numberTest > 49) {
    return 'blue'
  }
  else {
    return 'red'
  }
}

class App extends Component {
  state = {
      seed: seedValue,
      cards: this.generateCards(seedValue),
      team: this.generateTeam(seedValue,turnInit),
      cardSelected: [],
      cardToBeFound: this.generateCardToBeFound(turnInit), 
      scoreTotal: [0, 0],
      viewMode: 'normal',
      turn: turnInit,
      gameFinish : false   
      
  }

  generateCardToBeFound(turn) {
    if (turn=='red'){
      return [7,8]
    }
    else{
      return [8,7]
    }
  }

  generateCards(seed) {
    const result = []
    const size = SIDE * SIDE
    console.log(seed)
    const candidates = shuffleSeed.shuffle(WORDS,seed)
    while (result.length < size) {
      const card = candidates.pop()
      result.push(card)
    }
    return shuffleSeed.shuffle(result,seed)
  }

  generateTeam(seed,turn) {
    var whiteNbr = 9
    var redNbr = 7
    var blueNbr = 7
    if (turn=='red'){
      redNbr = 8
    }
    else{
      blueNbr = 8
    } 
    var result = []
    for (var i = 0; i < whiteNbr; i++){
      result.push('white')
    }
    for (var i = 0; i < blueNbr; i++){
      result.push('blue')
    }
    for (var i = 0; i < redNbr; i++){
      result.push('red')
    }
    result.push('black')
    return shuffleSeed.shuffle(result,seed);
  }

// ACtion sur le clic d'une carte :
handleCardClick = index => {
  const { viewMode, cardSelected,team,gameFinish,turn,scoreTotal,cardToBeFound } = this.state
  const cardToAdd = cardSelected
  var newCardToBeFound = cardToBeFound
  var newScoreTotal = scoreTotal
  var newTurn = turn
  // 1 - On découvre la carte si on est dans le mode de visu normal
  if (viewMode=='normal' && !cardToAdd.includes(index)){
    cardToAdd.push(index)
    this.setState({ cardSelected:cardToAdd })
    // Si ma carte est bleu et que le jeu n'est pas déjà fini, on ajoute un point
    if (team[index] == 'blue' && !gameFinish){
      newCardToBeFound[0] --
      // Si c'était la dernière carte bleue à trouver le jeu est fini et on ajoute un point au score total
      if (newCardToBeFound[0] == 0){
        this.setState({ gameFinish:true })
        newScoreTotal[0]++
      }
      // Si c'est l'autre équipe qui a cliqué sur la carte, on change de tour
      if (newTurn=='red'){
        newTurn='blue'
      }
    }
    // Si ma carte est rouge et que le jeu n'est pas déjà fini, on ajoute un point
    if (team[index] == 'red' && !gameFinish){
      newCardToBeFound[1] --
      // Si c'était la dernière carte rouge à trouver le jeu est fini et on ajoute un point au score total
      if (newCardToBeFound[1] == 0){
        this.setState({ gameFinish:true })
        newScoreTotal[1]++
      }
      // Si c'est l'autre équipe qui a cliqué sur la carte, on change de tour
      if (newTurn=='blue'){
        newTurn='red'
      }
    }
    // Si la carte est noire, le jeu est fini et on ajoute un point au général à l'autre équipe
    if (team[index] == 'black' && !gameFinish) {
      this.setState({ gameFinish:true })
      if (turn=='red') {
        newScoreTotal[0]++
      }
      else{
        newScoreTotal[1]++
      }
    }
    // Si la carte est blanche, on change le tour si le jeu n'est pas déjà fini
    if (team[index] == 'white' && !gameFinish) {
      if (newTurn=='red') {
        newTurn='blue'
      }
      else{
        newTurn='red'
      }
    }
    // On met à jour les scores de partie et le score total et le tour
    this.setState({ cardToBeFound:newCardToBeFound })
    this.setState({ scoreTotal:newScoreTotal })
    this.setState({ turn:newTurn })
  }
}

getFeedbackForCard(index) {
  const { viewMode,team, cardSelected } = this.state

  if (viewMode=='spymaster'){
    return this.changeFeedback(index,team)
  }
  if (viewMode=='normal' && cardSelected.includes(index)){
    return this.changeFeedback(index,team)
  }
}

changeFeedback(index,team){
  if (team[index]=='red'){
    return 'redTeam'
  }
  if (team[index]=='blue'){
    return 'blueTeam'
  }
  if (team[index]=='white'){
    return 'whiteTeam'
  }
  if (team[index]=='black'){
    return 'blackTeam'
  }
}

changeViewMode = () => {
  const { viewMode } = this.state
  if (viewMode=='normal') {
    this.setState({ viewMode: 'spymaster' })
    console.log(viewMode)
    return
  }
  if (viewMode=='spymaster') {
    this.setState({ viewMode: 'normal' })
    console.log(viewMode)
    return
  }
  
}

changeTurn = () => {
  const { viewMode, turn} = this.state
  if (viewMode=='normal') {
    if (turn == 'blue') {
      this.setState({ turn: 'red' })
    }
    if (turn == 'red') {
      this.setState({ turn: 'blue' })
    }
    
  }
}

generateNewGame = () => {
  const newSeed = randomString()
  const newTurn = defineFirstTurn(newSeed)
  const newTeam = this.generateTeam(newSeed,newTurn)
  const newCards = this.generateCards(newSeed)
  this.setState({ seed:newSeed })
  this.setState({ turn:newTurn })
  this.setState({ team:newTeam })
  this.setState({ cards:newCards })
  this.setState({ cardSelected:[] })
  this.setState({ gameFinish:false })
  this.setState({ cardToBeFound:this.generateCardToBeFound(newTurn) }) 
}

  render() {
    const { cards, cardToBeFound,scoreTotal,team, turn,seed } = this.state
    return (
      

      <div className="app_body">
        <div classNames ="user">
          TEST
        </div>
        <ScoreCount scoreBlue={cardToBeFound[0]}
                    scoreRed = {cardToBeFound[1]}
                    scoreTotal = {scoreTotal}
                    turn={turn} />
        
        <div className="codenames">
        {cards.map((card, index) => (
            <Card
              card={card}
              feedback={this.getFeedbackForCard(index)}
              key={index}
              index={index}
              team = {team[index]}
              onClick={this.handleCardClick}
            />
          ))}
        </div>
        <div className="foot">
        <Button 
        text = 'Passer Spy Master'
        onClick = {this.changeViewMode}
        />
        <Button 
        text = 'Switch Turn'
        onClick = {this.changeTurn}
        />
        <Button 
        text = 'New Game'
        onClick = {this.generateNewGame}
        />
        <Seed
        seed={seed} />
        </div>
      </div>
    )
  }

  

}

export default App
