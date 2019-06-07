import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

import { withStyles } from '@material-ui/styles';

import classNames from 'classnames';

import 'typeface-roboto';

import Styles from './Styles';

class AnswerSheet extends Component {

    constructor (props) {
        super(props);
        this.state = {
            answer: '',
        }
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
        this.setState({answer: e.target.value});
    }

    render () {
        return (
            <div className={this.props.classes.AnswerSheet}>
                <div className={this.props.classes.SheetHeader}>
                    <Typography variant="h3" gutterBottom>
                        {this.props.question.title || 'No Title'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {this.props.question.leadSentence ? (<p>{this.props.question.leadSentence}</p>) : null}
                    {this.props.question.status === 'hidden' || this.props.question.status === 'ready' ? (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>)
                     : this.props.question.img
                        ? (<img src={this.props.question.img} alt='loading' className={this.props.classes.img}/>)
                        : null
                    }
                </div>
                {
                    this.props.question.status === 'playing' ? (
                        <div className={this.props.classes.Form}>
                            <TextField 
                                id='answer'
                                label={this.props.question.instruction ? this.props.question.instruction : '答えを入力せよ'}
                                className={this.props.classes.answerField}
                                variant='outlined'
                                value={this.state.answer}
                                onChange={this.onChange}
                            />      
                            <Button variant="contained" color="primary" className={this.props.classes.submitButton} onClick={() => {if (this.props.sendFunction) this.props.sendFunction(this.props.question.id, this.state.answer);}} >
                                <SendIcon />
                            </Button>
                        </div>
                    ) : (
                        <div className={this.props.classes.Form}>
                            <MessageBox classes={this.props.classes} status={this.props.question.status}/>
                        </div>
                    )
                }
                <div className={this.props.classes.Footer}>
                    <img src='http://juicy-apple.fun/av/AVRC2019/images/AVRC2018_Logo.png' alt='loading' className={this.props.classes.footerImg}/>
                </div>
            </div>
        );
    }
}

class MessageBox extends Component {
    render () {
        const myClass = classNames(
            this.props.classes.FormMessageBox,
            {
                'accepted': this.props.status === 'accepted',
                'banned': this.props.status === 'banned',
                'finished': this.props.status === 'finished' || this.props.status === 'sent',
            },
        )
        let content;
        switch (this.props.status) {
            case 'accepted':
                content = ('正解しました');
                break;
            case 'ready':
            case 'hidden':
                content = ('まもなくスタート');
                break;
            case 'banned':
                content = ('封鎖されました');
                break;
            case 'finished':
                content = ('解答受付は終了しました');
                break;
            case 'sent':
                content = ('解答を送信しました');
                break;
            default:
        }
        return (
            <div className={myClass}>
                {content}
            </div>
        );
    }
}

export default withStyles(Styles)(AnswerSheet);