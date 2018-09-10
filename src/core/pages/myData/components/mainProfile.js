import React from 'react'
import e from '../../../../langs'
import TopBar from '../../../modules/components/TopBar'
import styled from 'styled-components'
import moment from 'moment'
import { Link } from 'react-router-dom'
import {withRouter} from 'react-router-dom'
import url from '../../../../constants/urlConstants'

import CountrySelector from '../../../modules/components/CountrySelector'
import { MetallicButton, MetallicButtonWrapper } from '../../../modules/components/MetallicButton'
import { SeparatorLine } from '../../../modules/components/AuthComponents'
import ProfilePicture from '../../../modules/components/ProfilePicture/ProfilePictureContainer'
import Countries from "country-list";
import InfoPanel from '../../tombola/components/infoPanel'
import b64toBlob from "../../../../services/b64toBlob";

const resizeImage = require('resize-image');

const ProfileWrapper = styled.div`
    overflow: hidden;
    height: 1236px;
    max-height: 1236px;
    position: relative;
    .scrollable-wrapper{
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px;
        overflow-y: scroll;
        @media (max-width: 768px) {
            right: 0;
        }
    }
`

const ProfileTopZone = styled.div`
    z-index: 2;
    position: relative;
    height: 400px;
    background-color: #232324;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.7);
`

const ProfileImageWrapper = styled.div`
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 340px;
    height: 340px;
    background-image: linear-gradient(to top, #767575, #111111);
    border: solid 2px #605f5f;
    border-radius: 50%;
    margin: auto;
    .photoBlock{
        width: 260px;
        transform: scale(1.5);
        .glass{
            top: 0px;
            left: 60px;
        }
        p{
            bottom: 10px;
        }
    }

`

const ProfileFormWrapper = styled.div`
    padding: 45px 0;
    text-align: center;
    position: relative;
    min-height: 835px;
    background-color: #ececec;
    box-shadow: 0px 4px 8px 0 rgba(0, 0, 0, 0.4);
    border: solid 1px #c9c9c9;
    z-index: 1;
`
const InfoProfileButton = styled.img`
    position: absolute;
    cursor: pointer;
    right: 45px;
    top: 45px;
`

const RefreshProfileButton = styled.img`
    position: absolute;
    cursor: pointer;
    right: 45px;
    bottom: 90px;
`

const ProfilBildLink = styled.div`
    position: absolute;
    right: 40px;
    bottom: 30px;
    font-size: 32px;
    font-weight: 500;
    font-stretch: condensed;
    color: #ff9500;
    text-transform: capitalize;
`

const ProfileFormInput = styled.div`
    position: relative;
    margin: auto;
    width: 640px;
    text-align: center;
    margin-bottom: 20px;
    a{
        cursor: pointer;
        position: absolute;
        right: 10px;
        top: 70px;
        height: 32px;
    }
    img{
        height: 32px;
    }
    p{
        margin-top: 0;
        font-size: 40px;
        color: #818181;
        text-align: left;
        margin-bottom: 5px;
        padding-left: 10px;
    }
    input[type="text"],input[type="password"]{
        box-sizing: border-box;
        width: 640px;
        height: 70px;
        border-radius: 16px;
        background-color: #ffffff;
        border: solid 2px #818181;
        font-size: 40px;
        font-family: Calibri;
        color: #333333;
        padding: 0 30px;
    }
`

