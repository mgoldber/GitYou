import React, { Component } from 'react';
import LoginForm from './components/LoginForm.js';
import Github from './components/Github.js';
import Teams from './components/Teams.js';
import File from './components/File.js';
import SendInvites from './components/SendInvites.js';
import './styles/styles.scss';

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
        <section className="Auth__Component">
          <LoginForm onLoginSubmit={this.onLoginSubmit} />
          <Github
            usernameLogin={this.state.usernameLogin}
            passwordLogin={this.state.passwordLogin}
            onGetOctokit={this.onGetOctokit}
          />
        </section>
        <section className="Teams__Component column">
          <Teams 
            octokit={this.state.octokit}
            onSetTeams={this.onSetTeams}
          />
        </section>
        <section className={"File__Component column " + (this.state.teams.length ? 'show' : 'hidden')}>
          <File 
            onSetEmails={this.onSetEmails}
          />
        </section>
        <section className={"SendInvites__Component column " + (this.state.emails.length ? 'show' : 'hidden')}>
          <SendInvites 
            teams={this.state.teams} 
            emails={this.state.emails}
            octokit={this.state.octokit}
          />
        </section>
      </div>
    );
  }
}

export default App;
