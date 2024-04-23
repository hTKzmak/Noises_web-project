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

    // подтверждение своих данных (не обязателен)
    // const [valid, setValid] = useState(false);

    // фунция по подтверждению данных
    const handleSubmit = (e) => {
        e.preventDefault();
        if (values.name && values.email && values.password) {

            // setValid(true);
            
            localStorage.setItem('userData', JSON.stringify({ name: values.name, img: 'https://images.unsplash.com/photo-1680026319202-fcb822e0ab91?q=80&w=1760&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' }))
            // navigate('/');
            window.location.href = '/'
            console.log(values.password.length)
            // console.log(localStorage.getItem('userData'))
        }
        setSubmitted(true);
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
                <button onClick={() => navigate(-1)} className={style.backLink}>
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

                        <InputElem type='text' placeholder='Name' name='name' value={values.name} onChange={handleInputChange} />

                        {submitted && !values.name && (
                            <span>Введите ваше имя</span>
                        )}
                        {submitted && values.name.length > 10 && (
                            <span>Ваше имя должно быть меньше 10 символов</span>
                        )}

                        <InputElem type='email' placeholder='Email' name="email" value={values.email} onChange={handleInputChange} />
                        {submitted && !values.email && (
                            <span>Введите вашу почту</span>
                        )}

                        <InputElem type='password' placeholder='Password' name="password" value={values.password} onChange={handleInputChange} />
                        {submitted && !values.password && (
                            <span>Введите ваш пароль</span>
                        )}
                        {submitted && values.password.length < 8 && (
                            <span>Ваш пароль должен состоять больше 8 символов</span>
                        )}

                        <ButtonElem title="Sign up" type='submit' />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterWindow