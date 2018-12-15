import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { List } from "semantic-ui-react";
export default class Home extends Component {
    render(){
        return(
            <div>
                <h1>Pokemon Battle!</h1>
                <br/>
                <h2>Rules of the game</h2>
                <List bulleted>
                    <List.Item>You want to play the stronger pokemon. If yours has superior damage you get a point.</List.Item>
                    <List.Item>Computron takes the first 5 seconds to choose its pokemon then you get to choose yours<br/>(if you dont chose a pokemon in time your first one will be selected automatically)</List.Item>
                    <List.Item>If you and your opponent play pokemon with the same damage you both get another pokemon to replay each other with.</List.Item>
                    <List.Item>If you get 3 points you win the round</List.Item>
                    <List.Item>If you win 3 rounds you win the game</List.Item>
                </List>
                <Link to="/game">Play</Link>
            </div>
        )
    }
}