import React, { Component } from 'react';
import LoginForm from './components/LoginForm.js';
import Github from './components/Github.js';
import Orgs from './components/Orgs.js';
import Teams from './components/Teams.js';
import File from './components/File.js';
import SendInvites from './components/SendInvites.js';
import Search from './components/Search.js';
import './styles/styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usernameLogin: "",
      passwordLogin: "",
      octokit: null,
      emails: [],
      org: "",
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

  onSetOrg = (org) => {
    this.setState({
      org: org
    });
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
      <div className="App clearfix">
        <header className="Auth__Component">
          <LoginForm onLoginSubmit={this.onLoginSubmit} />
          <Github
            usernameLogin={this.state.usernameLogin}
            passwordLogin={this.state.passwordLogin}
            onGetOctokit={this.onGetOctokit}
          />
        </header>
        <section className="Orgs__Component column">
          <Orgs
            octokit={this.state.octokit}
            onSetOrg={this.onSetOrg}
          />
        </section>
        <section className={"Teams__Component column " + (this.state.org ? 'show' : 'hidden')}>
          <Teams 
            octokit={this.state.octokit}
            org={this.state.org}
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
            org={this.state.org}
            octokit={this.state.octokit}
          />
        </section>
        <section className="Search__Component">
          <Search />
        </section>

        {/* <section className={"User__Component " + (this.state.teams.length ? 'show' : 'hidden')}>
          <User
            octokit={this.state.octokit}
            teamIds={this.state.teams}
          />
        </section> */}
      </div>
    );
  }
}

export default App;
