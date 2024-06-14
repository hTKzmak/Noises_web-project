// список любимой музыки
const defaultState = [];

let ADD_FAVOR = 'ADD_FAVOR'
let ADD_IN_PLAYLIST = 'ADD_IN_PLAYLIST'

let TEST = 'TEST'

export const musicReducer = (state = defaultState, action) => {
    switch (action.type) {

        case TEST:
            alert(action.payload)

        // добавление музыки в любмиые
        case ADD_FAVOR:
            // если музыки нет, то добавляем
            if (!state.find(elem => elem === action.payload)) {
                const newMusicItem = [...state, action.payload];
                state = newMusicItem;
            }
            // если музыка есть, то убираем
            else{
                return state.filter((elem => elem !== action.payload))
            }

            console.log(state)

            return state;

        case ADD_IN_PLAYLIST:
            alert(action.payload)

        // case DELETE:
        //     return state.filter((elem => elem.id !== action.payload))


        default:
            return state
    }
}

export const addFavorAction = (payload) => ({ type: ADD_FAVOR, payload })
export const addInPlaylistAction = (payload) => ({ type: ADD_IN_PLAYLIST, payload })
export const testAction = (payload) => ({ type: TEST, payload })