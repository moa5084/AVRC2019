import React, { Component } from 'react';

import { withStyles } from '@material-ui/styles';

import Styles from './Styles';
import { Stage } from 'avrcclient';

class Presenter extends Component {
    constructor (props) {
        super(props);
        this.state = {
            stage: props.stage || Stage.BeforeStart,
        }
    }
    getTitle (st) {
        switch (st) {
            case Stage.BeforeStart:
                return this.props.editable ? 'Before Start' : 'Team Making';
            case Stage.UserRegistration:
                return this.props.editable ? 'User Registration' : 'Team Making';
            case Stage.TeamMaking:
                return this.props.editable ? 'Team Making' : 'Team Making';
            case Stage.BeforeFirst:
                return this.props.editable ? 'Before First' : '1st Round';
            case Stage.First:
                return this.props.editable ? 'First' : '1st Round';
            case Stage.AfterFirst:
                return this.props.editable ? 'After First' : '1st Round';
            case Stage.BeforeSecondAlpha:
                return this.props.editable ? 'Before SecondAlpha' : '2nd Round: Alpha';
            case Stage.SecondAlpha:
                return this.props.editable ? 'SecondAlpha' : '2nd Round: Alpha';
            case Stage.AfterSecondAlpha:
                return this.props.editable ? 'After SecondAlpha' : '2nd Round: Alpha';
            case Stage.BeforeSeconBeta:
                return this.props.editable ? 'Before SecondBeta' : '2nd Round: Beta';
            case Stage.SecondBeta:
                return this.props.editable ? 'SecondBeta' : '2nd Round: Beta';
            case Stage.AfterSecondBeta:
                return this.props.editable ? 'After SecondBeta' : '2nd Round: Beta';
            case Stage.BeforeSeconGamma:
                return this.props.editable ? 'Before SecondGamma' : '2nd Round: Gamma';
            case Stage.SecondGamma:
                return this.props.editable ? 'SecondGamma' : '2nd Round: Gamma';
            case Stage.AfterSecondGamma:
                return this.props.editable ? 'After SecondGamma' : '2nd Round: Gamma';
            case Stage.BeforeRevival:
                return this.props.editable ? 'Before Revival' : 'Revival Round';
            case Stage.Revival:
                return this.props.editable ? 'Revival' : 'Revival Round';
            case Stage.AfterRevival:
                return this.props.editable ? 'After Revival' : 'Revival Round';
            default:
                return 'Unknown Stage';
        }
    }
    render () {
        return (
            <div className={this.props.classes.AnswerSheet}>   
                <div className={this.props.classes.PresenterMenu}>
                    <div className={this.props.classes.PresenterMenuTitle}>
                        {this.getTitle(this.state.stage)}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(Styles)(Presenter);