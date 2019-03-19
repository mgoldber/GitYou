import React, { Component } from 'react';

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            teams: [],
            selectedTeams: []
        }
    }

    async fetchTeams(octokit) {
        const result = await octokit.teams.list({org:'HackerYou'});
        console.log(result.data);
        this.setState({
            teams: result.data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSetTeams(this.state.selectedTeams);
    }

    handleSelectChange(event) {;
        this.state.selectedTeams.push(parseInt(event.target.value));
    }

    renderTeams() {
        const teamList = this.state.teams.map((team) => {
            return (
                <li key={team.node_id}>
                    <input type="checkbox" name="team" value={team.id} onChange={this.handleSelectChange}/>{team.name}
                </li>
            )
        });
        return (
            <ul>
                {teamList}
            </ul>
        )
    }

    renderEmptyState() {
        return (<div>
            <p>Please login to see teams</p>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.octokit !== nextProps.octokit) {
            this.fetchTeams(nextProps.octokit)
        }
    }

    render() {
        return (
            <div>
                {this.state.teams.length ? this.renderTeams() : this.renderEmptyState() }
                <button onClick={this.handleSubmit.bind(this.props.onSetEmails)}>Next</button>
            </div>
        )
    }
}

export default TeamList;