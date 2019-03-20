import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';

let fileReader;

class File extends Component {

    constructor(props) {
        super(props);
        this.handleFileRead = this.handleFileRead.bind(this);
        this.state = {
            emails: []
        }
    }

    renderEmails() {
        const emailList = this.state.emails.map((email) => {
            return (
                <li>
                    {email}
                </li>
            )
        });
        return (
            <ul>
                {emailList}
            </ul>
        )
    }

    renderEmptyState() {
        return (<div>
            <p>Please upload file to see emails</p>
        </div>)
    }

    handleFileRead = (e) => {
        let content = fileReader.result;
        const allEmails = content.split(",");
        this.props.onSetEmails(allEmails);
        this.setState({
            emails: allEmails
        });
    }

    handleFiles = (files) => {
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
        fileReader.readAsText(files[0]);
    }

    render() {
        return (
            <div>
                <h2>File Upload</h2>
                <ReactFileReader fileTypes={['.txt']} multipleFiles={false} handleFiles={this.handleFiles}>
                    <button className='btn'>Upload</button>
                </ReactFileReader>
                {this.state.emails.length ? this.renderEmails() : this.renderEmptyState() }
            </div>
        )
    }
}

export default File;