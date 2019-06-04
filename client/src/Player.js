import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import AnswerSheet from './AnswerSheet';
import RoundMenu from './RoundMenu';
import questions from './questions';
import Header from './Header';
import Styles from './Styles';

class Player extends Component {
    constructor (props) {
        super(props);
        this.state = {
            team: {
                teamName: 'アナザーピジョン',
                members: ['アナザー', 'ピジョン'],
            },
            questions: questions,
        }
    }

    searchQuestion (id) {
        let res = [];
        this.state.questions.forEach(round => {
            round.questions.forEach(q => {
                if (q.id === id) res.push(q);
            });
        });
        return (res.length > 0 ? res[0] : null);
    }

    searchRound (id) {
        let res = [];
        this.state.questions.forEach(round => {
            if (round.roundid === id) res.push(round);
        });
        return (res.length > 0 ? res[0] : null);
    }

    render () {
        const prefix = this.props.type === 'A' ? '/Newcomer' : '/NewComer';
        return (
            <Router basename='/tokusetsu/party2019'>
                <Header questions={this.state.questions}/>
                <Switch>
                    <Route exact path={prefix} render={(props) => {
                        return false;
                    }}/>
                    <Route exact path={prefix + '/:round'} render={(props) => {
                        const myRound = this.searchRound(props.match.params.round);
                        return (
                            <RoundMenu round={myRound} />
                        );
                    }}/>
                    <Route exact path={prefix + '/:round/:question'} render={(props) => {
                        const myQuestion = this.searchQuestion(props.match.params.question);
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