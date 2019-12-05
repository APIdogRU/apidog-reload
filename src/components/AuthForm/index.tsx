/* eslint-disable no-unused-vars */

import * as React from 'react';
import appList from '../../data/applications';
import InputWithLabel, { IInputType } from '../../components/InputWithLabel';
import './style.scss';
import { IVKAuthSuccess } from '../../typings/authorization';

export type EAuthSuccess = (result: IVKAuthSuccess) => any;

export enum TAuthCauseError {
    INVALID_PAIR,
    CAPTCHA_REQUIRED,
    INVALID_CAPTCHA,
    TOO_MANY_REQUESTS
}

export interface IAuthFormProps {
    onAuthorized: EAuthSuccess;
}

export interface IAuthFormState {
    login: string;
    password: string;
    error?: TAuthCauseError;
}

export default class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
    state: IAuthFormState = {
        login: '',
        password: ''
    };

    private onChange = (name: keyof IAuthFormState, value: string) => {
        this.setState({ [name]: value } as unknown as IAuthFormState);
    }

    private renderAppList = () => {
        return (
            <select name="appId">
                {appList.map(app => (
                    <option key={app.appId} value={app.appId}>{app.title}</option>
                ))}
            </select>
        );
    };

    private renderError = () => {
        switch (this.state.error) {
            case TAuthCauseError.CAPTCHA_REQUIRED:
            case TAuthCauseError.INVALID_CAPTCHA:
            case TAuthCauseError.INVALID_PAIR:
            case TAuthCauseError.TOO_MANY_REQUESTS: {
                return <div>error</div>;
            }
        }
    }

    render() {
        return (
            <div className="auth-form">
                <InputWithLabel
                    onChange={this.onChange}
                    name="login"
                    label="Логин"
                    value="test"
                    type={IInputType.TEXT} />
                <InputWithLabel
                    onChange={this.onChange}
                    name="password"
                    label="Пароль"
                    type={IInputType.PASSWORD} />
                {this.renderAppList()}
                {this.renderError()}
                <input type="submit" value="Авторизация" />
            </div>
        );
    }
}
