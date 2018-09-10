import React from 'react'
import styled from 'styled-components'

import TopBar from '../../../modules/components/TopBar'

const InfoSectionWrapper = styled.div`
	background: rgb(236,236,236);
	height: 100%;
`

const InfoSectionText = styled.div`
	padding: 52px 52px 30px 52px;
	overflow: auto;
	font-family: Arial;
	font-size: 36px;
	text-align: left;
	color: #333333;

	height: calc(100% - 100px);
    box-sizing: border-box;
`

const InfoSection = (props) => {
	return (
		<InfoSectionWrapper>
			<TopBar caption={props.title.toUpperCase()}/>
			<InfoSectionText>
				{props.info}
			</InfoSectionText>
		</InfoSectionWrapper>
	)
}

export default InfoSection