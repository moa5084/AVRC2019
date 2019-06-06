import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PersonIcon from '@material-ui/icons/Person';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PeopleIcon from '@material-ui/icons/People';

import Styles from './Styles';

class Header extends Component {
    constructor (props) {
        super(props);
        this.state = {
            index: 0,
        }
        this.clickHandler = this.clickHandler.bind(this);
    }

    clickHandler () {
        if (!this.props.team.visibility) {
            this.setState({index: 0});
        } else {
            let ind = this.state.index;
            ind = ++ind % 3;
            this.setState({index: ind});
        }
    }

    render () {
        let teamData;
        if ((this.props.type === 'A' || this.props.type === 'B') && this.props.team.visibility) {
            switch (this.state.index) {
                case 1:
                    teamData = (
                        <div className={this.props.classes.HeaderTeamWrapper} onClick={() => {this.clickHandler()}}>
                            <PersonIcon />{this.props.team.myName}
                        </div>
                    );
                    break;
                case 2:
                    teamData = (
                        <div className={this.props.classes.HeaderTeamWrapper} onClick={() => {this.clickHandler()}}>
                            <PersonAddIcon />{this.props.team.teammateName}
                        </div>
                    );
                    break;
                default:
                    teamData = (
                        <div className={this.props.classes.HeaderTeamWrapper} onClick={() => {this.clickHandler()}}>
                            <PeopleIcon />{this.props.team.teamName}
                        </div>
                    );
                    break;
            }
        } else {
            teamData = (
                <div className={this.props.classes.HeaderTeamWrapper}>
                    <PersonIcon />{this.props.team.myName}
                </div>
            );
        }
        const prefix = this.props.type === 'A' ? '/Newcomer' : (this.props.type === 'B' ? '/NewComer' : '/Senior');
        return (
            <div className={this.props.classes.Header}>
                <div className={this.props.classes.HeaderBackWrapper}>
                    <Switch>
                        <Route exact path={prefix + '/:round'} render={props => {
                            return (
                                <Link to={prefix} className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon className={this.props.classes.HeaderBackArrow}/>ホーム画面へ</Link>
                            );
                        }} />
                        <Route exact path={prefix + '/:round/:id'} render={props => {
                            return (
                                <Link to={prefix + '/' + props.match.params.round} className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon  className={this.props.classes.HeaderBackArrow}/>問題選択へ</Link>
                            );
                        }} />
                    </Switch>
                </div>
                {teamData}
            </div>
        );
    }
}

export default withStyles(Styles)(Header);