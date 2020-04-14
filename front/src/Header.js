import React from 'react'
import PropTypes from 'prop-types'                
import {Grid, Label} from 'semantic-ui-react'
import './App.scss'               
                
const Header = ({game}) => (                
<div className = 'top'>
    <Grid columns={3} centered stretched textAlign='center'>                
        <Grid.Column textAlign='center'>
            <Grid.Row>
                <Label color='black'>Cartes restantes</Label>
                <Label color='red'> {game.redscore} </Label>
                <Label color='blue'> {game.bluescore} </Label>
            </Grid.Row>
        </Grid.Column>
        <Grid.Column textAlign='center'>
            <Grid.Row>
                <Label color='black' size='medium'>N° Partie : {game.gamename} </Label>
                <Label color={game.turn}> Equipe {game.turn=='blue' ? 'bleue':'rouge'} de jouer </Label>
            </Grid.Row>
        </Grid.Column>
        <Grid.Column textAlign='center'>
            <Grid.Row>
                <Label color='black'>Score total</Label>
                <Label color='red'>{game.redscoretotal}</Label>
                <Label color='blue'>{game.bluescoretotal}</Label>
            </Grid.Row>
        </Grid.Column>               
    </Grid>
</div>
)


export default Header