import styled from 'styled-components'

export const TombolaWrapper = styled.div`
  height: 100%;
  background: rgb(35,35,36);
`

export const DrawDateWrapper = styled.div`
  margin: 31px 0 28px 31px;
`

export const DrawDateTitle = styled.div`
  font-size: 37px;
  font-family: Overpass, regular, serif;
  color: #e6e6e6;
  text-transform: uppercase;
`

export const DrawDateContent = styled.div``

export const DayOfWeek = styled.div`
  display: inline-block;
  margin-right: 25px;
  font-size: 37px;
  color: rgb(255,230,0);
  text-transform: lowercase;
  &:first-letter {
    text-transform: uppercase;
  }
`

export const Date = styled.div`
  display: inline-block;
  font-size: 37px;
  color: #e6e6e6;
`

export const CarouselWrapper = styled.div`
	.slider-decorator-0, .slider-decorator-1{
        display: none;
    }
    .slider-decorator-2 {
		width: 100%;
		height: 48px;
		position: static !important;
		transform: translate(0,0) !important;
    }
    .slider-frame {
    	height: 530px !important;
    }
  	button {
  		margin-left:  10px !important;
  		margin-right: 10px !important;
  	}
`

export const VoucherSliderWrapper = styled.div`

	.tombola-picture {
		display: block;
		margin: 0 auto;
		height: 386px;
	}
`;

export const ChancePanelWrapper = styled.div`
  margin: 31px 0 0 31px;
  position: relative;
`

export const OwnTombolaWrapper = styled.div`
  font-size: 37px;
  color: rgb(180,180,180);
  //margin-bottom: 10px;
  &:last-child {
    margin-bottom: 0;
  }
`

export const OwnTombolaLabel = styled.div`
  display: inline-block;
  margin-right: 20px;
  text-transform: uppercase;
`

export const Amount = styled.div`
  display: inline-block;
  color: rgb(255,230,0);
`

export const InfoButtonWrapper = styled.div`
  position: absolute;
  right: 30px;
  top: 50%;
  margin-top: -70px;
`

export const TicketPackagesListWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  margin: 45px 31px 0;
`

export const TicketPackageWrapper = styled.div`
  opacity: ${({isEnabled}) => isEnabled ? '1' : '.2'};
  width: 210px;
  height: 150px;
  box-shadow: 0 -2px 0 rgb(147,147,147);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  background: linear-gradient(to bottom, rgb(72,72,72), rgb(35,35,36));
  position: relative;
  margin-right: 28px;
  margin-top: 30px;
  cursor: ${({isEnabled}) => isEnabled ? 'pointer' : 'default'};
  &:nth-child(1), &:nth-child(2), &:nth-child(3) {
    margin-top: 0;
  }
  &:nth-child(3n) {
    margin-right: 0;
  }
  &:after {
    content: '';
    width: 80px;
    height: 80px;
    box-shadow: 0 0 0 3px rgb(83,83,83);
    background: url(${({index}) => 'images/ticket-image-' + index + '.png'}) center no-repeat;
    background-size: 50px;
    background-color: rgb(35,35,35);
    position: absolute;
    left: 50%;
    top: -15px;
    transform: translate(-50%, 0);
    border-radius: 50%;
  }
`

export const DrawsLabel = styled.div`
  font-size: 32px;
  color: yellow;
  font-weight: bold;
  text-align: center;
  margin-top: 75px;
  font-family: Overpass-Reg, sans-serif;
`

export const AmountLabel = styled.div`
  font-size: 28px;
  font-weight: bold;
  color: yellow;
  text-transform: uppercase;
  text-align: center;
  margin-top: 5px;
  font-family: Overpass-Reg, sans-serif;
`
