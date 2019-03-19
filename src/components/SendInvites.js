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
        for (const email of this.state.emailsToSend) {
            console.log(email);
            const result = await octokit.orgs.createInvitation({
                headers: {
                    Accept: "application/vnd.github.dazzler-preview+json"
                },
                org: this.state.org,
                email: email,
                team_ids: this.state.teamsToJoin
            });
            console.log(result);
        }
    }

    handleSubmit() {
        console.log("handle submit");
        this.sendInvites(this.props.octokit);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.emails !== nextProps.emails) {
            this.setState({
                emailsToSend: nextProps.emails,
                teamsToJoin: nextProps.teams,
                org: nextProps.org
            });
            console.log(nextProps.teams);
            console.log(nextProps.emails);
        }
    }

    render() {
        return (
            <section>
                <button onClick={this.handleSubmit.bind(this)}>Send Invites</button>
            </section>
        )
    }
}

export default TeamList;