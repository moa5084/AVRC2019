import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';
import classNames from 'classnames';
import Styles from './Styles';

class PlayerHome extends Component {
    render () {
        let links = [];
        this.props.questions.forEach(item => {
            const WrapperClass = classNames(
                this.props.classes.QuestionLinkWrapper,
                'large',
            );
            const blockClass = classNames(
                this.props.classes.QuestionLinkBlock,
                {
                    'ready': item.status === 'ready',
                    'accepted': item.status === 'accepted',
                }
            );
            const linkClass = classNames(
                this.props.classes.QuestionLink,
                'large',
            );
            links.push(
                <div className={WrapperClass} key={'QuestionLinkWrapper_' + item.roundid}>
                    <div className={blockClass}>
                        <Link to={'/Newcomer/' + item.roundid} className={linkClass}>
                            {item.title}
                        </Link>
                    </div>
                </div>
            );
        });
        return (
            <div className={this.props.classes.AnswerSheet}>
                <div className={this.props.classes.SheetHeader}>
                    <Typography variant="h3" gutterBottom>
                        {'Round Select'}
                    </Typography>
                </div>
                <div className={this.props.classes.QuestionWrapper}>
                    {links}
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(PlayerHome);