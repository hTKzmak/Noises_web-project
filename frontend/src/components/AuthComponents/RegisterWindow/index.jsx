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
                    // выводим сообщение: Object { message: "User registered successfully" }
                    console.log(json)
                    // не отображаем сообщение
                    setRegExist(false)
                    // храним данные в LS
                    localStorage.setItem('userData', JSON.stringify({ name: values.name, img: 'https://images.unsplash.com/photo-1680026319202-fcb822e0ab91?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }))
                    // переходим на home page
                    window.location.href = '/'
                    // подтверждаем форму
                    setSubmitted(true);
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