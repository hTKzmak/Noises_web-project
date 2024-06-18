import { favoriteMusicAction } from "../store/MusicDataReducer"

let BASE_URL = 'http://localhost:8080/'


const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
let userData = storedObject

// здесь выполняется сетевой запрос с бекенда для получение данных
export function fetchFavoriteMusic() {
    return function (dispatch) {
        fetch(BASE_URL + 'favorites', {
            method: 'GET',
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Authorization": `Bearer ${userData.token}`,
            }
        })
            .then(res => res.json())
            .then(data => dispatch(favoriteMusicAction(data)))
    }
}