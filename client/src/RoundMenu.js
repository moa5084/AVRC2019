import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/styles';

import Styles from './Styles';

class RoundMenu extends Component {
    render () {
        let links = [];
        this.props.round.questions.forEach(item => {
            links.push(
                <div className={this.props.classes.QuestionLinkWrapper} key={'QuestionLinkWrapper_' + item.id}>
                    <div className={this.props.classes.QuestionLinkBlock}>
                        <Link to={'/Newcomer/' + this.props.round.roundid + '/' + item.id} className={this.props.classes.QuestionLink}>{item.id}</Link>
                    </div>
                </div>
            );
        });
        return (
            <div className={this.props.classes.AnswerSheet}>
                <div className={this.props.classes.SheetHeader}>
                    <Typography variant="h3" gutterBottom>
                        {this.props.round.title || 'No Title'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {this.props.round.leadSentence ? (<p>{this.props.round.leadSentence}</p>) : null}
                    {this.props.round.status === 'HD' ? (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>)
                     : links
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(RoundMenu);