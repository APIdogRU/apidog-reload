import * as React from 'react';
import appList from '../../data/applications';
import './style.scss';
import { IVKAuthSuccess, IVKAuthApplication } from '../../typings/authorization';
import Select from '../Select';
import TextInput, { TextInputType } from '../TextInput';
import Button from '../Button';
import Checkbox from '../Checkbox';

export type AuthCallback = (result: IVKAuthSuccess) => void;

/* eslint-disable no-unused-vars */
export enum AuthError {
    INVALID_PAIR,
    CAPTCHA_REQUIRED,
    INVALID_CAPTCHA,
    TOO_MANY_REQUESTS
}
/* eslint-enable no-unused-vars */

export interface IAuthFormProps {
    onAuthorized: AuthCallback;
}

export interface IAuthFormState {
    login: string;
    password: string;
    app: IVKAuthApplication;
    temporary: boolean;
    error?: AuthError;
}

export default class AuthForm extends React.Component<IAuthFormProps, IAuthFormState> {
    state: IAuthFormState = {
        login: '',
        password: '',
        app: appList[0],
        temporary: false,
    };

    private onChange = (name: keyof IAuthFormState, value: string) => {
        this.setField(name, value);
    };

    // eslint-disable-next-line no-unused-vars
    private onSelectApp = (name: keyof IAuthFormState, _index: number, app: IVKAuthApplication) => {
        this.setField(name, app);
    };

    private onSetChecked = (name: keyof IAuthFormState, state: boolean) => {
        this.setField(name, state);
    };

    private setField = (name: keyof IAuthFormState, value: unknown) => {
        this.setState({ [name]: value } as unknown as IAuthFormState);
    };

    private onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        this.props.onAuthorized?.({
            access_token: 'abc',
            expire_in: 0,
            user_id: 1
        });
    };

    private renderError = () => {
        switch (this.state.error) {
            case AuthError.CAPTCHA_REQUIRED:
            case AuthError.INVALID_CAPTCHA:
            case AuthError.INVALID_PAIR:
            case AuthError.TOO_MANY_REQUESTS: {
                return <div>error</div>;
            }
        }
    };

    render() {
        return (
            <form className="auth-form" onSubmit={this.onSubmit}>
                <TextInput
                    onChange={this.onChange}
                    name="login"
                    label="Логин"
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
                    type='submit'
                    size='l' />
            </form>
        );
    }
}
