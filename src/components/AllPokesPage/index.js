import React, { Component } from "react";

export default class AllPokes extends Component {
    constructor(){
        super()
        this.state = {
            pokemon: []
        }
    }
    gatherPokemon = async(e) => {
        try{
            const data = await fetch("https://mysterious-everglades-76630.herokuapp.com/crud/grabPokemon");
            const parsedResponse = await data.json();
            return parsedResponse;
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }
    componentDidMount() {
       this.gatherPokemon().then(data => {
           data.data.forEach(element => {
               this.setState({
                   pokemon: [...this.state.pokemon, element]
               });
           });
       }).catch(err => {
            this.setState({
                error: true
            })
       });
    };

    render(){
        const displayPokemon = this.state.pokemon.map((element, i) => {
            return(
                <div>
                    <div>
                      <b>{element.name} dmg: {element.damage}</b>
                      <img src={element.img} alt={element.name}/>
                    </div>
                  <br/>
                </div>
            )
        })
        return(
            <div>
                {displayPokemon}
            </div>
        )
    }
}