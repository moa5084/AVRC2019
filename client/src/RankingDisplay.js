import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';

import { fitText } from './fitText';

const styles = (theme) => ({
    RankingDisplayWrapper: {
        width: '100%',
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            width: '100%',
            paddingTop: '75%',
        },
    },
    RankingDisplay: {
        position: 'absolute',
        top: '0',
        left: '0',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexWrap: 'wrap',
        alignContent: 'flex-start',
        overflow: 'scroll',
    },
    RankingRow: {
        width: '100%',
        height: '9%',
        marginBottom: '0.75%',
        paddingRight: '3%',
        display: 'flex',
        flexWrap: 'nowrap',
        boxSizing: 'border-box',
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        borderRight: theme.palette.primary.main + ' 10px solid',
    },
    RankingRowRankWrapper: {
        width: '10%',
        height: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.primary.main,
        borderRadius: '10px 0 10px 0',
        color: '#fff',
    },
    RankingRowRank: {

    },
    RankingRowNameWrapper: {
        width: '50%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    RankingRowName: {
        fontWeight: 'bold',

    },
    RankingRowPrimaryWrapper: {
        width: '15%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        backgroundColor: theme.palette.primary.light,
        borderRadius: '10px',
        color: '#fff',
        margin: '0 1%',
    },
    RankingRowPrimary: {

    },
    RankingRowSecondaryWrapper: {
        width: '25%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
    },
    RankingRowSecondary: {

    },
});

class RankingDisplay extends Component {

    renderRow (d) {
        return (
            <div className={this.props.classes.RankingRow + ' rank' + d.rank} key={'RankingRow_' + d.rank}>
                <div className={this.props.classes.RankingRowRankWrapper}>
                    <div className={this.props.classes.RankingRowRank}>{d.rank}</div>
                </div>
                <div className={this.props.classes.RankingRowNameWrapper}>
                    <div className={this.props.classes.RankingRowName}>{d.name}</div>
                </div>
                <div className={this.props.classes.RankingRowPrimaryWrapper}>
                    <div className={this.props.classes.RankingRowPrimary}>{d.primary}</div>
                </div>
                {d.secondary ? (
                <div className={this.props.classes.RankingRowSecondaryWrapper}>
                    <div className={this.props.classes.RankingRowSecondary}>{d.secondary}</div>
                </div>
                ) : false}
            </div>
        );
    }

    componentDidMount () {
        this.props.data.forEach(item => {
            fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowRank, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowRankWrapper);
            fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowName, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowNameWrapper);
            fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowPrimary, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowPrimaryWrapper);
            if (item.secondary) fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowSecondary, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowSecondaryWrapper);
        });
    }

    render () {
        let lists = [];
        if (this.props.data) {
            this.props.data.forEach(item => {
                lists.push(this.renderRow(item));
            });
        }
        return (
            <div className={this.props.classes.RankingDisplayWrapper}>
                <div className={this.props.classes.RankingDisplay}>
                    {lists}
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(RankingDisplay);