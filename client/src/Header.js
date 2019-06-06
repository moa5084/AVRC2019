import React, { Component } from 'react';
import { Route, Switch, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';

import Styles from './Styles';

class Header extends Component {
    render () {
        const teamData = this.props.team.visibility ? (
            <div className={this.props.classes.HeaderTeamWrapper}>
                <PeopleIcon />{this.props.team.teamName}
            </div>
        ) : (
            <div className={this.props.classes.HeaderTeamWrapper}>
                <PersonIcon />{this.props.team.myName}
            </div>
        );
        return (
            <div className={this.props.classes.Header}>
                <div className={this.props.classes.HeaderBackWrapper}>
                    <Switch>
                        <Route exact path='/Newcomer/:round' render={props => {
                            return (
                                <Link to='/Newcomer' className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon className={this.props.classes.HeaderBackArrow}/>ホーム画面へ</Link>
                            );
                        }} />
                        <Route exact path='/NewComer/:round' render={props => {
                            return (
                                <Link to='/NewComer' className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon  className={this.props.classes.HeaderBackArrow}/>ホーム画面へ</Link>
                            );
                        }} />
                        <Route exact path='/Newcomer/:round/:id' render={props => {
                            return (
                                <Link to={'/Newcomer/' + props.match.params.round} className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon  className={this.props.classes.HeaderBackArrow}/>問題選択へ</Link>
                            );
                        }} />
                        <Route exact path='/NewComer/:round/:id' render={props => {
                            return (
                                <Link to={'/NewComer/' + props.match.params.round} className={this.props.classes.HeaderBackButton}><KeyboardArrowLeftIcon  className={this.props.classes.HeaderBackArrow}/>問題選択へ</Link>
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