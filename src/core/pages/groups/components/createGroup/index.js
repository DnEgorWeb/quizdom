import React from 'react'
import e from '../../../../../langs'


import url from '../../../../../constants/urlConstants'

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
import b64toBlob from '../../../../../services/b64toBlob'
const resizeImage = require('resize-image');

class CreateGroup extends React.Component {
    constructor(props){
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
            const contentType = imgData.split(':')[1].split(';')[0].split('/')[1];
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

    createGroupHandler = () => {
        let {name, file, imagePreviewUrl} = this.state;

        ////////////////////////////////////////////////
        // todo: временный вариант для сортировки групп
        const { typeOfGroupCreate } = this.props;
        const nameWithPostfix = JSON.stringify({name, type: typeOfGroupCreate});
        ////////////////////////////////////////////////


        if (name && file) {
            this.props.groupCreate(nameWithPostfix, file, imagePreviewUrl);
        } else if (name) {
            this.props.groupCreate(nameWithPostfix);
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

    goToTournamentGroup = () => {
        this.props.history.push(url.groups.tournament)
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

    render() {
        return (
            <CreateGroupWrapper>
                <TopBar
                    back={this.props.back}
                    caption={e.group_newGroup}
                />
                <TopPanel
                    handleImageChange={this.handleImageChange}
                    imgSrc={this.state.imagePreviewUrl}
                    openInfoPanel={this.openInfoPanel}
                    openCamera={this.openCamera}
                />

                <FormPanelWrapper>
                    <GroupNameInputWrapper>
                        <GroupNameInput
                            onChange={this.onNameChangeHandler}
                            placeholder={e.group_groupName}
                        />
                    </GroupNameInputWrapper>
                    <GroupCreateButtonWrapper>
                        <MetallicButtonWrapper>
                            <MetallicButton onClick={this.createGroupHandler}>
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

export default CreateGroup
