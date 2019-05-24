import React from 'react';
import ImageUploader from 'react-images-upload';
 
class ReactFileUpload extends React.Component {
 
    constructor(props) {
        super(props);
         this.state = { pictures: [] };
         this.onDrop = this.onDrop.bind(this);
    }
 
    onDrop(picture) {

      console.log(picture);
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });
    }
 
    render() {
        return (
            <ImageUploader
                label = ''
                withIcon={false}
                buttonText='upload'
                onChange={this.onDrop}
                imgExtension={['.jpg', '.gif', '.png', '.gif']}
                maxFileSize={5242880}
            />
        );
    }
}

export default ReactFileUpload;