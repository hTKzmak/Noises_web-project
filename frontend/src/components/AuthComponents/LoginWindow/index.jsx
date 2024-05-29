import { ReactComponent as Logo } from '../../../assets/logo/Noises_logo.svg'
import { ReactComponent as Arrow } from './icons/arrow.svg'
import { Link, useNavigate } from "react-router-dom"
import style from '../AuthStyles.module.scss'
import InputElem from '../../UI/InputElem'
import ButtonElem from '../../UI/ButtonElem'
import { useState } from 'react'

function LoginWindow() {

    const navigate = useNavigate();

    const [values, setValues] = useState({
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
        // if (values.email && values.password) {
        //     navigate('/')
        // }
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

                        {submitted && !values.email && (
                            <span>Write your email</span>
                        )}


                        <InputElem type='password' placeholder='Password' name="password" value={values.password} onChange={handleInputChange} />

                        {submitted && !values.password && (
                            <span>Write your password</span>
                        )}

                        {submitted && values.email && values.password && (
                            <p style={{margin: 0}}>We can't find your account</p>
                        )}
                        <ButtonElem title="Sign up" type='submit'/>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginWindow