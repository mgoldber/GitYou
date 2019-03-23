import React, { Component} from 'react';

class User extends Component {

    constructor(props) {
        super(props);
        this.state = {
            users: [],
            teamMembers: []
        }
    }

    async fetchUser(octokit) {
        const result = await octokit.teams.listMembers({team_id: 3021794});
        console.log(result);
        this.setState({
            teamMembers: result.data
        });
        // for (const user of result.data) {
        //     const userObj = await octokit.users.getByUsername({username: user.login})
        //     console.log(userObj);
        //     console.log(userObj.data.name);
        //     console.log(userObj.data.login);
        //     console.log(userObj.data.email);
        //     console.log("~~~~~~~")
        // }
        // Use RemoveMembership endpoint on Teams
    }

    renderUser() {

    }

    renderEmptyState() {
        return (<div>
            <p>Please enter an email to search for the user.</p>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.octokit !== nextProps.octokit) {
            this.fetchUser(nextProps.octokit);
        }
    }

    render() {
        return (
            <div>
                <h2>User</h2>
                {this.state.users.length ? this.renderUser() : this.renderEmptyState() }

            </div>
        )
    }


}

export default User;