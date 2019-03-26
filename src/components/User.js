import React, { Component} from 'react';
import Pagination from 'rc-pagination';
import 'rc-pagination/assets/index.css';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            teamMembers: [],
            octokit: null,
            teamIds: [],
            currentPage: 1,
            current: 1,
            totalTeamMembers: 25
        }
    }

    async fetchUsers(octokit, teamIds, page) {
        let allUsers = []
        let logins = []
        let totalTeamMembers = 0
        for (let teamId of teamIds) {
            const result = await octokit.teams.listMembers({team_id: teamId, role: 'member', per_page: 5, page: page});
            if (this.state.current === 1) {
                const team = await octokit.teams.get({team_id: teamId});
                totalTeamMembers += team.data.members_count;
            }
            logins = result.data.map(a => a.login)
            logins.push(teamId);
        }
        if (this.state.current === 1) {
            this.setState({
                totalTeamMembers: totalTeamMembers
            });
        }
        for (let username of logins) {
            if (typeof username === 'string') {
                const userObj = await octokit.users.getByUsername({username: username});
                console.log(userObj);
                allUsers.push(userObj.data);
            }

        }

        this.setState({
            teamMembers: allUsers
        });
    }

    renderUsers() {
        const userList = this.state.teamMembers.map((member) => {
            return (
                <li key={member.id} className="team-member-details">
                    <p>{member.login}</p>
                    <p>{member.name}</p>
                    <p>{member.email}</p>
                    <p>{member.company}</p>
                    <img alt="team member" src={`${member.avatar_url}`} />
                </li>
            )
        });
        return (
            <ul>
                {userList}
            </ul>
        )
    }

    onChange = (page) => {
        this.setState({
            current: page
        });
        this.fetchUsers(this.props.octokit, this.props.teamIds, page);
    }

    renderEmptyState() {
        return (<div>
            <p>Please enter an email to search for the user.</p>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.teamIds !== nextProps.teamIds) {
            this.setState({
                octokit: nextProps.octokit,
                teamIds: nextProps.teamIds
            })
            this.fetchUsers(nextProps.octokit, nextProps.teamIds, 1);
        }
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.state.teamMembers.length ? this.renderUsers() : this.renderEmptyState() }
                <Pagination onChange={this.onChange} current={this.state.current} total={this.state.totalTeamMembers} defaultPageSize={5}/>
            </div>
        )
    }


}

export default User;