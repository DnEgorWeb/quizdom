import React from 'react'
import { connect } from 'react-redux'
import Intro from './components/'
import convertIdToURL from '../../../services/convertIdToURL'
const IntroContainer = props => <Intro {...props} />

const mapStateToProps = (store) => {
	const {configuration} = store.app.application;
	const {cdnMedia, firstRunMediaIds: imgIds, secondRunImages: gameIds} = configuration;
	const imgUrls = imgIds.map(id => convertIdToURL(cdnMedia, 'app', id));
	const secondRunImgUrls = gameIds.map(id => {
		return {
			url: convertIdToURL(cdnMedia, 'intro', id.mediaId)(),
			redirect: id.gameType
		}
	})
	return {
		images: imgUrls,
		secondImages: secondRunImgUrls
	}
}

export default connect(mapStateToProps, {
})(IntroContainer)
