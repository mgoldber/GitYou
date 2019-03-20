import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'

class Orgs extends Component {

    constructor(props) {
        super(props);
        this.handleSelectChange = this.handleSelectChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            orgs: [],
            selectedOrg: "" 
        }
    }

    async fetchOrgs(octokit) {
        const result = await octokit.orgs.listForAuthenticatedUser();
        this.setState({
            orgs: result.data
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.onSetOrg(this.state.selectedOrg);
    }

    handleSelectChange(event) {
        this.setState({
            selectedOrg: event.target.value
        })
    }

    renderOrgs() {
        const orgList = this.state.orgs.map((org) => {
            return (
                <li key={org.id}>
                    <input type="radio" name="org" value={org.login} onChange={this.handleSelectChange}/>{org.login}
                </li>
            )
        });
        return (
            <ul>
                {orgList}
            </ul>
        )
    }

    renderEmptyState() {
        return (<div>
            <p>Please login to see orgs</p>
        </div>)
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.octokit !== nextProps.octokit) {
            this.fetchOrgs(nextProps.octokit)
        }
    }

    render() {
        return (
            <div>
                <h2>Organizations</h2>
                {this.state.orgs.length ? this.renderOrgs() : this.renderEmptyState() }
                <button onClick={this.handleSubmit.bind(this.props)}><FontAwesomeIcon icon={faArrowRight} /></button>
            </div>
        )
    }
}

export default Orgs;