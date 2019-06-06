import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import AnswerSheet from './AnswerSheet';
import PlayerHome from './PlayerHome';
import RoundMenu from './RoundMenu';
import questions from './questions';
import Header from './Header';
import Styles from './Styles';

const ImageSrc = 'https://juicy-apple.fun/av/AVRC2019/images/';

class Player extends Component {
    constructor (props) {
        super(props);
        this.state = {
            team: {
                teamName: 'アナザーピジョン',
                myName: 'アナザー',
                teammateName: 'ピジョン',
                visibility: true,
            },
            stage: 'Main',
            questions: this.getRestatusedQuestions(questions, {'1': 'playing', '2': 'hidden', '3': 'hidden'}),
            // questions: questions,
        }
    }

    getRestatusedQuestions (questions, statusObject) {
        let myQuestions = questions.slice();
        myQuestions.forEach((round, index) => {
            if (round.type === 'question') {
                myQuestions[index].status = statusObject[round.roundid];
                round.questions.forEach((question, index2) => {
                    myQuestions[index].questions[index2].status = statusObject[round.roundid];
                });
            }
        });
        return myQuestions;
    }

    onStageChange (st) {
        switch (st) {
            case 'BeforeFirst':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'ready', '2': 'hidden', '3': 'hidden'})});
                break;
            case 'First':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'playing', '2': 'hidden', '3': 'hidden'})});
                break;
            case 'AfterFirst':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'hidden', '3': 'hidden'})});
                break;
            case 'BeforeSecond':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'ready', '3': 'hidden'})});
                break;
            case 'Second':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'playing', '3': 'hidden'})});
                break;
            case 'AfterSecond':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'finished', '3': 'hidden'})});
                break;
            case 'BeforeRevival':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'finished', '3': 'ready'})});
                break;
            case 'Revival':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'finished', '3': 'playing'})});
                break;
            case 'AfterRevival':
                this.setState({questions: this.getRestatusedQuestions(this.state.questions, {'1': 'finished', '2': 'finished', '3': 'playing'})});
                break;
            default: 
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

    renderCover (msg) {
        let messages = [];
        msg.forEach((item, index) => {
            messages.push((<p key={'CoverMessageP_' + index}>{item}</p>));
        });
        return (
            <div className={this.props.classes.MessageCover} >
                <img src={ImageSrc + 'AVLogo.png'} alt='noimg' className={this.props.classes.CoverLogo}/>
                <div className={this.props.classes.CoverText}>{messages}</div>
            </div>
        );
    }

    renderForm (type) {
        const myQuestion = this.searchQuestion(type);
        return (<AnswerSheet question={myQuestion} sendFunction={(ans) =>{console.log(ans);}}/>);
    }

    renderMain () {
        const prefix = this.props.type === 'A' ? '/Newcomer' : '/NewComer';
        return (
            <Router basename='/tokusetsu/party2019'>
                <Header questions={this.state.questions} team={this.state.team}/>
                <Switch>
                    <Route exact path={prefix} render={(props) => {
                        return (
                            <PlayerHome questions={this.state.questions} />
                        );
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

    render () {
        let cookieValue_playeruuid;
        if (document.cookie.split(';').filter((item) => item.trim().startsWith('playeruuid=')).length) {
            cookieValue_playeruuid = document.cookie.replace(/(?:(?:^|.*;\s*)playeruuid\s*=\s*([^;]*).*$)|^.*$/, "$1");
        }
        switch (this.state.stage) {
            case 'BeforeInitialization':
                return (this.renderCover(['しばらくお待ちください']));
            case 'UserRegistration':
                if (cookieValue_playeruuid) {
                    return (this.renderCover(['参加登録が完了しました', 'このページへは現在使っているブラウザ以外ではアクセスしないでください']));
                } else {
                    return (this.renderForm('Entry'));
                }
            case 'TeamRegistration':
                    return (this.renderForm('TEntry'));
            default:
                return (this.renderMain());
        }
    }
}

export default withStyles(Styles)(Player);