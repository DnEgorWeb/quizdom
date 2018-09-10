import { connect } from 'react-redux'

import ProfilePicture from './components'

const mapStateToProps = store => {
    const { userId }        = store.profile;
    const { configuration } = store.app.application;
    const { cdnMedia }      = configuration;
    const avatarImage       = localStorage.getItem('avatarImage') || `${userId}.jpg`;
    const pictureUrl        = `${cdnMedia}profile/${avatarImage}`;
    
    // const pictureUrl        = (avatarImage && avatarImage !== `${userId}.jpg`) ? `${cdnMedia}profile/${avatarImage}` : `${cdnMedia}profile/${userId}.jpg` ;
    // + "?" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 5);

    return {
        level : store.profile.handicap,
        pictureUrl
    }
}

export default connect(mapStateToProps)(ProfilePicture)
