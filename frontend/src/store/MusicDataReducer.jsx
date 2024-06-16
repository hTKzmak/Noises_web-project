// список всей музыки, которая есть в беке
const defaultState = [];


// надо будет делать запрос на получение всей музыки

// function searchFunc(value) {
//     setInputValue(value)
//     fetch(`http://localhost:8080/search?q=${value}`)
//         .then(res => res.json())
//         .then(data => {
//             if (data && value) {
//                 setSearchData(data.music)
//             }
//             else if (data && !value) {
//                 setSearchData([])
//                 console.log(searchData)
//             }
//             else {
//                 setSearchData([])
//                 console.log(searchData)
//             }
//         })
// }

let TEST = 'TEST'

export const musicDataReducer = (state = defaultState, action) => {
    switch (action.type) {

        case TEST:
            alert(action.payload)

        default:
            return state
    }
}

export const testAction = (payload) => ({ type: TEST, payload })