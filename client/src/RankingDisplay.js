import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';

const styles = (theme) => {

}

class RankingDisplay extends Component {

    renderRow (d) {
        return (
            <div className={this.props.classes.RankingRow}>
                <div className={this.props.classes.RankingRowRank}></div>
            </div>
        );
    }

    render () {
        return (
            <div className={this.props.classes.RankingDisplay}>

            </div>
        );
    }
}

export default withStyles(styles)(RankingDisplay);