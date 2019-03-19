import React, { Component } from 'react';
import LoginForm from './components/LoginForm.js';
import Github from './components/Github.js';
import Teams from './components/Teams.js';
import File from './components/File.js';
import SendInvites from './components/SendInvites.js';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: "",
      passwordLogin: "",
      octokit: null,
      emails: [],
      teams: []
    };
  }

  onLoginSubmit = (username, password) => {
    this.setState({
      usernameLogin: username,
      passwordLogin: password
    });
  }

  onGetOctokit = (octokit) => {
    this.setState({
      octokit: octokit
    })
  }

  onSetTeams = (teams) => {
    this.setState({
      teams: teams
    });
  }

  onSetEmails = (emails) => {
    this.setState({
      emails: emails
    });
  }
  
  render() {
    return (
      <div className="App">
        <LoginForm onLoginSubmit={this.onLoginSubmit} />
        <Github
          usernameLogin={this.state.usernameLogin}
          passwordLogin={this.state.passwordLogin}
          onGetOctokit={this.onGetOctokit}
        />
        <Teams 
          octokit={this.state.octokit}
          onSetTeams={this.onSetTeams}
        />
        <File 

          onSetEmails={this.onSetEmails}
        />
        <SendInvites />
      </div>
    );
  }
}

export default App;
