import * as React from 'react';
import './style.scss';
import classNames from 'classnames';

type CheckboxOnSetChecked = (name: string, state: boolean) => void;

export interface ICheckboxProps {
    name: string;
    value?: string;
    label: string;
    sublabel?: string | { on: string; off: string };
    checked?: boolean;
    disabled?: boolean;
    onSetChecked?: CheckboxOnSetChecked;
}

export interface ICheckboxState {
    checked: boolean;
}

export default class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
    constructor(props: ICheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked,
        };
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        this.props.onSetChecked?.(this.props.name, checked);
        this.setState({ checked });
    };

    private getSubLabel = () => {
        const sublabel = this.props.sublabel;

        if (typeof sublabel === 'string') {
            return sublabel;
        }

        return this.state.checked
            ? sublabel.on
            : sublabel.off;
    };

    render() {
        const { checked } = this.state;
        const { name, value, label, sublabel, disabled } = this.props;

        return (
            <label className={classNames('xCheckbox', {
                'xCheckbox__checked': checked,
                'xCheckbox__disabled': disabled,
                'xCheckbox__has-sublabel': sublabel,
            })}>
                <input
                    className="xCheckbox--native"
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    disabled={disabled}
                    onChange={this.onChange} />
                <div className="xCheckbox--shape" />
                <div className="xCheckbox--content">
                    <div className="xCheckbox--label">{label}</div>
                    {sublabel && (
                        <div className="xCheckbox--sublabel">{this.getSubLabel()}</div>
                    )}
                </div>
            </label>
        );
    }
}
