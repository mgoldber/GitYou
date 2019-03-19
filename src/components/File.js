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

    handleFileRead = (e) => {
        let content = fileReader.result;
        console.log(content);
        const allEmails = content.split(",");
        console.log(allEmails);
        this.props.onSetEmails(allEmails);
        this.setState({
            emails: allEmails
        });
    }

    handleFiles = (files) => {
        console.log(files);
        fileReader = new FileReader();
        fileReader.onloadend = this.handleFileRead;
        fileReader.readAsText(files[0]);
    }

    render() {
        return (
            <ReactFileReader fileTypes={['.txt']} multipleFiles={false} handleFiles={this.handleFiles}>
                <button className='btn'>Upload</button>
            </ReactFileReader>
        )
    }
}

export default File;