import React, {Component} from 'react';
import Board from "./Board";

class Game extends Component {

    constructor(props){
        super(props);
        this.state = {
            xIsNext: true,
            stepNumber: 0,
            history:[
                {squares: Array(9).fill(null)}
            ],
            xScore : 0,
            oScore : 0
        }
    }

    jumpTo(step){
      this.setState({
          stepNumber: step,
          xIsNext: (step % 2) === 0
      })
    }

    updateScore(winner){
        console.log("de ce creste scorul cu 2?")
        if(winner === "X"){
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.xScore += 1
        }
        else {
            // eslint-disable-next-line react/no-direct-mutation-state
            this.state.oScore += 1
        }
    }

    handleClick(index){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1]
        const squares = current.squares.slice();
        const winner = calculateWinner(squares);

        if(winner || squares[index]){
            return;
        }

        squares[index] = this.state.xIsNext?'X':'O';
        this.setState({
            history: history.concat({
                squares: squares
            }),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length

        })

    }
    
    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = calculateWinner(current.squares);
        const moves = history.map((step, move)=>{
            const desc = move? 'Go to #' + move:'Reset Game Board';
            return(
                <li key={move}>
                    <button onClick={() => {this.jumpTo(move, winner)}}>
                        {desc}
                    </button>
                </li>
            )
        });
        let status;

        if(winner){
            status = "Winner is " + winner;
            this.updateScore(winner)
        }
        else{
            status = "Next player is " + (this.state.xIsNext?'X':'O')
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board onClick={(index)=>this.handleClick(index)}
                           squares={current.squares}
                    />
                </div>

                <div className="game-info">
                    <ul> {status} </ul>
                    <ul> {moves} </ul>
                </div>

                <div className="game-score">
                    <p> X score: {Math.round(this.state.xScore/2)} <br />
                        O score: {Math.round(this.state.oScore/2)} </p>
                </div>

            </div>
        );
    }
}

function calculateWinner(squares){
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let index = 0; index < lines.length; index++){
        const [a, b, c] = lines[index];
        if(squares[a] &&
            squares[a] === squares[b] &&
            squares[b] === squares[c])
        {
            return squares[a];
        }
    }

    return null;
}

export default Game;