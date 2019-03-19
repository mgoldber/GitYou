import React, { Component } from 'react';
const Octokit = require('@octokit/rest')

class Github extends Component {
    constructor(props) {
        super(props);
        this.state = {
            octokit: null    
        }
    }

    async getOctokit() {
        const githubObj = new Octokit({
            auth: {
                username: this.props.usernameLogin,
                password: this.props.passwordLogin
            }
        });
        this.props.onGetOctokit(githubObj);
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.usernameLogin && this.props.passwordLogin && this.props.usernameLogin !== prevProps.usernameLogin &&
			this.props.passwordLogin !== prevProps.passwordLogin) {
			this.getOctokit();
		}
    }

    render() {
        return (
            <div></div>
        )
    }
};

export default Github;