import styled from 'styled-components'

export const EnemySectionTitle = styled.div`
  font: 500 26px Overpass;
  text-align: center;
  color: #b4b4b4;
  margin-top: 36px;
  text-transform: uppercase;
`

export const RegionSelectorWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  
  margin-top: 35px;
`

const Region = styled.div`
  cursor: pointer;
  width: 200px;
  height: 120px;
`

export const GermanRegion = styled(Region)`
  background: url(${({isActive}) => isActive ? 'images/against-all-german-active.png' : 'images/against-all-german-non-active.png'}) center no-repeat;
`

export const AllRegions = styled(Region)`
  background: url(${({isActive}) => isActive ? 'images/against-all-world-active.png' : 'images/against-all-world-non-active.png'}) center no-repeat;
`
