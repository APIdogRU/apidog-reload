/* eslint-disable no-unused-vars */

import * as React from 'react';
import './style.scss';

export type FButtonOnClick = () => any;

export enum ButtonType {
    button = 'button',
    submit = 'submit'
}

export interface IButtonProps {
    label: string;
    type?: ButtonType;
    onClick?: FButtonOnClick;
    disabled?: boolean;
}

export interface IButtonState {

}

export default class Button extends React.Component<IButtonProps, IButtonState> {
    public static defaultProps = {
        type: ButtonType.button
    };

    private onClick = (_event: React.MouseEvent<HTMLInputElement>) => {
        this.props.onClick();
    };

    render() {
        const {
            type,
            label,
            disabled
        } = this.props;

        return (
            <input
                className="xButton"
                type={type}
                value={label}
                onClick={this.onClick}
                {...(disabled && ({ disabled: true }))} />
        );
    }
}
