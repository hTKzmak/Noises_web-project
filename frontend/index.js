
// GET запрос (получаем всю музыку)
let elementGetData = document.querySelector('#getData');

function getData() {
    fetch('http://localhost:8080/search?q=perf')
        .then(res => res.json())
        .then(data => console.log(data))
}

elementGetData.onclick = getData;


// Результат поиска
let elementsearch = document.querySelector('#search');

function searchData() {
    fetch(`http://localhost:8080/search?q=${elementsearch.value}`)
        .then(res => res.json())
        .then(data => console.log(data))
}

elementsearch.addEventListener('change', () => {
    searchData()
})


// --------------------------------------------


// POST запрос
// Регистрация
let elementRegister = document.querySelector('#register');

function registerUser() {
    fetch('http://localhost:8080/register', {
        method: 'POST',
        body: JSON.stringify({
            username: "SomeoneElae",
            email: "someoneelse@gmail.com",
            password: "1224"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
}

elementRegister.onclick = registerUser;


// Логин
let elementLogin = document.querySelector('#login');

function loginUser() {
    fetch('http://localhost:8080/login', {
        method: 'POST',
        body: JSON.stringify({
            username: "SomeoneElae",
            email: "someoneelse@gmail.com",
            password: "1224"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    })
        .then(response => response.json())
        .then(json => {
            localStorage.setItem('token', json.token)
            console.log(json)
        })
}

elementLogin.onclick = loginUser;



// Загрузка музыки
let elemUploadMusic = document.querySelector('#upload')

function uploadMusic() {
    fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: JSON.stringify({
            musicname: "Beaver Creek",
            releaseDate: '',
            files: "D:\downloads\headshot_YE6LgUX.mp3",
            files: "D:\downloads\IMG_2505-1.jpg"
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(response => response.json())
        .then(json => console.log(json))
}

elemUploadMusic.onclick = uploadMusic



// DELETE запрос
// Удаление музыки
let elemDelete = document.querySelector('#delete')

function deleteMusic() {
    fetch('http://localhost:8080/delete?id=1', {
        method: 'DELETE',
        headers: {
            "Content-type": "application/json; charset=UTF-8",
            "Authorization": `Bearer ${localStorage.getItem('token')}`,
        }
    })
        .then(res => res.json())
        .then(data => console.log(data))
}

elemDelete.onclick = deleteMusic