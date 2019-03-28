import React, { Component } from 'react';

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emailsToSend: [],
            teamsToJoin: [],
            org: ""
        }
    }

    async sendInvites(octokit) {
        for (let email of this.state.emailsToSend) {
            try {
                email = email.replace(/\s/g, '');
                await octokit.orgs.createInvitation({
                    headers: {
                        Accept: "application/vnd.github.dazzler-preview+json"
                    },
                    org: this.state.org,
                    email: email,
                    team_ids: this.state.teamsToJoin
                })
            } catch(err) {
                console.log(err.errors);
            }
        }
    }

    handleSubmit() {
        this.sendInvites(this.props.octokit);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.emails !== nextProps.emails) {
            this.setState({
                emailsToSend: nextProps.emails,
                teamsToJoin: nextProps.teams,
                org: nextProps.org
            });
        }
    }

    render() {
        return (
            <section>
                <h2>Send Invites</h2>
                <button onClick={this.handleSubmit.bind(this)}>Send Invites</button>
            </section>
        )
    }
}

export default TeamList;