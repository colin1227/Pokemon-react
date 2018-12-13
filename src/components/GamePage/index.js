import React, { Component } from "react";
import ReactTimeout, { setTimeout} from "react-timeout";
import 'index.css'
 class Game extends Component {
    constructor(){
        super()

        this.count = this.count.bind(this);
        this.tick = this.tick.bind(this);
        this.randComp = this.randComp.bind(this);
        this.compChoice = this.compChoice.bind(this);
        this.middle = this.middle.bind(this);
        this.state = {
            username: "nothing for now",
            userCards: [],
            userWins: 0,
            userRoundsWon: 0,
            playedCards: [],
            earlyChoice: undefined,
            choice: 0,

            compCards: [],
            compTime: undefined,
            compWins: 0,
            compRoundsWon: 0,
            compSubmission: null,
            compSelected: false,
            
            go: undefined,
            time: 10,
            dispersed: false,
            error: "",
            winner: "",
            
            checkCards: [],
            pic: [0],
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
        }
    }
    compareDamage = async (choiceOfUser, computerChoice) => {
        console.log(choiceOfUser, computerChoice)
        try{
        
            if (this.state.userCards.length > 0) {
                if (this.state.userCards[choiceOfUser].damage > this.state.compCards[computerChoice].damage) {
                   await this.setState({
                        time: 10,
                        userWins: this.state.userWins +1,
                        userCards: this.state.userCards.filter( used => this.state.userCards[choiceOfUser] !== used),
                        playedCards: [...this.state.playedCards, this.state.userCards[choiceOfUser]],
                        compCards: this.state.compCards.filter( used => this.state.compCards[computerChoice] !== used)

                    })
                    if (this.state.userCards.length === 0) {
                        this.rand6();
                    }
                    this.randComp();
                    if (this.state.userWins === 3) {
                       await this.setState({
                            time: 10,
                            userRoundsWon: this.state.userRoundsWon + 1,
                            userWins: 0,
                            compWins: 0,
                            userCards: [],
                            compCards: []
                        })
                        
                        if (this.state.userRoundsWon === 3) {
                            this.setState({
                                winner: this.state.username
                            });
                        };
                    };
                }
                else if (this.state.userCards[choiceOfUser].damage < this.state.compCards[computerChoice].damage) {
                    await this.setState({
                        time: 10,
                        compWins: this.state.compWins +1,
                        userCards: this.state.userCards.filter( used => this.state.userCards[choiceOfUser] !== used),
                        playedCards: [...this.state.playedCards, this.state.userCards[choiceOfUser]],
                        compCards: this.state.compCards.filter( used => this.state.compCards[computerChoice] !== used)

                    })
                    if (this.state.userCards.length === 0) {
                        this.rand6();
                    }
                    this.randComp();
                    if (this.state.compWins === 3) {
                        await this.setState({
                            compRoundsWon: this.state.compRoundsWon + 1,
                            userWins: 0,
                            compWins: 0,
                            time: 10,
                            userCards: [],
                            compCards: []
                        })
                        this.roundwinner()
                        if (this.state.compRoundsWon === 3) {
                           await this.setState({
                                winner: "Computron"
                            })
                            this.gameWinner(this.state.winner)
                        };
                    };
                }
    
                //else if computer and Ash tie run tieProtocol
                else if (this.state.userCards[choiceOfUser].damage === this.state.compCards[computerChoice].damage) {
                    await this.setState({
                        time: 10,
                        userCards: this.state.userCards.filter( used => this.state.userCards[choiceOfUser] !== used),
                        playedCards: [...this.state.playedCards, this.state.userCards[choiceOfUser]],
                        compCards: this.state.compCards.filter( used => this.state.compCards[computerChoice] !== used)
                    })
                    this.tieProtocol();
                }
                else {
                    this.setState({
                        error: "something has gone terribly wrong"
                    })
                    return;
                };
            };
        }
       catch(err){
           console.log(err)
       }
    };
    tieProtocol = () =>{
        this.rand2();
        clearInterval(this.state.go)
        this.count();
    }
    
    roundwinner = () => {
        clearInterval(this.state.go)
        this.setState({
            time: 10
        })
    }

    gameWinner = (winner) =>{
        this.setState({
            winner: winner
        })
    }

    rand6 = async() => {
      try{
        if (this.state.checkCards.length > 12) {
            console.log("Deck Reset");
            this.setState({
                checkCards : []
            });
            
        };
    
        for (let i = 0; i < 6; i++) {
            let rand18 = Math.floor(Math.random() * 18);
            if (this.state.checkCards.includes(this.state.pokemon[rand18])) {
                i--;
            }
    
            else if (this.state.userCards.length < 3) {
                await this.setState({
                    userCards: [...this.state.userCards, this.state.pokemon[rand18]],
                    checkCards: [...this.state.checkCards, this.state.pokemon[rand18]]
                }) 
            }
            else if (this.state.compCards.length < 3) {
                await this.setState({
                    compCards: [...this.state.compCards, this.state.pokemon[rand18]],
                    checkCards: [...this.state.checkCards, this.state.pokemon[rand18]]
                }) 
            }
        }
        this.setState({
            dispersed: true
        })
        return true;
      }
      catch(err){
          console.log(err)
      }
    };

    rand2 = () => {
        if (this.state.checkCards.length > 16) {
            console.log("deck Reset");
            this.setState({
                checkCards: []
            })
        }
    
        else if (this.state.checkCards.length < 16) {
            let randF = Math.floor(Math.random() * 18);
            let randS = Math.floor(Math.random() * 18);
            if (this.state.checkCards.includes(this.state.pokemon[randF]) || this.state.checkCards.includes(this.state.pokemon[randS])) {
                this.rand2();
            }
            else if (this.state.checkCards.includes(this.state.pokemon[randF]) && this.state.checkCards.includes(this.state.pokemon[randS])) {
                console.log("duplicate");
                this.rand2();
            }
            else {
                this.setState({
                    userCards: [...this.state.userCards, this.state.pokemon[randF]],
                    compCards: [...this.state.compCards, this.state.pokemon[randS]]
                })
            }
        }
    };

    

    compChoice = () => {
        let value = Math.floor(Math.random() * this.state.compCards.length );
        this.setState({
            compSubmission: value,
            compSelected: true
        });
        console.log("computer made its choice")
        clearInterval(this.state.compTime);

    }

    randComp = async() => {
        try{
          let waitTime = (Math.random()* 5) * 1000;
          this.setState({
              compTime : setInterval(this.compChoice, waitTime)
          });
          
        }
        catch(err){
            console.log(err)
        } 
    }
  
    middle = async() => {
      try{
          this.randComp();
      }
      catch(err){
          console.log(err)
      }
    }


    tick = () => {
        this.setState({
            time: this.state.time - 1
        })
        if(this.state.time === 0){
            this.makeChoice()
            clearInterval(this.state.go)
        }
        
    }

    count = () => {
        this.middle();
        this.setState({
            go: setInterval(this.tick, 1000)

        })
    }

    earlySubmition = async(key, e) => {
      try{
        await this.setState({
            choice: key
        })
        this.makeChoice()
      }
      catch(err){
          console.log(err)
      }
}

    handleInput = async(e) =>{
      try{
          if(e.currentTarget.value[e.currentTarget.value.length -1] === "0"|| e.currentTarget.value[e.currentTarget.value.length -1] === "1"||e.currentTarget.value[e.currentTarget.value.length -1] === "2"){
             if(parseInt(e.currentTarget.value[e.currentTarget.value.length -1]) > this.state.userCards.length){
                 this.setState({
                   choice: 0,
                   error: "choice not availible based on numer of pokemon, defaluted to first pokemon"
                 })
             }
             else{
                 await this.setState({
                     [e.currentTarget.name]: parseInt(e.currentTarget.value[e.currentTarget.value.length -1]),
                     error: ""
                 })
            }
          }
          else if(isNaN(e.currentTarget.value[e.currentTarget.value.length - 1])){
            this.setState({
                choice: 0,
                error: "Invalid Input!! Select 0, 1, or 2"
            })  
          }
          else{
            this.setState({
                choice: 0,
                error: "Invalid Input!! Select 0, 1, or 2"
            })
          }  
    
      }
      catch(err){
        console.log(err)
      }
    }

    makeChoice = async(e) =>{
        try{
        if(this.state.choice !== false && this.state.compSelected){
            this.compareDamage(this.state.choice, this.state.compSubmission)
        }
        else if(this.state.compSelected === false){
            console.log("lkjhgfdsa")
            return;
        }
        else{
            console.log("asdfghjkl")
          return this.compareDamage(0, 0)
        }
      }
      catch(err){
         console.log(err)
     }
    }

    render(){
        const view = this.state.userCards.map( (element, i) =>{
          return(
              <li key={i}>{element.name} <br/><img src={element.img}/> 
               {this.state.compChoiceMade ? <button onClick={this.earlySubmition.bind(null, i)}>{i}</button> : true}
               <br/> {element.damage}
              </li>
          )
        })
        // const pic = this.state.pic.map((element, i) =>{
        //        if(this.state.dispersed === true && this.state.choice !== undefined && (this.state.choice === 0 ||this.state.choice === 1 ||this.state.choice === 2)){
        //            return(
        //                <div>
        //                  <img key={ i } src={this.state.userCards[this.state.choice].img}/>
        //                </div>
        //             )
        //        }
        //        else if(this.state.dispersed === false){
        //            return true;
        //        }
        //        else{
        //            return(
        //            <p key={ i }>error</p>
        //            )
        //        }
        // })
        return(
            <div>
                {this.state.winner ? <h1>winner is {this.state.winner}</h1>: true}
                <p>code: {this.state.compSubmission}</p>
                <h1>This is the game</h1>
                  <ol>
                    {view}
                  </ol>
                  <h2>user wins: {this.state.userWins}</h2>
                  <h2>user rounds won: {this.state.userRoundsWon}</h2>
                  <h2>computron wins: {this.state.compWins}</h2>
                  <h2>computron rounds won:{this.state.compRoundsWon}</h2>
                  {/* {pic} */}
                  {this.state.time}
                  {this.state.error}
                  <button onClick={this.rand6}>random 3</button>
                  <button onClick={this.count}>start Game</button>
                  {/* <button onClick={this.middle}> comp choice</button> */}
                  <form>
                      <input type='text' value={0} name="choice" onChange={this.handleInput}/>
                  </form>
            </div>
        )
    }
}

export default ReactTimeout(Game);