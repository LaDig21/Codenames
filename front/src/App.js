import React from 'react'
import 'semantic-ui-css/semantic.min.css'
import {Label, Icon} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

import './App.scss'
import Main from './Main'
import GameForm from './GameForm'


const App = () => {
    return (
        <div>
            <div className = 'header' id='header'>
                <Label color = 'black' size = 'huge'>
                    <Icon name='detective' className = 'icon' color='blue'/> 
                        CODENAMES  
                    <Icon name='detective' color='red'/>
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