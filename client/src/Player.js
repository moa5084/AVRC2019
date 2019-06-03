import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Link
} from 'react-router-dom';

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
    render () {
        return (
            <Router basename='/tokusetsu/party2019'>
                <Switch>
                    <Route exact path='/Newcomer' render={(props) => {
                        console.log("failed");
                        return false;
                    }}/>
                    <Route exact path='/Newcomer/:round' render={(props) => {
                        const myRound = searchRound(props.match.params.round);
                        return (
                            <RoundMenu round={myRound} />
                        );
                    }}/>
                    <Route exact path='/Newcomer/:round/:question' render={(props) => {
                        const myQuestion = searchQuestion(props.match.params.question);
                        return (
                            <AnswerSheet question={myQuestion} />
                        );
                    }}/>
                </Switch>
            </Router>
        );
    }
}

export default withStyles(Styles)(Player);