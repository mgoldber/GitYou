import React, { Component } from 'react';

class TeamList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            emails: [],
            teams: []
        }
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.octokit !== nextProps.octokit) {
            
        }
    }

    render() {
        return (
            <section>
            </section>
        )
    }
}

export default TeamList;