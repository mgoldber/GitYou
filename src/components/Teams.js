import React, { Component } from 'react';

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            teams: []
        }
    }

    async fetchTeams(octokit) {
        const result = await octokit.teams.list({org:'HackerYou'});
        console.log(result.data);
        this.setState({
            teams: result.data
        })
    }
    
    renderTeams() {
        const teamList = this.state.teams.map((team) => {
            return (
                <form key={team.node_id}>
                    <input type="checkbox" name="team" value={team.name}></input>{team.name}
                </form>
            )
        });
        return (
            <div>{teamList}</div>
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
            <section>
                {this.state.teams.length ? this.renderTeams() : this.renderEmptyState() }
            </section>
        )
    }
}

export default TeamList;