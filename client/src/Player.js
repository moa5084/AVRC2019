import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import classNames from 'classnames';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';

import BlockIcon from '@material-ui/icons/Block';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';

import { withStyles } from '@material-ui/styles';

import AnswerSheet from './AnswerSheet';
import PlayerHome from './PlayerHome';
import RoundMenu from './RoundMenu';
import questions from './questions';
import Header from './Header';
import Styles from './Styles';
import { AVRCClient } from 'avrcclient';

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
                visibility: true,
            },
            stage: 'Main',
            questions: this.getRestatusedQuestions(questions, {'1': 'playing', '2': 'ready', '3': 'ready'}),
            snack: {
                visibility: false,
                content: {
                    type: 'accepted',
                    message: 'test',
                },
            }
            // questions: questions,
        }
        let client = new AVRCClient();
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
        if (name.length > 0) {
            document.cookie = 'playername=' + name + ';max-age=' + 60 * 60 * 5;
            let myTeam = this.state.team;
            myTeam.myName = name;
            this.setState({team: myTeam});
            this.setState({snack: this.createSnackMessage('completed', '名前を登録しました')});
        } else {
            this.setState({snack: this.createSnackMessage('error', '名前は1文字以上で入力してください')});
        }
    }

    sendAnswer (id, answer) {
        console.log([id, answer]);
        this.recvCellBanned(id);
    }

    sendTeamName (name) {
        if (name.length > 0) {
            this.setState({snack: this.createSnackMessage('completed', 'チーム名[' + name + ']を登録しました')});
        } else {
            this.setState({snack: this.createSnackMessage('error', 'チーム名は1文字以上で入力してください')});
        }
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

    recvCellBanned (id) {
        let myQuestions = questions.slice();
        let questionName;
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    if (question.id === id) {
                        myQuestions[index].questions[index2].status = 'banned'
                        questionName = question.title;
                    };
                });
            }
        });
        this.setState({questions: myQuestions});
        this.setState({snack: this.createSnackMessage('banned', '問題' + questionName + 'が封鎖されました')});
    }

    recvAccepted (id) {
        let myQuestions = questions.slice();
        let questionName;
        myQuestions.forEach((round, index) => {
            if (round.roundid === '1') {
                round.questions.forEach((question, index2) => {
                    if (question.id === id) {
                        myQuestions[index].questions[index2].status = 'accepted'
                        questionName = question.title;
                    };
                });
            }
        });
        this.setState({questions: myQuestions});
        this.setState({snack: this.createSnackMessage('accepted', '問題' + questionName + 'に正解しました')});
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
            <div className={this.props.classes.MessageCover} >
                <img src={ImageSrc + 'AVLogo.png'} alt='noimg' className={this.props.classes.CoverLogo}/>
                <div className={this.props.classes.CoverText}>{messages}</div>
            </div>
        );
    }

    renderForm (type) {
        const myQuestion = this.searchQuestion(type);
        let sheet;
        if (type === 102) sheet = (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.sendTeamName(ans);}}/>);
        else sheet = (<AnswerSheet question={myQuestion} sendFunction={(id, ans) =>{this.registerName(ans);}}/>);
        return (
            <Router basename='/tokusetsu/party2019'>
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
                    <Route exact path={prefix} render={(props) => {
                        return (
                            <PlayerHome questions={this.state.questions} type={this.props.type}/>
                        );
                    }}/>
                    <Route exact path={prefix + '/:round'} render={(props) => {
                        const myRound = this.searchRound(props.match.params.round);
                        return (
                            <RoundMenu round={myRound} viewingFunction={(id) => {this.sendViewingCell(id);}} type={this.props.type}/>
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