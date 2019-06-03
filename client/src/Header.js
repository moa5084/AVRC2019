import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';

import { withStyles } from '@material-ui/styles';

import Styles from './Styles';

class Header extends Component {
    render () {
        return (
            <div className={this.props.classes.Header}>
                <div className={this.props.classes.HeaderBackWrapper}>
                    <Switch>
                        <Route exact path='/Newcomer/:round' render={props => {
                            return (
                                <Link to='/Newcomer'>back</Link>
                            );
                        }} />
                        <Route exact path='/NewComer/:round' render={props => {
                            return (
                                <Link to='/NewComer'>back</Link>
                            );
                        }} />
                        <Route exact path='/Newcomer/:round/:id' render={props => {
                            return (
                                <Link to={'/Newcomer/' + props.match.params.round}>back</Link>
                            );
                        }} />
                        <Route exact path='/NewComer/:round/:id' render={props => {
                            return (
                                <Link to={'/NewComer/' + props.match.params.round}>back</Link>
                            );
                        }} />
                    </Switch>
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(Header);