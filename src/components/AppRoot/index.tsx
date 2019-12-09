import React from 'react';

export interface IAppRootProps {
    dark?: boolean;
}

export default class AppRoot extends React.Component<IAppRootProps> {
    componentDidMount() {
        if (this.props.dark) {
            document.documentElement.classList.add('theme__dark');
        }
    }

    render() {
        return this.props.children;
    }
}
