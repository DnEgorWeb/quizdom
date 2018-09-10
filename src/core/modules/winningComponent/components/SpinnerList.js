import React from 'react'
import e from '../../../../langs';
import {SpinnerItem, Separator, MainInformation, InfoButton, Wrapper, ItemInfo} from './styledComponents'

const SpinnerList = ({
	                     toggleInfoPanel, items, cdnMedia,
	                     showSpinnerInfo, openItem
                     }) => {
	return(
        <Wrapper>
            <MainInformation>
                <span>{e.mywinnings_chooseYourWinnings}</span>
                <InfoButton onClick={toggleInfoPanel} >
                    <img
	                    src="images/01a_info_256.png"
	                    width={50}
	                    alt="spinner"
	                    onClick={toggleInfoPanel}
                    />
                </InfoButton>
            </MainInformation>
            {
                items.map(item => (
                    <SpinnerItem key={item.winningComponentId}>
                        <img src={`${cdnMedia}app/${item.imageId}`}
                             width={630}
                             onClick={showSpinnerInfo.bind(null, item)}
                             alt={item.type === "PAID" ? 'paid': 'free'} />
                        <Separator/>
                        <ItemInfo onClick={() => openItem(item)} style={{border: '12px solid rgb(50,50,50)'}}>
                            <div
	                            style={{
	                            	position: 'relative', width: '100%',
		                            height: '100%', borderRadius: '100%',
                                    borderTop: '3px solid #939393',
		                            background: 'linear-gradient(to bottom, #474747, #2a2a2a)'
	                            }}>
                                <img
	                                src="images/01a_info_256.png"
	                                width={50}
	                                alt="spinner"
                                />
                            </div>
                        </ItemInfo>
                    </SpinnerItem>
                    )
                )
            }
        </Wrapper>
    )
}

export default SpinnerList