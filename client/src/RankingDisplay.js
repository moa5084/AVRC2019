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

    constructor (props) {
        super(props);
        this.state = {
            animationList: [],
            rowQueue: [],
            animationCount: -1,
        }
    }

    initializeAnimation (data) {
        let myAnimationList = [[]];
        let myRowQueue = [[]];
        let max_N = 0;
        data.forEach(group => {
            group.forEach(item => {
                max_N++;
            });
        });

        myAnimationList[myAnimationList.length - 1].push({
            type: 'enter',
        });

        data.forEach(group => {
            group.forEach(item => {
                if ((myRowQueue.length === 1 && max_N % 10 !== 0 && myRowQueue[0].length === max_N % 10) || myRowQueue[myRowQueue.length - 1].length >= 10) {
                    myRowQueue.push([]);
                    myAnimationList[myAnimationList.length - 1].push({
                        type: 'wait',
                        duration: '2000',
                    });
                    myAnimationList[myAnimationList.length - 1].push({
                        type: 'close',
                    });
                    myAnimationList[myAnimationList.length - 1].push({
                        type: 'wait',
                        duration: '2000',
                    });
                    myAnimationList[myAnimationList.length - 1].push({
                        type: 'enter',
                    });
                }
                myRowQueue[myRowQueue.length - 1].unshift(item);
                myAnimationList[myAnimationList.length - 1].push({
                    type: 'show',
                    target: item,
                });
                myAnimationList[myAnimationList.length - 1].push({
                    type: 'wait',
                    duration: '200',
                });
            });
            myAnimationList.push([]);
        });
        myAnimationList.pop();
        this.setState({
            animationList: myAnimationList.slice(),
            rowQueue: myRowQueue.slice(),
            animationCount: -1,
        });
    }

    componentDidMount () {
        this.initializeAnimation(this.props.data);
    }

    render () {
        let lists = [];
        if (this.state.rowQueue) {
            this.state.rowQueue.forEach(group => {
                group.forEach(item => {
                    lists.push((<RankingRow d={item} classes={this.props.classes} key={'RankingRow_' + item.rank}/>));
                });
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

class RankingRow extends Component {
    componentDidMount () {
        const item = this.props.d;
        fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowRank, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowRankWrapper);
        fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowName, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowNameWrapper);
        fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowPrimary, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowPrimaryWrapper);
        if (item.secondary) fitText('.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowSecondary, '.' + this.props.classes.RankingRow + '.rank' + item.rank + ' .' + this.props.classes.RankingRowSecondaryWrapper);
    }
    render () {
        const d = this.props.d;
        return (
            <div className={this.props.classes.RankingRow + ' rank' + d.rank}>
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
}

export default withStyles(styles)(RankingDisplay);