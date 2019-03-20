import React, { Component } from 'react';

class LoginForm extends Component {

    constructor(props) {
        super(props);
        this.state = {
            usernameLogin: '',
            passwordLogin: ''
        }
    }

    handleUsernameChange = (event) => {
        this.setState({
            usernameLogin: event.target.value
        });
    }

    handlePasswordChange = (event) => {
        this.setState({
            passwordLogin: event.target.value
        });
    }

    handleFormSubmit = (event) => {
        event.preventDefault();
        this.props.onLoginSubmit(this.state.usernameLogin, this.state.passwordLogin);
    }

    render() {
        return (
            <div className="Auth__Component">
                <h1>Git-Pell</h1>
                <form onSubmit={this.handleFormSubmit}>
                    <input
                        type="email"
                        placeholder="GitHub Email"
                        id="usernameLogin"
                        required
                        value={this.state.usernameLogin}
                        onChange={this.handleUsernameChange}
                    />
                    <input
                        type="password"
                        placeholder="GitHub Password"
                        id="passwordLogin"
                        required
                        value={this.state.passwordLogin}
                        onChange={this.handlePasswordChange}
                    />
                    <input type="submit" />
                </form>
            </div>
        )
    }
}

export default LoginForm;