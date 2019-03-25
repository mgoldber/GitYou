import React, { Component} from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            teamMembers: [],
            currentPage: 1
        }
    }

    async fetchUsers(octokit, teamIds) {
        let allUsers = []
        let logins = []
        console.log(teamIds);
        for (let teamId of teamIds) {
            const result = await octokit.teams.listMembers({team_id: teamId, role: 'member', per_page: 5, page: this.state.currentPage});
            console.log(result);
            logins = result.data.map(a => a.login)
            logins.push(teamId);
            console.log(logins);
            // allUsers.push(logins);
        }
        // console.log(allUsers);
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
        // Use RemoveMembership endpoint on Teams
    }

    renderUsers() {
        console.log(this.state.teamMembers);
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

    renderEmptyState() {
        return (<div>
            <p>Please enter an email to search for the user.</p>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        console.log(nextProps);
        if (this.props.teamIds !== nextProps.teamIds) {
            this.fetchUsers(nextProps.octokit, nextProps.teamIds);
        }
    }

    render() {
        return (
            <div>
                <h2>Users</h2>
                {this.state.teamMembers.length ? this.renderUsers() : this.renderEmptyState() }
            </div>
        )
    }


}

export default User;