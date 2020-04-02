import * as React from 'react';
import './style.scss';
import classNames from 'classnames';

export type ButtonOnClick = () => void;

export interface IButtonProps {
    label: string;
    type?: 'button' | 'submit';
    onClick?: ButtonOnClick;
    size?: 's' | 'm' | 'l';
    disabled?: boolean;
}

export interface IButtonState {

}

export default class Button extends React.Component<IButtonProps, IButtonState> {
    public static defaultProps = {
        type: 'button',
        size: 'm',
    };


    private onClick = () => this.props.onClick();

    render() {
        const {
            type,
            label,
            disabled,
            size
        } = this.props;
        return (
            <input
                className={classNames('xButton', {
                    [`xButton__size-${size}`]: !!size,
                })}
                type={type}
                value={label}
                onClick={this.onClick}
                {...(disabled && ({ disabled: true }))} />
        );
    }
}
