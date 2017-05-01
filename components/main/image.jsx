import React from 'react';
import { observer } from 'mobx-react';

@observer
class Avatar extends React.Component {

  constructor(props) {
    super(props);
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.props.model.file = file,
      this.props.model.imagePreviewUrl = reader.result
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.props.model;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select your photo for preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
        <label className="uploadbutton">
            <span>Upload photo</span>
            <div className="ui secondary button">Browse</div>
          <input 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
        </label>
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default Avatar;