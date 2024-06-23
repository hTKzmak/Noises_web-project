import { ReactComponent as Logo } from '../../../assets/logo/Noises_logo.svg'
import { ReactComponent as Arrow } from './icons/arrow.svg'
import { Link, useNavigate } from "react-router-dom"
import style from '../AuthStyles.module.scss'
import InputElem from '../../UI/InputElem'
import ButtonElem from '../../UI/ButtonElem'
import { useState } from 'react'

function RegisterWindow() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: ""
    });

    // нужен для нажатия на кнопку submit, чтобы подтвердить свои данные
    const [submitted, setSubmitted] = useState(false);

    // для проверки полей ввода (пустые ли они или нет)
    const [valid, setValid] = useState(false);

    // для отображения ошибки в виде текста о созданном аккаунте
    const [regExist, setRegExist] = useState(null)

    // фунция по подтверждению данных
    const handleSubmit = (e) => {
        e.preventDefault();

        // проверка полей ввода
        setValid(true)

        // если все поля заполнены
        if (values.name && values.email && values.password) {

            // выполняется запрос на бек для регистрации аккаунта
            fetch('http://localhost:8080/register', {
                method: 'POST',
                body: JSON.stringify({
                    username: `${values.name}`,
                    email: `${values.email}`,
                    password: `${values.password}`
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            })
                .then(response => {
                    // если ошибок нет, то получаем данные
                    if (response.ok) {
                        return response.json()
                    }
                    // если ошибки есть, то данные не получаем
                    else {
                        throw new Error('Данный аккаунт был создан')
                    }
                })
                // если получили данные, то...
                .then(json => {
                    console.log(json);
                    setRegExist(false)

                    // Включаем второй fetch в блок then первого fetch
                    fetch('http://localhost:8080/user-info', {
                        method: 'GET',
                        headers: {
                            'Authorization': `Bearer ${json.token}`
                        },
                    })
                        .then(response => {
                            if (response.ok) {
                                return response.json();
                            } else {
                                setRegExist(false);
                            }
                        })
                        .then(userData => {
                            localStorage.setItem('userData', JSON.stringify({ id: userData.id, name: userData.username, img: userData.image_path, token: json.token }));
                            // Другие операции, которые вы хотите выполнить после получения данных о пользователе
                            console.log(userData)
                            // переходим на home page
                            window.location.href = '/'
                            // подтверждаем форму
                            setSubmitted(true);

                        })
                        .catch(error => {
                            console.error('Ошибка при получении данных о пользователе:', error);
                        });
                })

                // если не получили данные, то...
                .catch(error => {
                    // отображаем сообщение
                    setRegExist(true)
                    // выводим ошибку
                    console.error('Ошибка при регистрации:', error)
                })
        }

    };


    // хз
    const handleInputChange = (event) => {
        event.preventDefault();

        const { name, value } = event.target;
        setValues((values) => ({
            ...values,
            [name]: value
        }));
    };


    return (
        <div className={style.authPage}>
            <div className={style.authWindow}>
                <button onClick={() => navigate('/')} className={style.backLink}>
                    <Arrow />
                </button>
                <div className={style.authHeader}>
                    <Logo />
                    <div className={style.navigation}>
                        <Link to={'/login'} className={style.notActiveLink}>
                            Sign in
                        </Link>
                        <Link to={'/registration'} className={style.activeLink}>
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="authMain">
                    <form onSubmit={handleSubmit}>

                        <InputElem type='text' placeholder='Name' name='name' value={values.name} onChange={handleInputChange} maxLength={20} />

                        {valid && !values.name && (
                            <span>Write your name</span>
                        )}

                        <InputElem type='email' placeholder='Email' name="email" value={values.email} onChange={handleInputChange} />
                        {valid && !values.email && (
                            <span>Write your email</span>
                        )}

                        <InputElem type='password' placeholder='Password' name="password" value={values.password} onChange={handleInputChange} />
                        {valid && !values.password && (
                            <span>Write your password</span>
                        )}

                        {regExist === true && (
                            <span>This account has benn created</span>
                        )}
                        <ButtonElem title="Sign up" type='submit' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterWindow