import React from 'react'
import e from '../../../../../langs'

import {
    CreateGroupWrapper,
    FormPanelWrapper,
    GroupNameInputWrapper,
    GroupNameInput,
    GroupCreateButtonWrapper,
} from './styledComponents'

import TopBar from '../../../../modules/components/TopBar'
import TopPanel from './topPanel'
import InfoPanel from '../infoPanel'

import {MetallicButtonWrapper, MetallicButton} from '../../../../modules/components/MetallicButton'
import url from "../../../../../constants/urlConstants";
import b64toBlob from '../../../../../services/b64toBlob'
const resizeImage = require('resize-image');

class ChangeGroup extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        name: '',
        file: '',
        imagePreviewUrl: '',
        isInfoPanelOpen: false,
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language);
    }

    resize = (imgData, callback, width = 200, height = 100) => {
        let img = new Image();
        let data = null;
        img.onload= function () {
            const contentType = resizeImage.JPEG;
            data = resizeImage.resize(img, width, height, contentType);
            typeof callback === 'function' && callback(data);
        };
        img.src = imgData;
    }

    handleImageChange = (e) => {
        e.preventDefault();
        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            const contentType = reader.result.split(':')[1].split(';')[0];
            this.resize(reader.result, (imgBase64) => {
                const imgData = imgBase64.split(',')[1];
                let blob = b64toBlob(imgData, contentType);
                this.setState({
                    file: blob,
                    imagePreviewUrl: reader.result
                });
            });
        }

        reader.readAsDataURL(file)
    }

    updateGroupHandler = () => {
        let name = this.state.name || this.props.currentGroup.name;
        const file = this.state.file;

        // todo: временный вариант для сортировки групп
        name = JSON.stringify({name, type: this.props.groupType});

        if (name && file) {
            this.props.groupUpdate(name, file);
        } else if (name) {
            this.props.groupUpdate(name);
        } else {
            window.notification.alert(e.group_attention, e.group_enterTheNameOfTheGroup, 'Ok', () => {})
        }
    }

    onNameChangeHandler = (e) => {
        const value = e.target.value;
        this.setState({name: value});
    }

    openInfoPanel = () => {
        this.setState({isInfoPanelOpen: true})
    }

    closeInfoPanel = () => {
        this.setState({isInfoPanelOpen: false})
    }

    goToDetails = () => {
        this.props.history.push(url.groups.details)
    }

    openCamera = () => {
        if (window.navigator.camera) {
            const options = {
                destinationType: 0, //data-url
                encodingType: 1,    //png
                sourceType: navigator.camera.PictureSourceType.CAMERA
            }

            window.navigator.camera.getPicture((imageData) => {
                const contentType = 'image/png';
                const blob = b64toBlob(imageData, contentType);
                this.setState({
                    file: blob,
                    imagePreviewUrl: options.destinationType === 0 ? "data:image/png;base64," + imageData : imageData
                });

            }, (error) => {
                console.log('error', error);
            }, options);
        }
    }

    getCurrentName = (name) => {
        let correctName = name;

        try{
            correctName = JSON.parse(name).name;
        }catch(e){
            console.log(e.message);
        }

        return correctName !== undefined ? correctName : name;
    }

    render() {
        return (
            <CreateGroupWrapper>
                <TopBar
                    back={this.props.back}
                    caption={e.group_changeGroupProfile}
                />
                <TopPanel
                    handleImageChange={this.handleImageChange}
                    currentImgSrc={this.props.currentGroup.image}
                    cdnMedia={this.props.cdnMedia}
                    imgSrc={this.state.imagePreviewUrl || `${this.props.currentGroup && this.props.currentGroup.image ? this.props.cdnMedia + this.props.currentGroup.image : ''}`}
                    openInfoPanel={this.openInfoPanel}
                    openCamera={this.openCamera}
                />

                <FormPanelWrapper>
                    <GroupNameInputWrapper>
                        <GroupNameInput
                            onChange={this.onNameChangeHandler}
                            value={this.state.name || this.getCurrentName(this.props.currentGroup.name)}
                            placeholder='group name'
                        />
                    </GroupNameInputWrapper>
                    <GroupCreateButtonWrapper>
                        <MetallicButtonWrapper>
                            <MetallicButton onClick={this.updateGroupHandler}>
                                {e.group_send}
                            </MetallicButton>
                        </MetallicButtonWrapper>
                    </GroupCreateButtonWrapper>
                </FormPanelWrapper>
                <InfoPanel
                    onCloseHandler={this.closeInfoPanel}
                    isOpen={this.state.isInfoPanelOpen}
                    title='Info'
                    titleStyle={{color: 'rgb(255,127,0)'}}
                    noTitlePicture
                    language={this.props.language}
                >
                    <div>text</div>
                </InfoPanel>
            </CreateGroupWrapper>
        )
    }
}

export default ChangeGroup
