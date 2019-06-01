import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

import { withStyles } from '@material-ui/styles';

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
                <div className={this.props.classes.Header}>
                    <Typography variant="h3" gutterBottom>
                        {this.props.question.title || 'No Title'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {this.props.question.leadSentence ? (<p>{this.props.question.leadSentence}</p>) : null}
                    {this.props.question.status === 'HD' ? (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>)
                     : this.props.question.img
                        ? (<img src={this.props.question.img} alt='loading' className={this.props.classes.img}/>)
                        : null
                    }
                </div>
                {
                    this.props.question.status === 'PL' ? (
                        <div className={this.props.classes.Form}>
                            <TextField 
                                id='answer'
                                label={this.props.question.instruction ? this.props.question.instruction : '答えを入力せよ'}
                                className={this.props.classes.answerField}
                                variant='outlined'
                                value={this.state.answer}
                                onChange={this.onChange}
                            />      
                            <Button variant="contained" color="primary" className={this.props.classes.submitButton}>
                                <SendIcon />
                            </Button>
                        </div>
                    ) : null
                }
                <div className={this.props.classes.Footer}>
                    <img src='http://juicy-apple.fun/av/AVRC2019/images/AVRC2018_Logo.png' alt='loading' className={this.props.classes.footerImg}/>
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(AnswerSheet);