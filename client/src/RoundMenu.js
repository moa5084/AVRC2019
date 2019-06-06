import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Styles from './Styles';

class RoundMenu extends Component {
    render () {
        let links = [];
        if (this.props.round.roundid === '1') {
            this.props.round.questions.forEach((item, index) => {
                const blockClass = classNames(
                    this.props.classes.QuestionLinkBlock,
                    {
                        'ready': item.status === 'ready',
                        'teammateViewing': item.status === 'teammateViewing',
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
                            <Link to={'/Newcomer/' + this.props.round.roundid + '/' + item.id} className={this.props.classes.QuestionLink}>
                                <img src={'https://juicy-apple.fun/av/AVRC2019/images/BingoBox/BingoBlock' + index + '.svg'} alt='noimg' className={this.props.classes.QuestionLinkImg}/>
                            </Link>
                        </div>
                    </div>
                );
            });
        } else {
            this.props.round.questions.forEach(item => {
                const WrapperClass = classNames(
                    this.props.classes.QuestionLinkWrapper,
                    'large',
                );
                const blockClass = classNames(
                    this.props.classes.QuestionLinkBlock,
                    {
                        'ready': item.status === 'ready',
                        'accepted': item.status === 'accepted',
                        'playing': item.status === 'playing',
                    }
                );
                const linkClass = classNames(
                    this.props.classes.QuestionLink,
                    'large',
                );
                links.push(
                    <div className={WrapperClass} key={'QuestionLinkWrapper_' + item.id}>
                        <div className={blockClass}>
                            <Link to={'/Newcomer/' + this.props.round.roundid + '/' + item.id} className={linkClass}>
                                {item.title}
                            </Link>
                        </div>
                    </div>
                );
            });
        }
        return (
            <div className={this.props.classes.AnswerSheet}>
                <div className={this.props.classes.SheetHeader}>
                    <Typography variant="h3" gutterBottom>
                        {this.props.round.title || 'No Title'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {this.props.round.leadSentence ? (<p>{this.props.round.leadSentence}</p>) : null}
                    {this.props.round.status === 'hidden' ? (<img src={'https://juicy-apple.fun/av/AVRC2019/images/Ready.png'} alt='loading' className={this.props.classes.img}/>)
                     : links
                    }
                </div>
                <div className={this.props.classes.Footer}>
                    <img src='http://juicy-apple.fun/av/AVRC2019/images/AVRC2018_Logo.png' alt='loading' className={this.props.classes.footerImg}/>
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(RoundMenu);