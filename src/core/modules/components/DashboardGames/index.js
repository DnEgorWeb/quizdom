import styled from 'styled-components'

export const GameList = styled.div`
    overflow: hidden;
    height: 1236px;
    max-height: 1236px;
    position: relative;
    .scrollable-wrapper{
        padding-top: 46px;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: -17px; /* Increase/Decrease this value for cross-browser compatibility */
        overflow-y: scroll;@media (max-width: 768px) {
            right: 0;
        }
    }
`

export const Game = styled.div`
    background-image: linear-gradient(rgb(72,72,72), rgb(36,36,37));
    width: 710px;
    height: 300px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.35), 0 -2px 0 rgb(143,143,143);
    margin: 40px auto 0;
    padding: 30px 0 0 28px;
    box-sizing: border-box;
    position: relative;
    &:first-child {
        margin-top: 0;
    }
    &:after {
        content: '';
        width: 290px;
        height: 290px;
        background: url(${props => props.src}) center no-repeat;

        position: absolute;
        right: 10px;
        top: -18px;
    }
`

export const Title = styled.h2`
    font-size: 50px;
    font-weight: bold;
    color: rgb(218,218,218);
    text-shadow: 0 -4px 2px black;
    text-transform: uppercase;
    margin: 0;
`

export const Separator = styled.div`
    width: 350px;
    height: 4px;
    background-image: linear-gradient(rgb(32,32,32), rgb(103,103,103));
    margin: 0 0 7px;
`

export const Text = styled.div`
    font-size: 44px;
    font-weight: 500;
    text-align: left;
    color: #b4b4b4;
    .yellow {
        font-size: 46px;
        font-weight: bold;
        color: #ffe600;
    }
    .big{
        font-size: 56px;
    }
    p{
        margin: 0;
    }
`

export const DashboardWrapper = styled.div`
    background: rgb(35,35,35);
    height: 100%;
    font-family: Univers-condensed;
`