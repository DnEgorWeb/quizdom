export default function getAlphabetSortedFriendsList(myFriendsList, onlyFavorite = false) {
    const alphabetSortedFriendsList = [
        {
            id: 0,
            letter: '#',
            items: []
        }
    ];

    if (myFriendsList) {

        myFriendsList.forEach(friend => {
            const nickname = friend.profile && friend.profile.nickname;
            if (nickname && (nickname[0].toLowerCase() === nickname[0].toUpperCase())) {  // is no letter
                alphabetSortedFriendsList[0].items.push(friend)
            }
        })

        for (let i = '0'.charCodeAt(0); i <= 'z'.charCodeAt(0); i++) {

            if ( (i >= 48 && i <= 64) || (i >= 91 && i <= 96) ) continue;

            const letter = String.fromCharCode(i);
            const items = myFriendsList.filter((friend) => {
                const nicknameFirstLetter = friend.profile && friend.profile.nickname && friend.profile.nickname[0].toLowerCase();
                if (onlyFavorite) {
                    return letter === nicknameFirstLetter && friend.buddy.favorite
                } else {
                    return letter === nicknameFirstLetter
                }
            });
            alphabetSortedFriendsList.push({
                id: i,
                letter,
                items,
            })
        }
    }

    return alphabetSortedFriendsList;
}