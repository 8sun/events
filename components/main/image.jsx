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
      this.props.Model.file = file,
      this.props.Model.imagePreviewUrl = reader.result
    }

    reader.readAsDataURL(file)
  }

  render() {
    let {imagePreviewUrl} = this.props.Model;
    let $imagePreview = null;
    if (imagePreviewUrl) {
      $imagePreview = (<img src={imagePreviewUrl} />);
    } else {
      $imagePreview = (<div className="previewText">Please select your photo for preview</div>);
    }

    return (
      <div className="previewComponent">
        <form onSubmit={(e)=>this._handleSubmit(e)}>
          <input className="btn btn-success" 
            type="file" 
            onChange={(e)=>this._handleImageChange(e)} />
        </form>
        <div className="imgPreview">
          {$imagePreview}
        </div>
      </div>
    )
  }
}
  
export default Avatar;