const ProfileButtonsBlock = styled.div`
    margin: auto;
    margin-bottom: 25px;
    width: 640px;
    height: 150px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const ProfileButton = styled.button`
	border: none;

	width: 160px;
	height: 85px;
	border-radius: 8px;
  	background-image: linear-gradient(305deg, #ffffff, #efefef);
  	//box-shadow: 0px -4px 0px #e0e0e0;
  	box-shadow: -6px 6px 8px 0 rgba(0, 0, 0, 0.35), 0 -4px 0 white, 0 -8px 0 #e0e0e0;

  	display: flex;
  	justify-content: center;
	align-items: center;

  	&::after {
  		content: '';
  		width: 85px;
  		height: 70px;
  		background: url(${props => props.img}) center no-repeat;
  	}

  	&:active {
  		box-shadow: -2px 2px 3px 0 rgba(0, 0, 0, 0.35);
  		background: linear-gradient(to bottom, #ffffff, #efefef);

  		&::after {
  			transform: translate(0, 1px);
  		}
  	}

	&:focus {
		outline: none;
	}
`

const ProfileButtonWrapper = styled.div`
	width: 188px;
	height: 112px;
	border-radius: 18px;
	background-image: linear-gradient(to top, #f8f8f8, #d0cece);
	border: solid 2px #f2f2f2;

	display: flex;
	justify-content: center;
	align-items: center;
`

const SubmitButtonBlock = styled.div`
    margin: 35px 0;
`

const DynamicButton = styled(MetallicButton)`
    pointer-events:  ${props => props.pointerEvents};
    color: ${props => props.color};
`

const CameraAndButton = styled.div`
    display: none;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    bottom: 0;
    z-index: 2;
    width: 100%;
    justify-content: space-between;
    &.visible {
      display: flex;
    }
`

const Button = styled.div`
    width: 270px;
    height: 100px;
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    color: #333333;
    border-top: 2px solid #818181;
    cursor: pointer;
`

const CameraButton = styled(Button)`
    border-right: 2px solid #818181;
    border-top-right-radius: 20px;
`

const PhotoButton = styled(Button)`
    border-left: 2px solid #818181;
    border-top-left-radius: 20px;
`

class MainProfile extends React.Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)

        this.state = {
            sex: '',
            firstName: '',
            lastName: '',
            nickname: '',
            email: '',
            phone: '',
            city: '',
            country: '',
            postalCode: '',
            street: '',
            birthDate: '',
            canSendInfo: false,
            imagePreviewUrl: ''
        }

        this.counties = new Countries()
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentDidMount(){
        const { firstName, lastName, sex, nickname, email, phone  } = this.props
        const { city, country, postalCode, street } = this.props.address
        let birthDate = ''
        if(this.props.birthDate){
            // birthDate = moment(this.props.birthDate).format('DD.MM.YYYY')
	        const newDateArray = this.props.birthDate.split(/[T-]/);
	        birthDate = `${newDateArray[2]}.${newDateArray[1]}.${newDateArray[0]}`;
        }

        this.setState({
            sex: sex,
            firstName: firstName || '',
            lastName: lastName || '',
            nickname: nickname || '',
            email: email || '',
            phone: phone || '',
            city: city || '',
            country: country || '',
            postalCode: postalCode || '',
            street: street || '',
            birthDate: birthDate || ''
        })
    }

    setMail = () => {
        this.setState({sex: 'M', canSendInfo: true})
    }

    setFemail = () => {
        this.setState({sex: 'F', canSendInfo: true})
    }

    inputHandler = (type, value) => {
    	let pv = value;

    	if(type === 'birthDate') {
		    const reg = /(\d{1,2})(\d{1,2})(\d{2,4})/igm;

		    pv = value.match(/[0-9]/img, '');
		    pv = pv ? pv.join('') : '';
		    pv = pv.slice(0, 8);
		    pv = pv.replace(reg, '$1.$2.$3');
	    }

        if(pv !== this.props[type] && !this.state.canSendInfo){
            this.setState({canSendInfo: true})
        }
        this.setState({ [type]: pv })
    }

    countryHandler = (ev) => {
        this.inputHandler('country', ev)
    }

    submit = () => {
        const submitObject = {
            profile:{
                person: {},
                address: {}
            },

        }

        let error = false

        if(this.state.sex){
            submitObject.profile.person.sex = this.state.sex
        }
        if(this.state.firstName && this.state.firstName !== this.props.firstName){
            submitObject.profile.person.firstName = this.state.firstName
        }
        if(this.state.lastName  && this.state.lastName !== this.props.lastName){
            submitObject.profile.person.lastName = this.state.lastName
        }
        if(this.state.nickname && this.state.nickname !== this.props.nickname){
            submitObject.profile.person.nickname = this.state.nickname
        }
        if(this.state.city && this.state.city !== this.props.address.city){
            submitObject.profile.address.city = this.state.city
        }
        if(this.state.country && this.state.country !== this.props.address.country){
            submitObject.profile.address.country = this.state.country
        }
        if(this.state.postalCode && this.state.postalCode !== this.props.address.postalCode){
            submitObject.profile.address.postalCode = this.state.postalCode
        }
        if(this.state.street && this.state.street !== this.props.address.street){
            submitObject.profile.address.street = this.state.street
        }
        if(this.state.birthDate && this.state.birthDate !== this.props.birthDate){
            // 1993-03-04T21:00:00.000Z
            let bd = moment(this.state.birthDate, 'DD.MM.YYYY', true);
	        const nowWithoutOneYear = moment().subtract(1, 'year').toISOString();

            if(!bd.isValid() || bd.isAfter(nowWithoutOneYear) || bd.isBefore('01.01.1900')) {
                error = true;
                window.notification.alert(e.mydata_attention, e.mydata_wrongBirthDate, 'Ok', () => {
                	this.birthDate.focus();
                })
            }else {
	            submitObject.profile.person.birthDate = bd.format('YYYY-MM-DDT21:00:00.000Z')
            }
        }


        if(!error){
            this.props.updateProfile(submitObject, 'setProfileData')
        }
    }

    checkMailVerify = () => {
        if(this.props.roles && this.props.roles.indexOf('REGISTERED') !== -1){
            return true;
        }
        return false
    }

    verifyEmail = () => {
        this.props.history.push('/profile/email/verification')
    }

    close = () => {
        this.props.history.push('/dashboard')
    }

    getCountryList = () => {
        const countries = new Countries()
        const list = countries.getCodes()
        let countriesList = list.map((item) => {
            return(
                {text: countries.getName(item), value: item}
            )
        })
        return countriesList
    }

    toggleInfoPanel = () => {
        this.setState(({isInfoPanelOpen}) => ({isInfoPanelOpen: !isInfoPanelOpen}))
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

    uploadFile = (url, params) => {
        const data = new FormData()
        for (let key in params) {
            if (params.hasOwnProperty(key)) {
                data.append(key, params[key])
            }
        }
        return fetch(url, {
            method: 'POST',
            mode: 'cors',
            body: data,
            headers: {
                'Accept': 'application/json, text/plain, */*',
            }
        })
    }

    updateProfilePicture = () => {
        let params = {
            token: this.props.token,
            action: "update",
            media_file: this.state.file,
        };

        const url = this.props.urlMediaService + "updateProfilePicture";
        this.uploadFile(url, params)
            .then((response) => response.json())
            .then((json) => {
                if (json.content) {
                    const salt = Math.random().toString(36).replace(/[^a-z]+/g,  "").substr(0, 5);

                    localStorage.setItem('avatarImage',`${json.content.profile.id}?${salt}`);
                    window.notification.alert(e.mydata_attention, e.mydata_pictureIsUploaded, e.maydata_ok, () => {})
                }
            })
    }

    mobileHandleImageChange = (option) => {
        const self = this
        const source = (option === "camera") ? window.Camera.PictureSourceType.CAMERA : window.Camera.PictureSourceType.PHOTOLIBRARY
        navigator.camera.getPicture(onSuccess, onFail, {
            quality: 50,
            destinationType: window.Camera.DestinationType.DATA_URL,
            encodingType: navigator.camera.EncodingType.JPEG,
            correctOrientation: true,
            sourceType: source
        })

        function onSuccess(imageData) {
            self.toggleMobileUpdateButtons()
            const result = "data:image/jpeg;base64," + imageData;
            const contentType = result.split(':')[1].split(';')[0];
            self.resize(result, (imgBase64) => {
                const imgData = imgBase64.split(',')[1];
                let blob = b64toBlob(imgData, contentType);
                self.setState({
                    file: blob,
                    imagePreviewUrl: result
                });
                self.updateProfilePicture();
            });
        }

        function onFail(message) {
            console.log(message)
        }
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
                this.updateProfilePicture();
            });
        }

        reader.readAsDataURL(file)
    }

    isPlatformEqualsMobile = () => {
        return window.navigator.userAgent.includes("Android") || window.navigator.userAgent.includes("iPhone")
    }

    toggleMobileUpdateButtons = () => {
        const div = this.androidButtonsRef
        div.classList.toggle('visible')
    }

    render(){
        const {country} = this.state
        const text = this.counties.getName(country)
        const items = this.getCountryList()
        const isMobile = this.isPlatformEqualsMobile()
        return(
            <div>
                <CameraAndButton innerRef={elem => this.androidButtonsRef = elem}>
                    <CameraButton onClick={() => this.mobileHandleImageChange('camera')}>Camera</CameraButton>
                    <PhotoButton onClick={() => this.mobileHandleImageChange('photo')}>Photolibrary</PhotoButton>
                </CameraAndButton>
                <TopBar caption={e.mydata_myData} close={this.close}/>
                <ProfileWrapper>
                    <div className='scrollable-wrapper'>
                        <ProfileTopZone>
                            <InfoProfileButton onClick={this.toggleInfoPanel} src='images/info-button.png' />

                            <ProfileImageWrapper>
                                <ProfilePicture imgSrc={this.state.imagePreviewUrl} size={284} />
                            </ProfileImageWrapper>

                            <label className="needsclick">
                                <RefreshProfileButton src='images/update.png'
                                                      className="needsclick"
                                                      onClick={isMobile ? this.toggleMobileUpdateButtons : null} />
                                {
                                    isMobile ?
                                        null
                                        :
                                        <input
                                            type='file'
                                            style={{display: 'none'}}
                                            onChange={this.handleImageChange}
                                            className="needsclick"
                                        />
                                }
                            </label>

                            <ProfilBildLink>{e.mydata_profilePicture}</ProfilBildLink>
                        </ProfileTopZone>
                        <ProfileFormWrapper>
                            <ProfileFormInput>
                                <p>{e.mydata_firstName}</p>
                                <input onChange={(e) => {this.inputHandler('firstName', e.target.value)}} value={this.state.firstName} type='text'/>
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.mydata_surname}</p>
                                <input onChange={(e) => {this.inputHandler('lastName', e.target.value)}} value={this.state.lastName} type='text'/>
                            </ProfileFormInput>
                            <ProfileButtonsBlock>

                                <ProfileFormInput>
                                    <p>{e.mydata_male}</p>
                                    <ProfileButtonWrapper>
                                        <ProfileButton img={this.state.sex === 'M' ? 'images/man-active.png' : 'images/man.png'} onClick={this.setMail} />
                                    </ProfileButtonWrapper>
                                </ProfileFormInput>
                                <ProfileFormInput style={{marginRight: '190px'}}>
                                    <p>{e.mydata_female}</p>
                                    <ProfileButtonWrapper>
                                        <ProfileButton img={this.state.sex === 'F' ? 'images/woman-active.png' : 'images/woman.png'} onClick={this.setFemail} />
                                    </ProfileButtonWrapper>
                                </ProfileFormInput>

                            </ProfileButtonsBlock>
                            <ProfileFormInput>
                                <p>{e.mydata_birthday}</p>
                                <input
	                                onChange={(e) => {this.inputHandler('birthDate', e.target.value)}}
	                                value={this.state.birthDate}
	                                type='text'
	                                ref={(birthDate) => this.birthDate = birthDate}
                                />
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.madata_streetHouseNumber}</p>
                                <input onChange={(e) => {this.inputHandler('street', e.target.value)}} value={this.state.street} type='text'/>
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.mydata_postcode}</p>
                                <input onChange={(e) => {this.inputHandler('postalCode', e.target.value)}} value={this.state.postalCode} type='text'/>
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.mydata_placeOfResidence}</p>
                                <input onChange={(e) => {this.inputHandler('city', e.target.value)}} value={this.state.city} type='text'/>
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.mydata_country}</p>
                                <CountrySelector onChange={this.countryHandler} value={country} text={text} items={items}/>
                            </ProfileFormInput>
                            <SubmitButtonBlock>
                                <MetallicButtonWrapper>
                                    <DynamicButton
	                                    pointerEvents={this.state.canSendInfo ? 'all' : 'none' }
	                                    color={this.state.canSendInfo ? '#ff7f00;' : '#b4b4b4' }
	                                    onClick={this.submit}
                                    >
                                        {e.mydata_send}
                                    </DynamicButton>
                                </MetallicButtonWrapper>
                            </SubmitButtonBlock>
                            <SeparatorLine style={{margin: '30px auto'}} width='610px' bgcolor='#c6c6c6' borderBottomColor='rgb(255, 255, 255)'/>
                            <ProfileFormInput>
                                <p>{e.mydata_username}</p>
                                <Link to={url.profile.nickname}><img alt='' src='images/voucher-arrow-right.png'/></Link>
                                <input style={{pointerEvents: 'none'}} value={this.props.nickname} onChange={()=>{}} type='text'/>
                            </ProfileFormInput>
                            <ProfileFormInput>
                                <p>{e.mydata_email}</p>
                                {
                                    this.checkMailVerify() ?
                                        <input style={{pointerEvents: 'none', backgroundColor: 'white'}} defaultValue={this.props.email} type='text'/>
                                    :
                                        <input onClick={this.verifyEmail} style={{cursor: 'pointer', backgroundColor: '#ffbcd1'}} defaultValue={this.props.email} type='text'/>
                                }
                                {/* <Link to={profile.email.veriication}><img src='images/voucher-arrow-right.png'/></Link> */}

                            </ProfileFormInput>
                            {/* <ProfileFormInput>
                                <p>Mobil Nummer</p>
                                 <Link to={profile.phone}><img src='images/voucher-arrow-right.png'/></Link>
                                <input style={{pointerEvents: 'none'}} defaultValue={this.props.phone} type='text'/>
                            </ProfileFormInput> */}
                            <ProfileFormInput>
                                <p>{e.mydata_password}</p>
                                <Link to={url.profile.password}><img alt='' src='images/voucher-arrow-right.png'/></Link>
                                <input style={{pointerEvents: 'none'}} defaultValue='qweqweqe' type='password'/>
                            </ProfileFormInput>
                        </ProfileFormWrapper>
                    </div>
                    <InfoPanel
                        title={e.mydata_myData}
                        isOpen={this.state.isInfoPanelOpen}
                        onCloseHandler={this.toggleInfoPanel}
                        noTitlePicture
                    >
                        {
                            `Any text`
                        }
                    </InfoPanel>
                </ProfileWrapper>
            </div>
        )
    }
}

export default withRouter(MainProfile)
