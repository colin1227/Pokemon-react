import React,{ Component } from "react";
import { Form, Button, Modal, Icon } from "semantic-ui-react";
export default class Edit extends Component {
    constructor() {
        super()
        this.state={
            pokemon: [],
            error: false,
            edit: false,
            sure: false,
            adding: false,
            PokeToEdit:{
                name: "",
                img: "",
                damage: 0
            },
            PokeToAdd:{
                name: "",
                img: "",
                damage: 0
            }
        }
    }
     componentDidMount() {
         this.gatherPokemon()
     }
     handleInput = (mode,e) => {
        e.preventDefault()
        this.setState({
              [mode]:{
                 [e.currentTarget.name]: e.currentTarget.value
             }
         })
     }

    fillEdit = async(obj) => {
        try{
          this.setState({
              edit: true,
              PokeToEdit: {
                  name: obj.name,
                  img: obj.img,
                  damage: obj.damage
              }
          })
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }

    addPokemon = async(e) => {
        try{
          const request = await fetch("http://localhost:3000/crud/new-pokemon", {
              method: "POST",
              body: JSON.stringify({
                  data: this.state.PokeToAdd
              }),
              headers: {"Content-Type": "application/json"}
          })
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }

editPokemon = async(e) => {
        try{
            const request = await fetch("http://localhost:3000/crud/update-pokemon", {
                method: "POST",
                body: JSON.stringify({
                    data: this.state.PokeToEdit
                }),
                headers: {"Content-Type": "application/json"}
            })
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }

    gatherPokemon = async(e) => {
        try{
            const data = await fetch("http://localhost:8000/crud/grabPokemon");
            const parsedResponse = await data.json();
            parsedResponse.data.forEach( async element => {
               await this.setState({
                    pokemon: [...this.state.pokemon, element]
                })
            });
            return true;
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }
    inject = async(e) => {
        try{
            const data = await fetch("http://localhost:8000/curd/baseInjection",{
                method: "POST",
                body: JSON.stringify({
                    pokemon: [
                        {
                            name: "Bulbasaur",
                            img: "http://img.pokemondb.net/artwork/bulbasaur.jpg",
                            damage: 60
                        }, {
                            name: "Caterpie",
                            img: "http://img.pokemondb.net/artwork/caterpie.jpg",
                            damage: 40
                        }, {
                            name: "Charmander",
                            img: "http://img.pokemondb.net/artwork/charmander.jpg",
                            damage: 60
                        }, {
                            name: "Clefairy",
                            img: "http://img.pokemondb.net/artwork/clefairy.jpg",
                            damage: 50
                        }, {
                            name: "Jigglypuff",
                            img: "http://img.pokemondb.net/artwork/jigglypuff.jpg",
                            damage: 60
                        }, {
                            name: "Mankey",
                            img: "http://img.pokemondb.net/artwork/mankey.jpg",
                            damage: 30
                        }, {
                            name: "Meowth",
                            img: "http://img.pokemondb.net/artwork/meowth.jpg",
                            damage: 60
                        }, {
                            name: "Nidoran - female",
                            img: "http://img.pokemondb.net/artwork/nidoran-f.jpg",
                            damage: 60
                        }, {
                            name: "Nidoran - male",
                            img: "http://img.pokemondb.net/artwork/nidoran-m.jpg",
                            damage: 50
                        }, {
                            name: "Oddish",
                            img: "http://img.pokemondb.net/artwork/oddish.jpg",
                            damage: 40
                        }, {
                            name: "Pidgey",
                            img: "http://img.pokemondb.net/artwork/pidgey.jpg",
                            damage: 50
                        }, {
                            name: "Pikachu",
                            img: "http://img.pokemondb.net/artwork/pikachu.jpg",
                            damage: 50
                        }, {
                            name: "Poliwag",
                            img: "http://img.pokemondb.net/artwork/poliwag.jpg",
                            damage: 50
                        }, {
                            name: "Psyduck",
                            img: "http://img.pokemondb.net/artwork/psyduck.jpg",
                            damage: 60
                        }, {
                            name: "Rattata",
                            img: "http://img.pokemondb.net/artwork/rattata.jpg",
                            damage: 30
                        }, {
                            name: "Squirtle",
                            img: "http://img.pokemondb.net/artwork/squirtle.jpg",
                            damage: 60
                        }, {
                            name: "Vulpix",
                            img: "http://img.pokemondb.net/artwork/vulpix.jpg",
                            damage: 50
                        }, {
                            name: "Weedle",
                            img: "http://img.pokemondb.net/artwork/weedle.jpg",
                            damage: 40
                        }]
                }),
                headers: {"Content-Type": "application/json"}
            });
            this.setState({
                sure: false
            })
           // const response = await data.json()
            return true;
        }
        catch(err){
            this.setState({
                error: true
            })
            console.log("error")
        }
    }

    render(){
        const pokemon = this.state.pokemon.map((element, i) => {
            return(
                <div key={ i }>
                  <ul>
                    <li>{element.name}</li>
                    <li><img src={element.img} alt={`${element.name}'s picture`} /></li>
                    <li>{element.damage}</li>
                  </ul>
                  <button onClick={this.fillEdit.bind(null, element)}>Edit Me</button>
                </div>
            )
        })
        return(
            <div>
                <Modal open={this.state.adding}>
                  <Modal.Actions>
                      <Form onSubmit={this.addPokemon}>
                          <Form.Input type="text" name="name" placeholder="name" value={this.state.PokeToAdd.name} onChange={this.handleInput.bind(null, "PokeToAdd")}/>
                          <Form.Input type="text" name="img" placeholder="image URL" value={this.state.PokeToAdd.img} onChange={this.handleInput.bind(null, "PokeToAdd")}/>
                          <Form.Input type="text" name="damage" placeholder="damage" value={this.state.PokeToAdd.damage} onChange={this.handleInput.bind(null, "PokeToAdd")}/>
                          <Button type="submit">Submit</Button>
                      </Form>
                  </Modal.Actions>  
                </Modal>
                <Modal open={this.state.edit}>
                  <Modal.Actions>
                      <Form onSubmit={this.editPokemon}>
                          <Form.Input type="text" name="name" placeholder="name" value={this.state.PokeToEdit.name} onChange={this.handleInput.bind(null, "PokeToEdit")}/>
                          <Form.Input type="text" name="img" placeholder="image URL" value={this.state.PokeToEdit.img} onChange={this.handleInput.bind(null, "PokeToEdit")}/>
                          <Form.Input type="text" name="damage" placeholder="damage" value={this.state.PokeToEdit.damage} onChange={this.handleInput.bind(null, "PokeToEdit")}/>
                          <Button type="submit">Submit</Button>
                      </Form>
                  </Modal.Actions>  
                </Modal>
                <Modal open={this.state.sure}>
                  <Modal.Content>
                  <p>If you do this you might create duplicates, are you sure there is nothing in the data base?</p>
                  </Modal.Content>
                  <Modal.Actions>
                      <Button color='red'>
                        <Icon name='remove' /> No
                      </Button>
                      <Button color='green' inverted>
                        <Icon name='checkmark' /> I'm Sure
                      </Button>
                    </Modal.Actions>  
                </Modal>
                {pokemon}
                <Form onSubmit={() => {
                    this.setState({
                        sure: true
                    })
                }}>
                  <Button type="submit"> Run Injection</Button>
                </Form>
                <Form onSubmit={() => {
                    this.setState({
                        adding: true
                    })
                }}>
                  <Button type="submit"> Add Pokemon</Button>
                </Form>
            </div>
        )
    }
}