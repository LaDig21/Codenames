import React, { useState, useEffect } from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Form, Button} from 'semantic-ui-react'
import {Redirect} from 'react-router-dom'

import './App.scss'


const GameForm = () => {
    const [gameName, setGameName] = useState('');
    const [gameNameCreated, setGameNameCreated] = useState();
    const [nameIsValid, setNameIsValid] = useState();
    const [gameExist, setGameExist] = useState();

    function handleChange(e,{value }){
        setGameName(value)
        console.log(value.length)
        setNameIsValid(value.length == 6)}

    function handleSubmit(e){
        fetch(`/${gameName}`)
            .then(async res => {
            const result = await res.json()
            if (res.ok){ 
                console.log(result.gamename)
                setGameNameCreated(result.gamename)
                setGameExist(1)
            }
            })
            .catch(e => console.warn('Error: ', e))
    }

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
        <div className='gameform' id='gameform'>
            <Form onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Input className='inputGame'
                    placeholder='N° Partie'
                    name='name'
                    onChange={handleChange}
                    />
                    <Form.Button className='submitGame' content='Go' disabled={!nameIsValid}/>
                    {gameExist !== undefined && <Redirect to={`/game/${gameNameCreated}`}/>}      
                </Form.Group>
            </Form>
            <Button onClick={createGame}>Créer nouvelle partie</Button>
            {gameNameCreated !== undefined && <Redirect to={`/game/${gameNameCreated}`}/>}          
        </div>
    )   
}

export default GameForm