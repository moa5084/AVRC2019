import React, { Component } from 'react';
import classNames from 'classnames';

import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

import Styles from './Styles';
import questions from './questions';
import { Stage } from 'avrcclient';

class Presenter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stage: props.stage || Stage.BeforeStart,
            questions: questions,
        }
    }
    getTitle (st) {
        switch (st) {
            case Stage.BeforeStart:
                return this.props.editable ? 'Before Start' : 'Team Making';
            case Stage.UserRegistration:
                return this.props.editable ? 'User Registration' : 'Team Making';
            case Stage.TeamMaking:
                return this.props.editable ? 'Team Making' : 'Team Making';
            case Stage.BeforeFirst:
                return this.props.editable ? 'Before First' : '1st Round';
            case Stage.First:
                return this.props.editable ? 'First' : '1st Round';
            case Stage.AfterFirst:
                return this.props.editable ? 'After First' : '1st Round';
            case Stage.TeamRegistration:
                return this.props.editable ? 'Team Registration' : 'Team Registration';
            case Stage.BeforeSecondAlpha:
                return this.props.editable ? 'Before SecondAlpha' : '2nd Round: Alpha';
            case Stage.SecondAlpha:
                return this.props.editable ? 'SecondAlpha' : '2nd Round: Alpha';
            case Stage.AfterSecondAlpha:
                return this.props.editable ? 'After SecondAlpha' : '2nd Round: Alpha';
            case Stage.BeforeSecondBeta:
                return this.props.editable ? 'Before SecondBeta' : '2nd Round: Beta';
            case Stage.SecondBeta:
                return this.props.editable ? 'SecondBeta' : '2nd Round: Beta';
            case Stage.AfterSecondBeta:
                return this.props.editable ? 'After SecondBeta' : '2nd Round: Beta';
            case Stage.BeforeSecondGamma:
                return this.props.editable ? 'Before SecondGamma' : '2nd Round: Gamma';
            case Stage.SecondGamma:
                return this.props.editable ? 'SecondGamma' : '2nd Round: Gamma';
            case Stage.AfterSecondGamma:
                return this.props.editable ? 'After SecondGamma' : '2nd Round: Gamma';
            case Stage.BeforeRevival:
                return this.props.editable ? 'Before Revival' : 'Revival Round';
            case Stage.Revival:
                return this.props.editable ? 'Revival' : 'Revival Round';
            case Stage.AfterRevival:
                return this.props.editable ? 'After Revival' : 'Revival Round';
            default:
                return 'Unknown Stage';
        }
    }

    getButtonComponent (txt, onClick) {
        return (
            <Button variant="contained" color="primary" className={this.props.classes.ControlButton} onClick={onClick ? onClick : () => {}} >
                {txt}
            </Button>
        );
    }

    sendChangeStage (st) {
        this.setState({stage: st, questions: this.onStageChange(this.state.questions, st)});
    }

    getNextButton (st) {
        switch (st) {
            case Stage.BeforeStart:
                return this.props.editable ? (this.getButtonComponent('ユーザ登録開始', () => {this.sendChangeStage(Stage.UserRegistration)})) : false;
            case Stage.UserRegistration:
                return this.props.editable ? (this.getButtonComponent('Team Make', () => {this.sendChangeStage(Stage.TeamMaking)})) : false;
            case Stage.TeamMaking:
                return this.props.editable ? (this.getButtonComponent('1R開始', () => {this.sendChangeStage(Stage.BeforeFirst)})) : false;
            case Stage.BeforeFirst:
                return this.props.editable ? (this.getButtonComponent('出題開始', () => {this.sendChangeStage(Stage.First)})) : false;
            case Stage.First:
                return this.props.editable ? (this.getButtonComponent('ゲーム終了', () => {this.sendChangeStage(Stage.AfterFirst)})) : false;
            case Stage.AfterFirst:
                return this.props.editable ? (this.getButtonComponent('チーム名登録へ', () => {this.sendChangeStage(Stage.TeamRegistration)})) : false;
            case Stage.TeamRegistration:
                return this.props.editable ? (this.getButtonComponent('2R開始', () => {this.sendChangeStage(Stage.BeforeSecondAlpha)})) : false;
            case Stage.BeforeSecondAlpha:
                return this.props.editable ? (this.getButtonComponent('出題開始', () => {this.sendChangeStage(Stage.SecondAlpha)})) : false;
            case Stage.SecondAlpha:
                return this.props.editable ? (this.getButtonComponent('解答受付終了', () => {this.sendChangeStage(Stage.AfterSecondAlpha)})) : false;
            case Stage.AfterSecondAlpha:
                return this.props.editable ? (this.getButtonComponent('次の問題へ', () => {this.sendChangeStage(Stage.BeforeSecondBeta)})) : false;
            case Stage.BeforeSecondBeta:
                return this.props.editable ? (this.getButtonComponent('出題開始', () => {this.sendChangeStage(Stage.SecondBeta)})) : false;
            case Stage.SecondBeta:
                return this.props.editable ? (this.getButtonComponent('解答受付終了', () => {this.sendChangeStage(Stage.AfterSecondBeta)})) : false;
            case Stage.AfterSecondBeta:
                return this.props.editable ? (this.getButtonComponent('次の問題へ', () => {this.sendChangeStage(Stage.BeforeSecondGamma)})) : false;
            case Stage.BeforeSecondGamma:
                return this.props.editable ? (this.getButtonComponent('出題開始', () => {this.sendChangeStage(Stage.SecondGamma)})) : false;
            case Stage.SecondGamma:
                return this.props.editable ? (this.getButtonComponent('解答受付終了', () => {this.sendChangeStage(Stage.AfterSecondGamma)})) : false;
            case Stage.AfterSecondGamma:
                return this.props.editable ? (this.getButtonComponent('敗者復活開始', () => {this.sendChangeStage(Stage.BeforeRevival)})) : false;
            case Stage.BeforeRevival:
                return this.props.editable ? (this.getButtonComponent('出題開始', () => {this.sendChangeStage(Stage.Revival)})) : false;
            case Stage.Revival:
                return this.props.editable ? (this.getButtonComponent('解答受付終了', () => {this.sendChangeStage(Stage.AfterRevival)})) : false;
            case Stage.AfterRevival:
                return false;
            default:
                return false;
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

    getMainContents (st) {
        let src;
        switch (st) {
            case Stage.BeforeStart:
                return false;
            case Stage.UserRegistration:
                return false;
            case Stage.TeamMaking:
                return false;
            case Stage.BeforeFirst:
                return this.getBingoCard();
            case Stage.First:
                return this.getBingoCard();
            case Stage.AfterFirst:
                return this.getBingoCard();
            case Stage.TeamRegistration:
                return false;
            case Stage.BeforeSecondAlpha:
                return (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>);
            case Stage.SecondAlpha:
                src = this.searchQuestion(101).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.AfterSecondAlpha:
                src = this.searchQuestion(101).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.BeforeSecondBeta:
                return (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>);
            case Stage.SecondBeta:
                src = this.searchQuestion(102).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.AfterSecondBeta:
                src = this.searchQuestion(102).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.BeforeSecondGamma:
                return (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>);
            case Stage.SecondGamma:
                src = this.searchQuestion(103).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.AfterSecondGamma:
                src = this.searchQuestion(103).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.BeforeRevival:
                return (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>);
            case Stage.Revival:
                src = this.searchQuestion(201).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            case Stage.AfterRevival:
                src = this.searchQuestion(201).img;
                return (<img src={src} alt='loading' className={this.props.classes.img}/>);
            default:
                return false;
        }
    }

    getBingoCard() {
        let links = [];
        this.state.questions.forEach(round => {
            if (round.roundid === '1') {
                round.questions.forEach((item, index) => {
                    const blockClass = classNames(
                        this.props.classes.QuestionLinkBlock,
                        {
                            'ready': item.status === 'ready',
                            'teammateViewing': item.status === 'playing' && item.teammateViewing,
                            'banned': item.status === 'banned',
                            'accepted': item.status === 'accepted',
                            'playing': item.status === 'playing',
                        },
                    );
                    links.push(
                        <div className={this.props.classes.QuestionLinkWrapper} key={'QuestionLinkWrapper_' + item.id}>
                            <div className={blockClass}>
                                {item.status === 'accepted' ? (<img  src={'https://juicy-apple.fun/av/AVRC2019/images/BingoBox/BingoBlockAccepted.svg'} alt='noimg' className={this.props.classes.QuestionLinkImgResult} />) : false}
                                {item.status === 'banned' ? (<img  src={'https://juicy-apple.fun/av/AVRC2019/images/BingoBox/BingoBlockBanned.svg'} alt='noimg' className={this.props.classes.QuestionLinkImgResult} />) : false}
                                <div className={this.props.classes.QuestionLink}>
                                    <img src={'https://juicy-apple.fun/av/AVRC2019/images/BingoBox/BingoBlock' + index + '.svg'} alt='noimg' className={this.props.classes.QuestionLinkImg}/>
                                </div>
                            </div>
                        </div>
                    );
                });
            }
        });
        return links.slice();
    }

    render () {
        return (
            <div className={this.props.classes.AnswerSheet}>   
                <div className={this.props.classes.PresenterMenu}>
                    <div className={this.props.classes.PresenterMenuHeader}>
                        <div className={this.props.classes.PresenterMenuTitle}>
                            {this.getTitle(this.state.stage)}
                        </div>
                        <div className={this.props.classes.PresenterMenuNext}>
                            {this.getNextButton(this.state.stage)}
                        </div>
                    </div>
                </div>
                <div className={this.props.classes.PresenterMain}>
                    <div className={this.props.classes.QuestionWrapper}>
                        {this.getMainContents(this.state.stage)}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(Presenter);