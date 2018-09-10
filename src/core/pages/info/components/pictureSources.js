import React, {Component} from 'react'
import e from '../../../../langs'
import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'
import SubMenu from '../../../modules/components/SubMenu'

const Wrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
`

const PictureList = styled.div`
	overflow: hidden;
    height: calc(100% - 98px);
    max-height: calc(100% - 98px);
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

const Picture = styled.div`
	width: 220px;
	height: 290px;
	background: url(${props => props.src}) center #c6c6c6 no-repeat;
	background-size: calc(100% - 40px);
	border: solid 2px #575757;
	margin: 20px 0 0 20px;
	cursor: pointer;
	display: inline-block;
`

const Photo = styled.img`
	width: 300px;
`

const Text = styled.div`
	font: 500 36px Arial;
	color: #333333;
	h3 {
		font-weight: 900;
	}
	p, h3 {
		margin: 0;
	}
`

const H3Capitalize = styled.h3`
    text-transform: capitalize;
`

class PictureInfo extends Component {
	componentWillMount() {
        this.props.getMedia(this.props.picture)
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.imageInfo.id && !this.props.imageInfo) {
            this.props.getAuthorInfo(nextProps.imageInfo.creatorResourceId)
		}
		if (this.props.imageInfo && nextProps.imageInfo && nextProps.imageInfo.id !== this.props.imageInfo.id) {
            this.props.getAuthorInfo(nextProps.imageInfo.creatorResourceId)
		}
	}

	render() {
        const {cdnMedia, picture, authorInfo} = this.props
		let author = ""
        // let creatorResourceId = ""
        let source = ""
        let description = "no description"
        if (this.props.imageInfo) {
            // creatorResourceId = this.props.imageInfo.creatorResourceId
            source = this.props.imageInfo.source
            description = this.props.imageInfo.description
        }
        if (authorInfo) {
        	author = `${authorInfo.firstName} ${authorInfo.lastName}`
		}
		return (
			<div>
				<Photo src={`${cdnMedia}answer/${picture}`} />
				<Text>
					<H3Capitalize>{e.info_author}</H3Capitalize>
					<p>{author}</p>
					<H3Capitalize>{e.info_pictureSource}</H3Capitalize>
					<p>{source}</p>
					<H3Capitalize>{e.info_other}</H3Capitalize>
					<p>{description}</p>
				</Text>
			</div>
		)
	}
}

class PictureSources extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedPicture: null,
			pictureUrls: []
		}
	}

	componentWillMount() {
        const {pictureObjs} = this.props
		const pictureUrls = []
		pictureObjs.forEach(obj => {
			for (let key in obj) {
				if (obj[key].slice(-3)!=='jpg' && obj[key].slice(-3)!=='png') continue
				pictureUrls.push(obj[key])
			}
		})
		this.setState({pictureUrls})
	}

	selectPicture = (picture, index) => {
        this.props.getMedia(picture)
		this.setState({selectedPicture: index})
	}

	render() {
		const {pictureUrls} = this.state;
		const {title, cdnMedia, imageInfo, getMedia, authorInfo, getAuthorInfo} = this.props
		const PictureInfoList = pictureUrls.map((picture, index) => <PictureInfo key={index}
																				 picture={picture}
																				 imageInfo={imageInfo}
																				 cdnMedia={cdnMedia}
																				 authorInfo={authorInfo}
																				 getAuthorInfo={getAuthorInfo}
																				 getMedia={getMedia}/>);
		const {selectedPicture} = this.state;
        return pictureUrls.length ?
			<Wrapper>
				<TopBar caption={title.toUpperCase()} />
				<PictureList>
					<div className='scrollable-wrapper'>
						{
                            pictureUrls.map((picture, index) =>
								<Picture key={index} src={`${cdnMedia}answer/${picture}`} onClick={this.selectPicture.bind(this, picture, index)} />)
						}
					</div>
				</PictureList>
				<SubMenu
					title='Picture Source'
					componentList={PictureInfoList}
					currentIndex={selectedPicture}
					getMedia={getMedia}
					selectPicture={this.selectPicture}/>
			</Wrapper>
			:
            <Wrapper>
                <TopBar caption={title.toUpperCase()} />
            </Wrapper>
	}
}

export default PictureSources;
