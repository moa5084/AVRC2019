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
        let cookieValue_playername;
        if (document.cookie.split(';').filter((item) => item.trim().startsWith('playername=')).length) {
            cookieValue_playername = document.cookie.replace(/(?:(?:^|.*;\s*)playername\s*=\s*([^;]*).*$)|^.*$/, "$1");
        }
        this.state = {
            team: {
                teamName: 'アナザーピジョン',
                myName: cookieValue_playername || 'no name',
                teammateName: 'ピジョン',
                visibility: false,
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
    
    restatusQuestion (questions, id, status) {
        let myQuestions = questions.slice();
        myQuestions.forEach((round, index) => {
            if (round.type === 'question') {
                round.questions.forEach((question, index2) => {
                    if (question.id === id) myQuestions[index].questions[index2].status = status;
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

    registerName (name) {
        console.log(['name', name]);
        document.cookie = 'playername=' + name + ';max-age=' + 60 * 60 * 5;
        let myTeam = this.state.team;
        myTeam.myName = name;
        this.setState({team: myTeam});
    }

    sendAnswer (id, answer) {
        console.log([id, answer]);
    }

    sendTeamName (name) {
        console.log(['teamName', name]);
    }

    sendViewingCell (id) {
        console.log(['viewing', id]);
    }

    recvViewingCell (id) {
        let myQuestions = questions.slice();
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    myQuestions[index].questions[index2].teammateViewing = question.id === id;
                });
            }
        });
        this.setState({questions: myQuestions});
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
        if (type === 102) return (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.sendTeamName(ans);}}/>);
        return (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.registerName(ans);}}/>);
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
                            <RoundMenu round={myRound} viewingFunction={(id) => {this.sendViewingCell(id);}}/>
                        );
                    }}/>
                    <Route exact path={prefix + '/:round/:question'} render={(props) => {
                        const myQuestion = this.searchQuestion(Number(props.match.params.question));
                        return (
                            <AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.sendAnswer(id, ans);}}/>
                        );
                    }}/>
                </Switch>
            </Router>
        );
    }

    render () {
        let cookieValue_playeruuid;
        if (document.cookie.split(';').filter((item) => item.trim().startsWith('playername=')).length) {
            cookieValue_playeruuid = document.cookie.replace(/(?:(?:^|.*;\s*)playername\s*=\s*([^;]*).*$)|^.*$/, "$1");
        }
        switch (this.state.stage) {
            case 'BeforeInitialization':
                return (this.renderCover(['しばらくお待ちください']));
            case 'UserRegistration':
                if (cookieValue_playeruuid) {
                    return (this.renderCover(['参加登録が完了しました', 'このページへは現在使っているブラウザ以外ではアクセスしないでください']));
                } else {
                    return (this.renderForm(101));
                }
            case 'TeamRegistration':
                    return (this.renderForm(102));
            default:
                return (this.renderMain());
        }
    }
}

export default withStyles(Styles)(Player);