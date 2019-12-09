/* eslint-disable no-unused-vars */

import * as React from 'react';
import appList from '../../data/applications';
import './style.scss';
import { IVKAuthSuccess, IVKAuthApplication } from '../../typings/authorization';
import Select from '../Select';
import TextInput, { TextInputType } from '../TextInput';
import Button, { ButtonType } from '../Button';
import Checkbox from '../Checkbox';

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
    app: IVKAuthApplication;
    temporary: boolean;
    error?: TAuthCauseError;
}

export default class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
    state: IAuthFormState = {
        login: '',
        password: '',
        app: appList[0],
        temporary: false
    };

    private onChange = (name: keyof IAuthFormState, value: string) => {
        this.setField(name, value);
    };

    private onSelectApp = (name: keyof IAuthFormState, index: number, app: IVKAuthApplication) => {
        this.setField(name, app);
    };

    private onSetChecked = (name: keyof IAuthFormState, state: boolean) => {
        this.setField(name, state);
    };

    private setField = (name: keyof IAuthFormState, value: any) => {
        this.setState({ [name]: value } as unknown as IAuthFormState);
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
    };

    render() {
        return (
            <div className="auth-form">
                <TextInput
                    onChange={this.onChange}
                    name="login"
                    label="Логин"
                    value="test"
                    type={TextInputType.text} />
                <TextInput
                    onChange={this.onChange}
                    name="password"
                    label="Пароль"
                    required={true}
                    type={TextInputType.password} />
                <Select
                    items={appList.map(app => ({
                        value: app.appId,
                        title: app.title,
                        data: app
                    }))}
                    name="appId"
                    label="Приложение для авторизации"
                    selectedIndex={0}
                    onSelect={this.onSelectApp} />
                {this.renderError()}
                <Checkbox
                    name="temporary"
                    label="Выйти по окончанию сессии"
                    sublabel={{
                        on: 'Сессия активна до закрытия окна браузера',
                        off: 'Сессия активна 90 дней от последнего захода'
                    }}
                    onSetChecked={this.onSetChecked}
                    checked={this.state.temporary} />
                <Button
                    label="Авторизация"
                    type={ButtonType.submit} />
            </div>
        );
    }
}
