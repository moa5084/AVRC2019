import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';

import Styles from './Styles';

class RoundMenu extends Component {
    render () {
        return (
            <div className={this.props.classes.RoundMenu}>

            </div>
        );
    }
}

export default withStyles(Styles)(RoundMenu);