import React from 'react'
import {Switch, Route} from 'react-router-dom'
// import {sendInviteResponse} from '../duck'
import url from '../../../../constants/urlConstants'

import InviteFriends from './inviteFriends'
import SendByEmail   from './sendByEmail'

const InviteFriendsRoot = (props) => {
	return (
        <Switch>
            <Route path={url.invite.email}  children={
                () => <SendByEmail {...props} />
            } />
            <Route path={url.invite.index}  children={() => <InviteFriends {...props} />} />
        </Switch>
    )
}

export default InviteFriendsRoot;
