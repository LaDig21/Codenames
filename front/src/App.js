import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Label, Icon} from 'semantic-ui-react'
import {BrowserRouter as Router, Link, Redirect, Route, Switch} from 'react-router-dom'

import './App.scss'
import Main from './Main'
import GameForm from './GameForm'


const App = () => {
    const [gameName, setGameName] = useState('');
    const [gameNameCreated, setGameNameCreated] = useState();

    function handleChange(e,{value }){setGameName(value)
    console.log(value)}

    function handleSubmit(e){console.log('lol')}

    async function createGame(){
        fetch('/create_game')
            .then(async res => {
            const result = await res.json()
            setGameNameCreated(result.gamename)
            console.log(result.gamename)
            })
            .catch(e => console.warn('Error: ', e))
    }
 
    return (
        <div>
            <div className = 'header' id='header'>
                <Label color = 'black' size = 'huge'>
                    <Icon name='detective' className = 'icon'/> 
                        CODENAMES  
                    <Icon name='detective' />
                </Label>
            </div>
            <Router>
                <Switch>
                    <Route path="/game/:id" children={<Main />} />
                    <Route path="/" children={<GameForm />} />
                </Switch>
            </Router>
        </div>
    )   
}

export default App