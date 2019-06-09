import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import BlockIcon from '@material-ui/icons/Block';
import CancelIcon from '@material-ui/icons/Cancel';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { withStyles } from '@material-ui/styles';

import AnswerSheet from './AnswerSheet';
import PlayerHome from './PlayerHome';
import RoundMenu from './RoundMenu';
import questions from './questions';
import Header from './Header';
import Styles from './Styles';
import { AVRCClient, Stage, PlayerSide } from 'avrcclient';

const ImageSrc = 'https://juicy-apple.fun/av/AVRC2019/images/';

let client;

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
            stage: Stage.UserRegistration,
            questions: this.onStageChange(questions, Stage.UserRegistration),
            snack: {
                visibility: false,
                content: {
                    type: 'accepted',
                    message: 'test',
                },
            },
        }
        if (cookieValue_playername) this.initializeClient(decodeURIComponent(cookieValue_playername));
        console.log(this.props.type);
    }

    initializeClient(name) {
        const side = this.props.type === 'A' ? PlayerSide.A : (this.props.type === 'B' ? PlayerSide.B : PlayerSide.Z);
        client = new AVRCClient(name, side);
        client.on('connected', (d) => {
            const myQuestions = this.initializeQuestions(d);
            let myTeam = this.state.team;
            myTeam.teamName = d.teamname;
            myTeam.teammateName = d.teammate;
            myTeam.visibility = d.stage >= Stage.TeamRegistration;
            this.setState({questions: myQuestions, team: myTeam, stage: d.stage});
        });
        client.on('stage changed', (d) => {
            this.setState({stage: d.stage, questions: this.onStageChange(this.state.questions.slice(), d.stage)})
        });
        client.on('cell open', (d) => {
            this.recvViewingCell(d.cellid);
        });
        client.on('cell banned', (d) => {
            this.recvCellBanned(d.cellid);
        });
        client.on('problem answered', (d) => {
            this.recvAnswered(d.problemid);
        });
        client.on('accepted', (d) => {
            this.recvAccepted(d.problemid);
        });
        client.on('teamname', (d) => {
            let myTeam = this.state.team;
            myTeam.teamName = d.teamname;
            this.setState({team: myTeam});
        });
        client.on('bingo', (d) => {
            this.setState({snack: this.createSnackMessage('accepted', 'ビンゴを達成しました！')});
        });
        client.on('connection error', (d) => {
            this.setState({snack: this.createSnackMessage('error', 'サーバへの接続に失敗しました (Connection Error)')});
        });
        client.connect()
            .then(() => {
                this.setState({snack: this.createSnackMessage('completed', 'ようこそ、' + name + 'さん！')});
            }).catch(() => {
                this.setState({snack: this.createSnackMessage('error', 'エラー：サーバへの接続に失敗しました')});
            });
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

    initializeQuestions (data) {
        let myQuestions = this.state.questions.slice();
        myQuestions = this.onStageChange(myQuestions, data.stage);
        switch (data.stage) {
            case Stage.First:
                myQuestions = this.reinitializeFirstQuestions(data, myQuestions);
                break;
            case Stage.SecondAlpha:
                if (data.sent) myQuestions = this.restatusQuestion(myQuestions, 101, 'sent');
                break;
            case Stage.SecondBeta:
                if (data.sent) myQuestions = this.restatusQuestion(myQuestions, 102, 'sent');
                break;
            case Stage.SecondGamma:
                if (data.sent) myQuestions = this.restatusQuestion(myQuestions, 103, 'sent');
                break;
            case Stage.Revival:
                if (data.sent) myQuestions = this.restatusQuestion(myQuestions, 201, 'sent');
                break;
            default: 
        }
        return myQuestions;
    }

    reinitializeFirstQuestions(data, questions) {
        let bannedArray = data.banned.slice();
        let correctArray = data.correct.slice();
        bannedArray.sort((a, b) => {return a - b});
        correctArray.sort((a, b) => {return a - b});
        let myQuestions = questions.slice();
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((item, index2) => {
                    if (item.id === bannedArray[0]) {
                        myQuestions[index].questions[index2].status = 'banned';
                        bannedArray.shift();
                    }
                    if (item.id === correctArray[0]) {
                        myQuestions[index].questions[index2].status = 'accepted';
                        correctArray.shift();
                    }
                });
            }
        });
        return myQuestions.slice();
    }

    onStageChange (questions, st) {
        let myQuestions = questions.slice();
        switch (st) {
            case Stage.BeforeFirst:
                myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'ready', '2': 'hidden', '3': 'hidden'});
                break;
            case Stage.First:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'playing', '2': 'hidden', '3': 'hidden'});
                break;
            case Stage.AfterFirst:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'hidden', '3': 'hidden'});
                break;
            case Stage.BeforeSecondAlpha:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'ready');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'ready');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.SecondAlpha:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'playing');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'ready');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.AfterSecondAlpha:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'ready');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.BeforeSecondBeta:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'ready');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.SecondBeta:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'playing');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.AfterSecondBeta:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.BeforeSecondGamma:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'ready');
                break;
            case Stage.SecondGamma:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'playing');
                break;
            case Stage.AfterSecondGamma:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'playing', '3': 'hidden'});
                    myQuestions = this.restatusQuestion(myQuestions, 101, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 102, 'finished');
                    myQuestions = this.restatusQuestion(myQuestions, 103, 'finished');
                break;
            case Stage.BeforeRevival:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'finished', '3': 'ready'});
                break;
            case Stage.Revival:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'finished', '3': 'playing'});
                break;
            case Stage.AfterRevival:
                    myQuestions = this.getRestatusedQuestions(myQuestions, {'1': 'finished', '2': 'finished', '3': 'finished'});
                break;
            default: 
        }
       return myQuestions;
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
        if (name.length > 0) {
            document.cookie = 'playername=' + encodeURIComponent(name) + ';max-age=' + 60 * 60 * 5;
            let myTeam = this.state.team;
            myTeam.myName = name;
            this.setState({team: myTeam});
            this.setState({snack: this.createSnackMessage('completed', '名前を登録しました')});
            this.initializeClient(name);
        } else {
            this.setState({snack: this.createSnackMessage('error', '名前は1文字以上で入力してください')});
        }
    }

    sendAnswer (id, answer) {
        client.sendAnswer(id, answer)
            .then((d) => {
                const myQuestion = this.searchQuestion(d.questionid)
                if (myQuestion && myQuestion.roundid === '1' && !d.correct) {
                    this.setState({snack: this.createSnackMessage('wrong', '不正解：問題' + myQuestion.title)});
                }
            }).catch((d) => {
                this.setState({snack: this.createSnackMessage('error', 'エラー：解答がRejectされました')});
            });
    }

    sendTeamName (name) {
        if (name.length > 0) {
            client.registerTeamName(name)
                .then(() => {
                    this.setState({snack: this.createSnackMessage('completed', 'チーム名[' + name + ']を登録しました')});
                })
                .catch(() => {
                    this.setState({snack: this.createSnackMessage('error', 'チーム名の登録に失敗しました')});
                });
        } else {
            this.setState({snack: this.createSnackMessage('error', 'チーム名は1文字以上で入力してください')});
        }
    }

    sendViewingCell (id) {
        if (id >= 1 && id <= 25) {
            client.openCell(id)
                .then(() => {
                    console.log('openCell(' + id + ') was successfully sent.');
                })
                .catch((d) => {
                    console.log('rejected: openCell', d);
                });
        }
    }

    recvViewingCell (id) {
        let myQuestions = this.state.questions.slice();
        console.log(id);
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    myQuestions[index].questions[index2].teammateViewing = question.id === id;
                });
            }
        });
        this.setState({questions: myQuestions});
    }

    recvCellBanned (id) {
        let myQuestions = this.state.questions.slice();
        let questionName;
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    if (question.id === id) {
                        myQuestions[index].questions[index2].status = myQuestions[index].questions[index2].status === 'accepted' ? 'accepted' : 'banned';
                        questionName = question.title;
                    };
                });
            }
        });
        this.setState({questions: myQuestions, snack: this.createSnackMessage('banned', '問題' + questionName + 'が封鎖されました')});
    }

    recvAnswered (id) {
        let myQuestions = this.state.questions.slice();
        let questionName;
        myQuestions.forEach((round, index) => {
            round.questions.forEach((question, index2) => {
                if (question.id === id) {
                    myQuestions[index].questions[index2].status = 'sent';
                    questionName = question.title;
                };
            });
        });
        this.setState({questions: myQuestions, snack: this.createSnackMessage('completed', '問題' + questionName + 'に解答しました')});
    }

    recvAccepted (id) {
        let myQuestions = this.state.questions.slice();
        let questionName;
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    if (question.id === id) {
                        myQuestions[index].questions[index2].status = 'accepted';
                        questionName = question.title;
                    };
                });
            }
        });
        setTimeout(() => {
            this.setState({questions: myQuestions});
        }, 500);
        this.setState({snack: this.createSnackMessage('accepted', '問題' + questionName + 'に正解しました！')});
    }

    createSnackMessage (type, message) { 
        return {
            visibility: true,
            content: {
                type: type,
                message: message,
            },
        };
    }

    renderCover (msg) {
        let messages = [];
        msg.forEach((item, index) => {
            messages.push((<p key={'CoverMessageP_' + index}>{item}</p>));
        });
        return (
            <Router basename='/tokusetsu/party2019'>
                <MySnack snack={this.state.snack} classes={this.props.classes}/>
                <div className={this.props.classes.MessageCover} >
                    <img src={ImageSrc + 'AVLogo.png'} alt='noimg' className={this.props.classes.CoverLogo}/>
                    <div className={this.props.classes.CoverText}>{messages}</div>
                </div>
            </Router>
        );
    }

    renderForm (type) {
        const myQuestion = this.searchQuestion(type);
        let sheet;
        if (type === 302) sheet = (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.sendTeamName(ans);}}/>);
        else sheet = (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.registerName(ans);}}/>);
        return (
            <Router basename='/tokusetsu/party2019'>
                <Header questions={this.state.questions} team={this.state.team} type={this.props.type} isform={true}/>
                <MySnack snack={this.state.snack} classes={this.props.classes}/>
                {sheet}
            </Router>
        )
    }

    renderMain () {
        const prefix = this.props.type === 'A' ? '/Newcomer' : (this.props.type === 'B' ? '/NewComer' : '/Senior');
        return (
            <Router basename='/tokusetsu/party2019'>
                <Header questions={this.state.questions} team={this.state.team} type={this.props.type}/>
                <MySnack snack={this.state.snack} classes={this.props.classes}/>
                <Switch>
                    <Route sensitive exact path={prefix} render={(props) => {
                        return (
                            <PlayerHome questions={this.state.questions} type={this.props.type}/>
                        );
                    }}/>
                    <Route sensitive exact path={prefix + '/:round'} render={(props) => {
                        const myRound = this.searchRound(props.match.params.round);
                        return (
                            <RoundMenu round={myRound} viewingFunction={(id) => {this.sendViewingCell(id);}} type={this.props.type}/>
                        );
                    }}/>
                    <Route sensitive exact path={prefix + '/:round/:question'} render={(props) => {
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
            case Stage.BeforeInitialization:
                return (this.renderCover(['しばらくお待ちください']));
            case Stage.UserRegistration:
                if (cookieValue_playeruuid) {
                    return (this.renderCover(['参加登録が完了しました', 'このページへは現在使っているブラウザ以外ではアクセスしないでください']));
                } else {
                    return (this.renderForm(301));
                }
            case Stage.TeamRegistration:
                    return (this.renderForm(302));
            default:
                return (this.renderMain());
        }
    }
}

class MySnack extends Component {

    constructor (props) {
        super(props);
        this.state = {
            opened: false,
        }
        this.handleClose = this.handleClose.bind(this);
    }

    componentWillReceiveProps (nextProps) {
        if (nextProps.snack.visibility) {
            this.setState({opened: true});
        }
    }

    handleClose () {
        this.setState({opened: false});
    }

    render () {
        let message = [];
        switch (this.props.snack.content.type) {
            case 'accepted':
            case 'completed':
                message.push(<CheckCircleIcon key='icon'/>);
                message.push(<span key='span'>{this.props.snack.content.message}</span>);
                break;
            case 'banned':
                message.push(<BlockIcon key='icon'/>);
                message.push(<span key='span'>{this.props.snack.content.message}</span>);
                break;
            case 'wrong':
                message.push(<CancelIcon key='icon'/>);
                message.push(<span key='span'>{this.props.snack.content.message}</span>);
                break;
            case 'error':
                message.push(<ErrorIcon key='icon'/>);
                message.push(<span key='span'>{this.props.snack.content.message}</span>);
                break;
            default:
                message.push(<span key='span'>{this.props.snack.content.message}</span>);
        }
        const myWrapperClass = classNames(
            this.props.classes.SnackWrapper,
            {
                'accepted': this.props.snack.content.type === 'accepted',
                'completed': this.props.snack.content.type === 'completed',
                'banned': this.props.snack.content.type === 'banned',
                'error': this.props.snack.content.type === 'error',
                'wrong': this.props.snack.content.type === 'wrong',
            },
        );
        return (
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={this.state.opened}
                autoHideDuration={3000}
                onClose={this.handleClose}
            >
                <SnackbarContent
                    className={myWrapperClass}
                    message={
                        <div className={this.props.classes.SnackContent} >
                            {message}
                        </div>
                    }
                />
            </Snackbar>
        );
    }
}

export default withStyles(Styles)(Player);