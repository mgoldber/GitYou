import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <h2>Search</h2>
                <form>
                    <label>Enter user details and I'll do my best</label>
                    <input></input>
                </form>
            </div>
        )
    }
}

export default Search