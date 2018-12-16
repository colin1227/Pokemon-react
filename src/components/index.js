import React, { Component } from "react";
import {Switch , Route} from "react-router";
import Home from "./HomePage";
import Game from "./GamePage";
import Edit from "./EditPage"
export default class Container extends Component {
    constructor(){
        super()
        this.state = {
            something: "",
            logged: false
        }
    }
    render(){
        return(
            <div>
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
                </Switch>
            </div>
        )
    }
}