import React, { Component } from "react";
import {Switch , Route} from "react-router";
import Home from "./HomePage";
import Game from "./GamePage";
import Edit from "./EditPage";
import AllPokes from "./AllPokesPage";
import Header from "./Header";
export default class Container extends Component {
    constructor(){
        super()
        this.state = {
            something: "",
            logged: false,
            super: true
        }
    }
    render(){
        return(
            <div>
                <Header super={this.state.super}/>
                <Switch>
                <Route exact path="/"
                    render={(routeProps) => {
                        return (
                            <Home {...routeProps} {...this.props} logged={this.state.logged} />
                        )
                    }} />
                <Route exact path="/editAll"
                    render={(routeProps) => {
                        return (
                            <Edit {...routeProps} {...this.props} logged={this.state.logged} />
                        )
                    }} />
                <Route exact path="/game"
                    render={(routeProps) => {
                        return (
                            <Game {...routeProps} {...this.props} logged={this.state.logged} />
                        )
                    }} />
                <Route exact path="/all"
                    render={(routeProps) => {
                        return (
                            <AllPokes {...routeProps} {...this.props} />
                        )
                    }} />
                </Switch>
            </div>
        )
    }
}