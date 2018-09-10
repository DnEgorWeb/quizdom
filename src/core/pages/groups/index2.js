import React from 'react'
import { Switch, Route } from 'react-router-dom'
import url from '../../../constants/urlConstants'

import Groups from './components/groups'
import TournamentGroup from './components/tournamentGroup'
import GroupsDetails from './components/groupsDetails'
import AddFriends from './components/addFriends'
import CreateGroup from './components/createGroup'
import ChangeGroup from './components/changeGroup'

const GroupsRoot = (props) => (
    <Switch>
        <Route path={url.groups.create}><CreateGroup {...props} /></Route>
        <Route path={url.groups.change}><ChangeGroup {...props} /></Route>
        <Route path={url.groups.add}><AddFriends {...props} /></Route>
        <Route path={url.groups.details}><GroupsDetails {...props} /></Route>
        <Route path={url.groups.tournament}><TournamentGroup {...props} /></Route>
        <Route path={url.groups.index}><Groups {...props} /></Route>
    </Switch>
)

export default GroupsRoot;
