import * as React from 'react';
import './style.scss';

type FCheckboxOnSetChecked = (name: string, state: boolean) => any;

export interface ICheckboxProps {
    name: string;
    value?: string;
    label: string;
    sublabel?: string | { on: string, off: string };
    checked?: boolean;
    onSetChecked?: FCheckboxOnSetChecked;
}

export interface ICheckboxState {
    checked: boolean;
}

export default class Checkbox extends React.Component<ICheckboxProps, ICheckboxState> {
    constructor(props: ICheckboxProps) {
        super(props);

        this.state = {
            checked: props.checked
        };
    }

    private onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const checked = event.target.checked;
        this.props.onSetChecked?.(this.props.name, checked);
        this.setState({ checked });
    };

    private getSubLabel = () => {
        const sublabel = this.props.sublabel!;

        if (typeof sublabel === 'string') {
            return sublabel;
        }

        return this.state.checked
            ? sublabel.on
            : sublabel.off;
    };

    render() {
        const { checked } = this.state;
        const { name, value, label, sublabel } = this.props;

        const cls = ['xCheckbox'];

        checked && cls.push('xCheckbox__checked');
        sublabel && cls.push('xCheckbox__has-sublabel');

        return (
            <label className={cls.join(' ')}>
                <input
                    className="xCheckbox--native"
                    type="checkbox"
                    name={name}
                    value={value}
                    checked={checked}
                    onChange={this.onChange} />
                <div className="xCheckbox--shape" />
                <div className="xCheckbox--content">
                    <div className="xChecbox--label">{label}</div>
                    {sublabel && (
                        <div className="xChecbox--sublabel">{this.getSubLabel()}</div>
                    )}
                </div>
            </label>
        );
    }
}
