import React from 'react'
import AvatarEditor from 'react-avatar-editor';
import { Button } from 'semantic-ui-react'

class MyEditor extends React.Component {

	constructor(props) {
    super(props);
    this.state = {
      src: null,
      cropResult: null,
      scale: 1,
      browse: true,
    };
  }

  onClickSave = () => {
  	this.setState({ src: null });
    // This returns a HTMLCanvasElement, it can be made into a data URL or a blob,
    // drawn on another canvas, or added to the DOM.
    const canvas = this.editor.getImage();

    // If you want the image resized to the canvas size (also a HTMLCanvasElement)
    const canvasScaled = this.editor.getImageScaledToCanvas();

    this.setState({
      cropResult: canvasScaled.toDataURL()
    });

    if (typeof canvasScaled.toBlob !== "undefined") {
	  canvasScaled.toBlob( blob => {
	      	this.props.model.file = blob;
	      	this.setState({browse:false});

	  }, "image/png", 0.75);
	}
	else if (typeof canvasScaled.msToBlob !== "undefined") {
	  var blob = canvasScaled.msToBlob()
	  	this.props.model.file = blob;
	  	this.setState({browse:false});
	}

  }

  setEditorRef = (editor) => {
    this.editor = editor;
  }

  onChange = e => {
  	this.setState({
      src: null,
      cropResult: null,
      scale: 1,
    });
    e.preventDefault();
    let files;
    if (e.dataTransfer) {
      files = e.dataTransfer.files;
    } else if (e.target) {
      files = e.target.files;
    }
    const reader = new FileReader();
    reader.onload = () => {
      this.setState({ src: reader.result });
    };
    reader.readAsDataURL(files[0]);
  }

  handleScale = (e) => {
    const scale = parseFloat(e.target.value)
    this.setState({ scale })
  }

  render () {
    return (
    	<div>
	    	{this.state.browse ?
	    		(<label className="uploadbutton">
	            <span>Upload photo</span>
	            <div className="ui secondary button">Browse</div>
	          	<input type="file" onChange={this.onChange} />
	        </label>) : ''}
    		{this.state.src ?
		        (<div style={{ overflow: 'auto' }}>
		        	<div>
			        	<AvatarEditor
				          ref={this.setEditorRef}
				          image={this.state.src}
				          width={250}
				          height={250}
				          border={10}
				          scale={parseFloat(this.state.scale)}
				        />
				        <br />
				        <div className="ui compact segment">
					        <input
					          name='scale'
					          type='range'
					          onChange={this.handleScale}
					          min='1'
					          max='2'
					          step='0.01'
					          defaultValue='1'/>
			          	</div>
				        <Button content='Next' icon='right arrow' labelPosition='right' onClick={this.onClickSave} />
		          	</div>
	          	</div>) : 
		    	(<div>
          			<img style={{ width: '100px', borderRadius: '50%'}} src={this.state.cropResult} alt="" />
      			</div>)}
        </div>
    )
  }
}

export default MyEditor