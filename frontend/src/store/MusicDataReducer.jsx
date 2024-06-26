// список всей музыки, которая есть в беке
const defaultState = {
    page_name: '',
    music_list: []
};

const FAVORITE_MUSIC = 'FAVORITE_MUSIC'
const LATEST_MUSIC = 'LATEST_MUSIC'
const USERS_MUSIC = 'USERS_MUSIC'
const POPULAR_MUSIC = 'POPULAR_MUSIC'
const NEW_MUSIC = 'NEW_MUSIC'


// здесь будут отображаться только те данные, у которых написан type в app.jsx
export const musicDataReducer = (state = defaultState, action) => {
    switch (action.type) {
        case FAVORITE_MUSIC:
            return {
                // page_name: 'Favorite music :P', musicData: action.payload.map(elem => {
                //     // console.log(elem)
                //     return elem
                // })
                page_name: 'Favorite music', music_list: []
            }
        case LATEST_MUSIC:
            return {
                // так мы передаём данные из значения функции в musicList (37)
                page_name: 'Latest music', music_list: action.payload.map(elem => {
                    return elem
                })
            }
        case USERS_MUSIC:
            return {
                page_name: 'Your music', music_list: action.payload.map(elem => {
                    return elem
                })
            }
        case POPULAR_MUSIC:
            return {
                page_name: 'Popular music', music_list: action.payload.map(elem => {
                    return elem
                })
            }
        case NEW_MUSIC:
            return {
                page_name: 'New music', music_list: action.payload.map(elem => {
                    return elem
                })
            }
        default:
            return state
    }
}

export const favoriteMusicAction = (payload) => ({ type: FAVORITE_MUSIC, payload })
export const latestMusicAction = (payload) => ({ type: LATEST_MUSIC, payload })
export const userMusicAction = (payload) => ({ type: USERS_MUSIC, payload })
export const popularMusicAction = (payload) => ({ type: POPULAR_MUSIC, payload })
export const newMusicAction = (payload) => ({ type: NEW_MUSIC, payload })