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

            PokeToEditName: "",
            PokeToEditImg: "",
            PokeToEditDamage: 0,
            
            PokeToAddName: "",
            PokeToAddImg: "",
            PokeToAddDamage: 0
            
        }
    }

     componentDidMount() {
         this.gatherPokemon()
     }
     handleInput = (e) => {
        e.preventDefault()
        this.setState({  
                 [e.currentTarget.name]: e.currentTarget.value
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
          const request = await fetch("https://mysterious-everglades-76630.herokuapp.com/crud/new-pokemon", {
              method: "POST",
              body: JSON.stringify({
                PokeToAddName: this.state.PokeToAddName,
                PokeToAddImg: this.state.PokeToAddImg,
                PokeToAddDamage: this.state.PokeToAddDamage,
              }),
              headers: {"Content-Type": "application/json"}
          })
          this.setState({
              adding: false,
              pokemon: []
          })
          this.gatherPokemon();
        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }

    editPokemon = async(e) => {
        try{
            const request = await fetch("https://mysterious-everglades-76630.herokuapp.com/crud/update-pokemon", {
                method: "POST",
                body: JSON.stringify({
                    PokeToEditName: this.state.PokeToEditName,
                    PokeToEditImg: this.state.PokeToEditImg,
                    PokeToEditDamage: this.state.PokeToEditDamage

                }),
                headers: {"Content-Type": "application/json"}
            })
            this.setState({
                edit: false,
                pokemon: []
            })
                this.gatherPokemon()

        }
        catch(err){
            this.setState({
                error: true
            })
        }
    }

    gatherPokemon = async(e) => {
        try{
            const data = await fetch("https://mysterious-everglades-76630.herokuapp.com/crud/grabPokemon");
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
    clearError = () => {
        this.setState({
            error: false
        })
    }
    inject = async(e) => {
        try{
            const data = await fetch("https://mysterious-everglades-76630.herokuapp.com/crud/baseInjection",{
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
           const response = await data.json()
           if(response.error){
               this.setState({
                   sure: false,
                   error: true
               })
           }
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

                <Modal open={this.state.error}>
                    <Modal.Content>
                        <b>there was an error</b>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button onClick={this.clearError}>
                            Ok
                        </Button>
                    </Modal.Actions>
                </Modal>

                <Modal open={this.state.adding}>
                  <Modal.Actions>
                      <Form onSubmit={this.addPokemon}>
                          <Form.Input type="text" name="PokeToAddName" placeholder="name" value={this.state.PokeToAddName} onChange={this.handleInput}/>
                          <Form.Input type="text" name="PokeToAddImg" placeholder="image URL" value={this.state.PokeToAddImg} onChange={this.handleInput}/>
                          <Form.Input type="text" name="PokeToAddDamage" placeholder="damage" value={this.state.PokeToAddDamage} onChange={this.handleInput}/>
                          <Button type="submit">Submit</Button>
                      </Form>
                  </Modal.Actions>  
                </Modal>

                <Modal open={this.state.edit}>
                  <Modal.Actions>
                      <Form onSubmit={this.editPokemon}>
                          <Form.Input type="text" name="PokeToEditName" placeholder="name" value={this.state.PokeToEditName} onChange={this.handleInput}/>
                          <Form.Input type="text" name="PokeToEditImg" placeholder="image URL" value={this.state.PokeToEditImg} onChange={this.handleInput}/>
                          <Form.Input type="text" name="PokeToEditDamage" placeholder="damage" value={this.state.PokeToEditDamage} onChange={this.handleInput}/>
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