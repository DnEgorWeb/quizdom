const home = {
    index : '/home'
};

const login = {
    index : '/login'
};

const register = {
    index : '/register'
};

const dashboard = {
    index : '/dashboard'
};

const payment = {
    index           : '/payment',
    money           : '/payment/money',
    payout          : '/payment/payout',
    credit          : '/payment/credit',
    creditMobile    : '/payment/creditMobile',
    topCreditMobile : '/payment/top_credits',
    bonus           : '/payment/bonus',
    services        : '/payment/services',
    bill            : '/payment/bill',
    history         : '/payment/history',
};

const profile = {
    index    : '/profile',
    nickname : '/profile/nickname',
    password : '/profile/password',
    phone    : '/profile/phone',
    email    : {
        index        : '/profile/email',
        verification : '/profile/email/verification',
    },
};

const invite = {
    index : '/invite',
    email : '/invite/email'
};

const settings = {
    index : '/settings'
};

const look = {
    index : '/look'
};

const game = {
    index      : '/game',
    quiz       : {
        index    : '/game/quiz24',
        category : '/game/quiz24/category',
        start    : '/game/quizz24/start'
    },
    duel       : {
        index          : '/game/duel',
        invitations    : '/game/duel/invitations',
        invitationInfo : '/game/duel/invitation',
        creation       : '/game/duel/creation',
        friendsResult  : '/game/duel/friends_result',
        gameStart      : '/game/duel/game_start',
        all            : '/game/duel/all',
        finished       : '/game/duel/finished',
    },
    tournament : {
        index  : '/game/tournament',
        open   : '/game/tournament/open',
        quick  : '/game/tournament/quick',
        detail : '/game/tournament/detail'
    }
};

const info = {
    index     : '/info',
    about     : '/info/about',
    tenant    : '/info/tenant',
    gtc       : '/info/gtc',
    privacy   : '/info/privacy',
    impressum : '/info/impressum',
    copyright : '/info/copyright',
    picture   : '/info/picture',
};

const voucher = {
    index   : '/voucher',
    my      : '/voucher/my',
    details : '/voucher/details',
};

const messenger = {
    index : '/messenger'
}

const feedback = {
    index : '/feedback'
}

const winnings = {
    index   : '/winnings',
    graphic : '/winnings/graphic'
}

const highscore = {
    index : '/highscore'
}

const tombola = {
    index : '/tombola'
}

const friends = {
    index : '/friends'
}

const promocode = {
    index : '/promocode'
}

const groups = {
    index      : '/groups',
    tournament : '/groups/tournament',
    details    : '/groups/details',
    add        : '/groups/add',
    create     : '/groups/create',
    change     : '/groups/change',
}

const url = {
    home,
    login,
    register,
    dashboard,
    payment,
    profile,
    invite,
    settings,
    look,
    game,
    info,
    voucher,
    messenger,
    winnings,
    highscore,
    tombola,
    feedback,
    friends,
    promocode,
    groups,
}

export default url;
