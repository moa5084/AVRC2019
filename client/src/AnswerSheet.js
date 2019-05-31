import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import SendIcon from '@material-ui/icons/Send';

import { withStyles } from '@material-ui/styles';

import 'typeface-roboto';

const styles = (theme) => ({
    AnswerSheet: {
        width: '100%',
        margin: '0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '3px 3px 1px 1px rgba(40, 40, 40, 0.2), inset 0 0 10px 0 #fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    Header: {
        width: '100%',
        textAlign: 'center',
    },
    QuestionWrapper: {
        width: '90%',
        minHeight: '60px',
        position: 'relative',
        padding: '10px',
        '&::before': {
            content: '""',
            width: '20px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '0',
            left: '0',
            borderLeft: '#999 1px solid',
            borderTop: '#999 1px solid',
        },
        '&::after': {
            content: '""',
            width: '20px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            bottom: '0',
            right: '0',
            borderRight: '#999 1px solid',
            borderBottom: '#999 1px solid',
        },
    },
    img: {
        width: '100%',
        height: 'auto'
    },
    Form: {
        margin: '40px 0',
        width: '100%',
        display: 'flex',
    },
    answerField: {
        flexGrow: '5',
    },
    submitButton: {
        flexGrow: '1',
        margin: '0 3%',
    },
    Footer: {
        width: '100%',
        minHeight: '10px',
        textAlign: 'center',
    },
    footerImg: {
        maxWidth: '40%',
        height: 'auto',
    },
});

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
                    <img src={this.props.question.img} alt='loading' className={this.props.classes.img}/>
                </div>
                <div className={this.props.classes.Form}>
                    <TextField 
                        id='answer'
                        label='答えを入力せよ'
                        className={this.props.classes.answerField}
                        variant='outlined'
                        value={this.state.answer}
                        onChange={this.onChange}
                    />      
                    <Button variant="contained" color="primary" className={this.props.classes.submitButton}>
                        <SendIcon />
                    </Button>
                </div>
                <div className={this.props.classes.Footer}>
                    <img src='http://juicy-apple.fun/av/AVRC2019/images/AVRC2018_Logo.png' alt='loading' className={this.props.classes.footerImg}/>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(AnswerSheet);