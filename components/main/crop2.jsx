import React from 'react'
import AvatarEditor from 'react-avatar-editor';
import {Button} from 'semantic-ui-react'

class MyEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      src: '/assets/images/avatar/large/matthew.png',
      scale: 1
    };
  }

  onClickSave = () => {
    // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
    // drawn on another canvas, or added to the DOM.
    const canvas = this.editor.getImage();

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = this.editor.getImageScaledToCanvas();

    this.props.model.thumb = canvasScaled.toDataURL();

    if (typeof canvasScaled.toBlob !== "undefined") {
      canvasScaled.toBlob(blob => {
        this.props.model.file = blob;
        this.props.model.skip = true;

      }, "image/png", 0.75);
    } else if (typeof canvasScaled.msToBlob !== "undefined") {
      var blob = canvasScaled.msToBlob()
      this.props.model.file = blob;
      this.props.model.skip = true;
    }

  }

  onClickNext = () => this.props.model.skip = true

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  onChange = e => {
    this.setState({src: null, scale: 1});
    this.props.model.thumb = null;
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({src: reader.result});
    };
    reader.readAsDataURL(files[0]);
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({scale})
  }

  render() {
    return (
      <div className="avatarUploadBox">
        <span>Upload photo</span>
        <div style={{
          overflow: 'auto'
        }}>
          <div>
            <div className="underAvatarUploader">
              <AvatarEditor ref={this.setEditorRef} image={this.state.src} width={250} height={250} border={5} scale={parseFloat(this.state.scale)}/>
            </div>
            <label className="uploadbutton">
              <div className="ui secondary button">Browse</div>
              <input type="file" onChange={this.onChange}/>
            </label>
            <div className="ui compact segment">
              <input name='scale' type='range' onChange={this.handleScale} min='1' max='2' step='0.01' defaultValue='1'/>
            </div>
            <Button className="BottomLeftPosition" content='Upload' icon='upload' primary labelPosition='right' onClick={this.onClickSave}/>
            <Button className="BottomRightPosition" content='Skip' onClick={this.onClickNext} floated="right" icon='right arrow' labelPosition='right' />
          </div>
        </div>

      </div>
    )
  }
}

export default MyEditor
