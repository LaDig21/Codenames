import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Loader, Grid} from 'semantic-ui-react'

import './App.scss'
import Card from './Card'
import Header from './Header'
import Foot from './Foot'


const init = {'feedback' : 0}

 
const App = () => {
    const [game, setGame] = useState(init);
    const [view, setView] = useState('normal');

    useEffect(() => {
        const interval = setInterval(() => {
            fetch('/AAAAAB')
            .then(async res => {
            const result = await res.json()
            setGame(result)
            })
            .catch(e => console.warn('Error: ', e))
        }, 1000);
        return () => clearInterval(interval);
      }, []);

    function changeView(view){
        if (view == 'normal'){
            setView('spymaster')
        }
        else if (view == 'spymaster'){
            setView('normal')
        }
    }

    function getFeedback(index){
        if (view == 'spymaster'){
            console.log(game.team[index])
            return game.team[index]
        }
        else {
            console.log(game.feedback[index])
            return game.feedback[index]
        }
    }

    async function handleCardClick(index){
        const gamename = game.gamename
        const data = {gamename, index}
        const response = await fetch('/change_feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(data)
        })
    }

    async function handleNewTurn(){
        const response = await fetch('/change_turn', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(game)
        })
    }

    async function handleNewRound(){
        const response = await fetch('/create_round', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify(game)
        }).then(async res => {
            const result = await res.json()
            view == 'spymaster' && changeView(view)
            setGame(result)
            })
    }

    return (
        <div className="app_body">
             
            {game.feedback.length > 1 
            ? <div>
                <Header game={game}/>
                
                <div className="codenames" id="codenames">
                    
                    <Grid columns={5} centered stretched textAlign='center'>
                    {game.word.map((word, index) => (
                    <Grid.Column key={index} textAlign='center'>
                        <Card
                            card={word}
                            feedback={getFeedback(index)}
                            key={index}
                            index={index}
                            team = {game.team[index]}
                            onClick={handleCardClick}
                        />           
                    </Grid.Column>
                    ))}
                    </Grid>
                </div>
                <Foot   view={view}
                        changeView={changeView}
                        handleNewTurn={handleNewTurn}
                        handleNewRound={handleNewRound}
                />
            </div>


            : <Loader active inline='centered' size = 'huge'>Loading</Loader>

            }
            
        </div>
        )   
    }

export default App