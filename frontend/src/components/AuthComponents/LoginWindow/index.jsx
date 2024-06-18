import { ReactComponent as Logo } from '../../../assets/logo/Noises_logo.svg'
import { ReactComponent as Arrow } from './icons/arrow.svg'
import { Link, useNavigate } from "react-router-dom"
import style from '../AuthStyles.module.scss'
import InputElem from '../../UI/InputElem'
import ButtonElem from '../../UI/ButtonElem'
import { useState } from 'react'

function LoginWindow() {


    // работает, но есть но: Я поставил своё имя, а надо брать имя пользователя


    const navigate = useNavigate();

    const [values, setValues] = useState({
        email: "",
        password: ""
    });

    // нужен для нажатия на кнопку submit, чтобы подтвердить свои данные
    const [submitted, setSubmitted] = useState(false);

    // для проверки полей ввода (пустые ли они или нет)
    const [valid, setValid] = useState(false);

    // для отображения ошибки в виде текста о созданном аккаунте
    const [loginExist, setLoginExist] = useState(null)

    // фунция по подтверждению данных
    const handleSubmit = (e) => {
        e.preventDefault();

        // проверка полей ввода
        setValid(true)

        // если все поля заполнены
        if (values.email && values.password) {

            // выполняется запрос на бек для регистрации аккаунта
            fetch('http://localhost:8080/login', {
                method: 'POST',
                body: JSON.stringify({
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
                        throw new Error('Данный аккаунт не существует')
                    }
                })

                // если получили данные, то...
                .then(json => {
                    console.log(json);
                    setLoginExist(true);

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
                                setLoginExist(false);
                            }
                        })
                        .then(userData => {
                            localStorage.setItem('userData', JSON.stringify({ id: userData.id,  name: userData.username, img: 'https://images.unsplash.com/photo-1680026319202-fcb822e0ab91?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', token: json.token }));
                            // Другие операции, которые вы хотите выполнить после получения данных о пользователе

                            // переходим на home page
                            window.location.href = '/'
                            // подтверждаем форму
                            setSubmitted(true);

                        })
                        .catch(error => {
                            console.error('Ошибка при получении данных о пользователе:', error);
                        });
                })
                .catch(error => {
                    setLoginExist(false);
                    console.error('Ошибка во время входа в аккаунт:', error);
                });

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
                        <Link to={'/login'} className={style.activeLink}>
                            Sign in
                        </Link>
                        <Link to={'/registration'} className={style.notActiveLink}>
                            Sign up
                        </Link>
                    </div>
                </div>
                <div className="authMain">
                    <form onSubmit={handleSubmit}>

                        <InputElem type='email' placeholder='Email' name='email' value={values.email} onChange={handleInputChange} />

                        {valid && !values.email && (
                            <span>Write your email</span>
                        )}


                        <InputElem type='password' placeholder='Password' name="password" value={values.password} onChange={handleInputChange} />

                        {valid && !values.password && (
                            <span>Write your password</span>
                        )}

                        {loginExist === false && (
                            <span>This account wasn't created</span>
                        )}
                        <ButtonElem title="Sign up" type='submit' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginWindow