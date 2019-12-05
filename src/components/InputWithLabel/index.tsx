import * as React from 'react';
import './style.scss';

export enum IInputType {
    TEXT = 'text',
    PASSWORD = 'password',
    URL = 'url',
    EMAIL = 'email',
    NUMBER = 'number'
}

export type EInputChanged = (name: string, value: string) => any;

export interface IInputWithLabelProps {
    name: string;
    label: string;
    onChange: EInputChanged;
    value?: string;
    type?: IInputType;
    required?: boolean;
    readonly?: boolean;
    disabled?: boolean;
}

export interface IInputWithLabelState {
    value: string;
    active: boolean;
}

export default class InputWithLabel extends React.Component<IInputWithLabelProps, IInputWithLabelState> {
    state: IInputWithLabelState = {
        value: '',
        active: false
    };

    constructor(props: IInputWithLabelProps) {
        super(props);

        if (props.value) {
            this.state.value = props.value;
            this.state.active = true;
        }
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        this.setState({ value });
        this.props.onChange(this.props.name, value);
    };

    private onFocus = (_event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({
            active: true
        });
    };

    private onBlur = (event: React.FocusEvent<HTMLInputElement>) => {
        this.setState({
            active: event.target.value.trim().length > 0
        });
    };

    render() {
        const { label, value: defaultValue, type, required, readonly, disabled } = this.props;
        const { value, active } = this.state;
        const attrs: Record<string, any> = {};

        required && (attrs.required = true);
        readonly && (attrs.readonly = true);
        disabled && (attrs.disabled = true);

        const cls = ['input-wl'];

        active && cls.push('input-wl__active');

        return (
            <label className={cls.join(' ')}>
                <input
                    type={type}
                    className={'input-wl--input'}
                    defaultValue={defaultValue}
                    value={value} {...attrs}
                    onChange={this.onChange}
                    onFocus={this.onFocus}
                    onBlur={this.onBlur} />
                <div className="input-wl--label">{label}</div>
            </label>
        );
    }
}
