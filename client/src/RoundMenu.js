import React, { Component } from 'react';

import Typography from '@material-ui/core/Typography';

import { withStyles } from '@material-ui/styles';

import Styles from './Styles';

class RoundMenu extends Component {
    render () {
        return (
            <div className={this.props.classes.AnswerSheet}>
                <div className={this.props.classes.Header}>
                    <Typography variant="h3" gutterBottom>
                        {this.props.round.title || 'No Title'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {this.props.round.leadSentence ? (<p>{this.props.round.leadSentence}</p>) : null}
                    {this.props.round.status === 'HD' ? (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>)
                     : this.props.round.img
                        ? (<img src={this.props.round.img} alt='loading' className={this.props.classes.img}/>)
                        : null
                    }
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(RoundMenu);