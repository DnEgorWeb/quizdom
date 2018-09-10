import React from 'react'
import e from '../../../../langs'
import styled from 'styled-components'
import {Switch, Route, Link} from 'react-router-dom'
import url from '../../../../constants/urlConstants'

import TopBar from '../../../modules/components/TopBar'
import InfoSection from './infoSection'
import PictureSources from './pictureSources'

const Wrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
	font-family: Univers-condensed;
`

const InfoBlock = styled.div`
	padding: 28px 0 0 28px;
`

const InfoList = [
	{title: e.info_aboutF4M, link: url.info.about, prop: 'aboutApp'},
	{title: e.info_aboutTenant, link: url.info.tenant, prop: 'aboutTenant'},
	{title: 'GTC', link: url.info.gtc, prop: 'gtc'},
	{title: e.info_privacyStatement, link: url.info.privacy, prop: 'privacyStatement'},
	{title: e.info_impressum, link: url.info.impressum, prop: 'impressume'},
	{title: e.info_copyrights, link: url.info.copyright, prop: 'copyright'},
	{title: e.info_pictureSources, link: url.info.picture, prop: 'pictureUrls'},
]

const InfoItem = styled.div`
	width: 100%;
	height: 126px;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	padding-left: 22px;

	font-size: 52px;
	font-weight: 500;
	color: #4d4d4d;
	text-transform: uppercase;

	background: url('images/info-arrow.png') 578px center #f7f7f7 no-repeat;
	box-sizing: border-box;
	position: relative;

	cursor: pointer;

	&:before {
		content: '';
		position: absolute;
		left: 0;
		top: 0;

		width: 100%;
		height: 2px;
		background: white;
	}

	&:after {
		content: '';
		position: absolute;
		left: 0;
		bottom: 0;

		width: 100%;
		height: 4px;
		background: #d1d1d1;
	}
`

const DecoratedLink = styled(Link)`
    text-decoration: none;
`

const InfoMenu = () => {
	return(
		<div>
			<TopBar caption='INFO' />
			<InfoBlock>
				{
					InfoList.map(item => {
						return (
							<DecoratedLink to={item.link || ''} key={'i_' + item.title}>
								<InfoItem>{item.title}</InfoItem>
							</DecoratedLink>
						)
					})
				}
			</InfoBlock>
		</div>
	)
}

class Info extends React.Component {
	constructor(props) {
		super(props);
		const {pictureIds, getData, addToMetadataList, cdnMedia} = props;
		pictureIds && pictureIds.map(id => getData(cdnMedia, id, addToMetadataList));
	}

	render() {
		const {pictureObjs = []} = this.props;
		return (
			<Wrapper>
				<Switch>
					{
						InfoList.map((item, index) => {
							return (
								item.link === url.info.picture ?

									<Route key={index} path={item.link}>
										<PictureSources title={item.title}
														pictureObjs={pictureObjs}
														cdnMedia={this.props.cdnMedia}
														getMedia={this.props.getMedia}
														imageInfo={this.props.imageInfo}
														authorInfo={this.props.authorInfo}
														getAuthorInfo={this.props.getAuthorInfo} />
									</Route>
                                    :
									<Route key={index} path={item.link}>
										<InfoSection title={item.title} info={this.props[item.prop]} />
									</Route>
							)
						})
					}
					<InfoMenu/>
				</Switch>
			</Wrapper>
		)
	}
}

export default Info;
