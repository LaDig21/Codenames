import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Loader, Grid} from 'semantic-ui-react'
import {useParams} from "react-router-dom";
import io from 'socket.io-client'

import './App.scss'
import Card from './Card'
import TopScore from './TopScore'
import Foot from './Foot'


const init = {'feedback' : 0}

const socket = io('localhost:5000')
 
const Main = () => {
    const [game, setGame] = useState(init);
    const [view, setView] = useState('normal');
    const gameID = useParams();

    useEffect(() => {
        const gamename = gameID.id
        socket.emit('join_game', {gamename })
        return () => socket.disconnect() ;
      }, [] );
    
    useEffect(() => {
        socket.on("get_game", data => {
            setGame(data)
          });
      }, [] );

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
            return game.team[index]
        }
        else {
            return game.feedback[index]
        }
    }

    function handleCardClick(index){
        const gamename = game.gamename
        const data = {gamename, index}
        socket.emit('change_feedback', data)
    }

    function handleNewTurn(){
        const gamename = game.gamename
        const data = {gamename}
        socket.emit('change_turn', data)
    }

    async function handleNewRound(){
        const gamename = game.gamename
        const data = {gamename}
        socket.emit('create_round', data)
        if (view == 'spymaster'){
            changeView(view)
        }
    }

    return (
        <div className="app_body">           
            {game.feedback.length > 1 
            ? <div>
                <TopScore game={game}/>
                
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

export default Main