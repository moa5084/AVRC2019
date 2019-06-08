import React, { Component } from 'react';
import posed from 'react-pose';

import Button from '@material-ui/core/Button';
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
        boxShadow: 'inset 0 0 5px 0 #fff',
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
        boxShadow: 'inset 0 0 5px 0 #fff',
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
    RankingDisplayPlayButton: {
        position: 'absolute',
        top: '0',
        left: '100%',
        width: '5%',
        height: '5%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

const PosedRow = posed.div({
    hidden: {
        opacity: 0,
        y: 100,
        scale: 0.5,
        transition: {
            opacity: {ease: 'linear', duration: 500},
            default: {ease: 'easeOut', duration: 500},
        },
    },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            opacity: {ease: 'linear', duration: 500},
            default: {ease: 'easeOut', duration: 500},
        },
    }
});

class RankingDisplay extends Component {

    constructor (props) {
        super(props);
        this.state = {
            animationList: [],
            rowQueue: [],
            nowList: [],
            mode: 'animate',
        }
    }

    animate () {
        let myAnimationList = this.state.animationList.slice();
        let myRowQueue = this.state.rowQueue.slice();
        let myList = this.state.nowList.slice();
        if (myAnimationList.length <= 0 || myAnimationList[0].length <= 0) return;
        const d = myAnimationList[0][0];
        myAnimationList[0].shift();
        switch (d.type) {
            case 'enter':
                myList = [];
                myRowQueue[0].forEach(item => {
                    myList.push({
                        item: item,
                        visibility: false,
                    });
                });
                myRowQueue.shift();
                break;
            case 'show':
                myList.forEach((item, index) => {
                    if (d.target.rank === item.item.rank) {
                        myList[index].visibility = true;
                    }
                });
                break;
            case 'close':
                myList = [];
                break;
            default:
        }
        const result = new Promise((resolve) => {
            this.setState({
                animationList: myAnimationList.slice(),
                rowQueue: myRowQueue.slice(),
                nowList: myList.slice(),
            });
            resolve();
        });
        result.then(() => {
            const isLast = myAnimationList[0].length <= 0;
            if (isLast) {
                myAnimationList.shift();
                this.setState({
                    animationList: myAnimationList.slice(),
                });
            } else {
                if (d.type !== 'wait') this.animate();
                else {
                    setTimeout(() => {
                        this.animate();
                    }, d.duration);
                }
            };
        });
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
                        duration: '500',
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
                    duration: '100',
                });
            });
            myAnimationList.push([]);
        });
        myAnimationList.pop();
        this.setState({
            animationList: myAnimationList.slice(),
            rowQueue: myRowQueue.slice(),
            animationCount: -1,
            mode: this.props.editable ? 'display' : 'animate',
        });
    }

    componentDidMount () {
        this.initializeAnimation(this.props.data);
    }

    componentWillReceiveProps (nextProps) {
        if (this.props.data !== nextProps.data) {
            this.initializeAnimation(this.props.data);
            if (this.props.emitRanking) this.props.emitRanking(nextProps.data);
        }
    }

    onPlay () {
        this.animate();
        if (this.props.emitAnimate) this.props.emitAnimate();
        this.setState({mode: 'animate'});
    }

    onLoad () {
        if (this.props.emitGet) this.props.emitGet();
    }

    onRecvRanking() {
        this.initializeAnimation(this.props.data);
    }

    getButtonComponent (txt, onClick) {
        return (
            <Button variant="contained" color="primary" className={this.props.classes.ControlButton} onClick={onClick ? onClick : () => {}} >
                {txt}
            </Button>
        );
    }

    render () {
        let lists = [];
        if (this.state.mode === 'animate') {
            if (this.state.nowList) {
                this.state.nowList.forEach(it => {
                    const item = it.item;
                    lists.push(<RankingRow d={item} classes={this.props.classes} key={'RankingRow_' + item.rank} visibility={it.visibility}/>);
                });
            }
        } else {
            this.props.data.forEach((group) => {
                group.forEach(item => {
                    lists.unshift(<RankingRow d={item} classes={this.props.classes} key={'RankingRow_' + item.rank} visibility={true}/>)
                });
            });
        }
        return (
            <div className={this.props.classes.RankingDisplayWrapper}>
                <div className={this.props.classes.RankingDisplay}>
                    {lists}
                </div>
                {this.props.editable ? (
                    <div className={this.props.classes.RankingDisplayPlayButton}>
                        {this.getButtonComponent('Play', () => {this.onPlay()})}
                        {this.getButtonComponent('Load', () => {this.onLoad()})}
                    </div>
                ) : false}
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
            <PosedRow className={this.props.classes.RankingRow + ' rank' + d.rank} pose={this.props.visibility ? 'visible' : 'hidden'}>
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
            </PosedRow>
        );
    }
}

export default withStyles(styles)(RankingDisplay);