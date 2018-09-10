import React from 'react'
import { connect } from 'react-redux'
import {getData, getFromCashe, getMedia, getAuthorInfo} from './duck'
import convertIdToURL from '../../../services/convertIdToURL'
import Info from './components/'

const InfoContainer = props => <Info {...props} />

const mapStateToProps = (store, dispatch) => {
    //harcoded
    const {configuration} = store.app.application;
    const {cdnMedia} = configuration;
    //hardcoded end

    const {app} = store;
    const {friendsForMedia, application, tenant} = app
	const pictureIds = getFromCashe();
    //pictureIds && pictureIds.map(id => getData(cdnMedia, id, addToMetadataList, dispatch));
    
    const language = store.profile && store.profile.settings && store.profile.settings.languageId

    return {
        gtc: friendsForMedia.termsAndConditions,
        privacyStatement: friendsForMedia.privacyStatement,
	    copyright: friendsForMedia.copyright,
        aboutApp: application.description,
        aboutTenant: tenant.description,
        impressume: friendsForMedia.impressume,
	    pictureIds,
	    cdnMedia,
	    pictureObjs: store.game.lastQuestionLetterMap,
        language,
        imageInfo: store.info.imageInfo,
        authorInfo: store.info.authorInfo
    }
}

export default connect(
    mapStateToProps, {
        getData,
		convertIdToURL,
        getMedia,
        getAuthorInfo
    }
)(InfoContainer)
