import React from 'react'

import DetailsSingle from './detailsSingle'
import DetailsDuel from './detailsDuel'

const Main = (props) => {
    if (props.isSecondPlayer) {
        return <DetailsDuel {...props} />
    } else {
        return <DetailsSingle {...props} />
    }
}

export default Main;
