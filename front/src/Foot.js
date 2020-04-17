import React from 'react'            
import {Button, Icon} from 'semantic-ui-react'
import './App.scss'    



const Foot = ({view, changeView, handleNewTurn, handleNewRound}) => ( 
<div className="foot">
    <Button color='black' icon labelPosition='right' onClick={()=>changeView(view)}>
        {view == "normal" ? 'Passer Spy Master' : 'Passer vue normale'}
        {view == "normal" ? <Icon name='detective' /> : <Icon name='user' />}
    </Button>
    <Button color='black' icon labelPosition='right' onClick = {()=>handleNewTurn()}>
        Changer Tour
        <Icon name='arrow alternate circle right outline' />
    </Button>
    <Button color='black' icon labelPosition='right' onClick = {()=>handleNewRound()}>
        Nouvelle Partie
        <Icon name='sync alternate' />
    </Button>
    
</div>
)


export default Foot
