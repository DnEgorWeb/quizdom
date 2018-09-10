import React from 'react'
import styled from 'styled-components'

const PhotoBlock = styled.div`
    position: relative;
	flex: 1;
	display: flex;
	justify-content: center;
	align-items: center;
	${'' /* //background: #000; */}
    .glass{
        z-index: 2;
        position: absolute;
        width: 200px;
        top: 5px;
        left: 20px;
    }
    p{
        color: white;
        font-size: 32px;
        position: absolute;
        bottom: 15px;
        margin: 0;
        font-weight: 600;
    }
`

const Photo = styled.div`
	width: 227px;
	height: 227px;
	background-color: black;
	border-radius: 50%;

	background: url('images/foto.png') center no-repeat;
	background-size: contain;
`
const RealPhotoBlock = styled.div`
    width: 130px;
    height: 130px;
    position: absolute;
    overflow: hidden;
    border-radius: 50%;

    .profilePhoto{
        z-index: 1;
        position: relative;
        width: 130px;
    }
`

export default class UserAvatar extends React.Component{
    render(){
        return(
            <PhotoBlock className='photoBlock'>
                <Photo />
                <img className='glass' src='images/top-glass.png'/>
                <RealPhotoBlock>
                    <img className='profilePhoto' src='images/Anonymus.png'/>
                </RealPhotoBlock>
                <p>{this.props.level}</p>
            </PhotoBlock>
        )
    }
}
