import * as React from 'react';
import './style.scss';

export type FButtonOnClick = () => any;

export interface IButtonProps {
    label: string;
    type?: 'button' | 'submit';
    onClick?: FButtonOnClick;
    size?: 's' | 'm' | 'l';
    disabled?: boolean;
}

export interface IButtonState {

}

export default class Button extends React.Component<IButtonProps, IButtonState> {
    public static defaultProps = {
        type: 'button',
        size: 'm'
    };

    private onClick = (_event: React.MouseEvent<HTMLInputElement>) => {
        this.props.onClick();
    };

    render() {
        const {
            type,
            label,
            disabled,
            size
        } = this.props;

        const cls = ['xButton'];

        size && cls.push(`xButton__size-${size}`);

        return (
            <input
                className={cls.join(' ')}
                type={type}
                value={label}
                onClick={this.onClick}
                {...(disabled && ({ disabled: true }))} />
        );
    }
}
