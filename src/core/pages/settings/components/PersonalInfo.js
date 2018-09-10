import React, {Component} from 'react'
import e from '../../../../langs'
import styled from 'styled-components'

const NameAddressBlock = styled.div`
    position: relative;
    margin-bottom: 50px;
`

const NameBlock = styled.div`
   height: 106px;
   background-image: linear-gradient(to bottom, #505050, #333333);
   padding: 0 0 0 191px;
    font-family: Overpass, sans-serif;
    box-sizing: border-box;
    display: flex;
    align-items: center;
   .name {
      font-size: 40px;
      color: #ffffff;
   }
   .nickname {
      font-size: 36px;
      color: #cdcdcd;
   }
`

const AddressBlock = styled.div`
   padding: 12px 0 0 191px;
   background-color: #dadada;
   height: 55px;
   
   font-family: Overpass, sans-serif;
   font-size: 36px;
   color: #333333;
   position: relative;
`


const LittleProfilePicture = styled.div`
   width: 140px;
   height: 140px;
   background: url(${props => props.profileURL || 'images/Anonymus.png'}) center no-repeat;
   background-size: cover;
   border: 2px solid rgb(218,218,218);
   border-radius: 50%;
   position: absolute;
   top: 10px;
   left: 24px;
`

const FlagWrapper = styled.div`
	position: absolute;
	right: 0;
	top: 4px;
`

const Flag = styled(props => <span className={`flag flag-${props.value.toLowerCase()}`}/>)``

export default class PersonalInfo extends Component {
    constructor(props) {
        super(props)
        e.setLanguage(props.language)
    }

    state = {
        photoUrl: "images/Anonymus.png"
    }

    componentWillReceiveProps(nextProps) {
        e.setLanguage(nextProps.language)
    }

    componentDidMount() {
        const {userId, cdnMedia} = this.props
        const pictureUrl = `${cdnMedia}profile/${userId}.jpg?crossorigin`
        return fetch(pictureUrl)
            .then(response => {
                if (response.status === 403) {
                    throw new Error('forbidden')
                }
                return response.url
            })
            .then(url => {
                this.setState({
                    photoUrl: url
                })
            })
            .catch(error => {
                console.error(error.message)
            })
    }

    render() {
        const {firstName, lastName, nickname, country, city, showFullName} = this.props
        const {photoUrl} = this.state;
        return(
            <NameAddressBlock>
                <NameBlock>
                    {
                        showFullName ?
                            <div>
                                <span className="name">{(firstName || e.settings_firstName) + ' ' + (lastName || e.settings_surname)}</span>
                                <br />
                                <span className="nickname">{nickname || e.settings_username}</span>
                            </div>
                            :
                            <span className="name">{nickname || e.settings_username}</span>
                    }
                </NameBlock>
                <AddressBlock>
                    {city || e.settings_placeOfResidence}
                    <FlagWrapper><Flag value={country} /></FlagWrapper>
                </AddressBlock>
                <LittleProfilePicture profileURL={photoUrl} />
            </NameAddressBlock>
        )
    }
}
