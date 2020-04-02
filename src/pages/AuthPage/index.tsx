import * as React from 'react';
import AuthForm, { AuthError } from '../../components/AuthForm'; // eslint-disable-line no-unused-vars
import { IVKAuthSuccess } from '../../typings/authorization'; // eslint-disable-line no-unused-vars
import Logo from '../../components/Logo';
import './style.scss';
import AppRoot from '../../components/AppRoot';

export type IAuthPageProps = {};
export interface IAuthPageState {
    error?: AuthError;
}

export default class AuthPage extends React.Component<IAuthPageProps, IAuthPageState> {
    state: IAuthPageState = {};

    private onAuthorized = (result: IVKAuthSuccess) => {
        alert('authorized ' + result.access_token);
    };

    render() {
        return (
            <AppRoot dark={true}>
                <div className="auth">
                    <Logo width={270} />
                    <p className="auth-description">APIdog &mdash; неофициальный клиент для ВКонтакте.</p>
                    <AuthForm onAuthorized={this.onAuthorized} />
                    <div className="auth-footer">
                        APIdog Reload v{process.env.VERSION} ({process.env.BUILD_DATE})
                    </div>
                </div>
            </AppRoot>
        );
    }
}
