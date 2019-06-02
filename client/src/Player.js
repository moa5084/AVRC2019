import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';

import AnswerSheet from './AnswerSheet';
import RoundMenu from './RoundMenu';
import questions from './questions';
import Styles from './Styles';

function searchQuestion (id) {
    let res = [];
    questions.forEach(round => {
        round.questions.forEach(q => {
            if (q.id === id) res.push(q);
        });
    });
    return (res.length > 0 ? res[0] : null);
}
  
function searchRound (id) {
    let res = [];
    questions.forEach(round => {
        if (round.roundid === id) res.push(round);
    });
    return (res.length > 0 ? res[0] : null);
}

class Player extends Component {
    constructor (props) {
        super(props);
        this.state = {
            myQuestion: searchQuestion('A'),
        }
    }
    // const myRound = searchRound('1');
    // console.log(myRound);
    render () {
        return (
            <AnswerSheet question={this.state.myQuestion}/>
            // <RoundMenu round={myRound} /> 
        );
    }
}

export default withStyles(Styles)(Player);