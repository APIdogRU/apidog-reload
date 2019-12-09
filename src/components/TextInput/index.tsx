/* eslint-disable no-unused-vars */

import * as React from 'react';

import './style.scss';

export type FTextInputOnChange = (name: string, value: string) => any;

export interface ITextInputProps {
    type: TextInputType;
    name: string;
    value: string;
    defaultValue?: string;
    label: string;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
    onChange?: FTextInputOnChange;
}

export interface ITextInputState {
    active: boolean;
    value: string;
}

export enum TextInputType {
    text = 'text',
    password = 'password',
    number = 'number',
    url = 'url',
    email = 'email'
}

export default class TextInput extends React.Component<ITextInputProps, ITextInputState> {
    public static defaultProps: Partial<ITextInputProps> = {
        type: TextInputType.text,
        value: ''
    };

    constructor(props: ITextInputProps) {
        super(props);

        this.state = {
            active: this.isEmpty(props.value),
            value: props.value
        };
    }

    private isEmpty = (value: string = this.state.value): boolean => {
        return value.trim().length > 0;
    };

    private onFocus = (_event: React.FocusEvent<HTMLInputElement>) => {
        const active = true;
        this.setState({ active });
    };

    private onBlur = (_event: React.FocusEvent<HTMLInputElement>) => {
        const active = this.isEmpty();
        this.setState({ active });
    };

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.trim();
        this.setState({ value });
        this.props.onChange?.(this.props.name, value);
    };

    render() {
        const {
            type,
            name,
            label,
            required,
            readonly,
            disabled
        } = this.props;

        const {
            value,
            active
        } = this.state;

        const id = `input-${name}`;
        const attrs: Record<string, any> = {};

        required && (attrs.required = true);
        readonly && (attrs.readonly = true);
        disabled && (attrs.disabled = true);

        const cls = ['xInput'];

        active && cls.push('xInput__active');

        return (
            <div
                className={cls.join(' ')}>
                <input
                    type={type}
                    name={name}
                    id={id}
                    value={value}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur}
                    {...attrs} />
                <label
                    htmlFor={id}>
                    {label}
                </label>
            </div>
        );
    }
}
