import React, {Component} from 'react'
import {DropzoneArea} from 'material-ui-dropzone'

class DropzoneAreaExample extends Component{
  constructor(props){
    super(props);
    this.state = {
      files: []
    };
  }
  handleChange(files){
      console.log(files)
    this.setState({
      files: files
    });
  }
  render(){
    return (
      <DropzoneArea
        onChange={this.handleChange.bind(this)}
        maxFileSize={5000000}
        filesLimit={1}
        acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}


        />
    )
  }
}

export default DropzoneAreaExample;