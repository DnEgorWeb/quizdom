import React from 'react';
import { Switch, Route} from 'react-router-dom';
import url from '../../../constants/urlConstants'

import MyWinningsContainer from './MyWinningsContainer'
import GraphicContainer from './GraphicContainer'

const MyWinningsRoot = () => (
    <Switch>
        <Route path={url.winnings.graphic} component={GraphicContainer} />
        <Route path={url.winnings.index} component={MyWinningsContainer} />
    </Switch>
)

export default MyWinningsRoot;
