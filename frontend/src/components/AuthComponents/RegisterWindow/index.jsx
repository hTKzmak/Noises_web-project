import { ReactComponent as Logo } from '../../../assets/logo/Noises_logo.svg'
import { ReactComponent as Arrow } from './icons/arrow.svg'
import { useNavigate } from "react-router-dom"
import style from '../AuthStyles.module.scss'
import InputElem from '../../UI/InputElem'
import ButtonElem from '../../UI/ButtonElem'

function RegisterWindow() {

    const navigate = useNavigate();

    return (
        <div className={style.authPage}>
            <div className={style.authWindow}>
                <button onClick={() => navigate(-1)} className={style.backLink}>
                    <Arrow />
                </button>
                <div className={style.authHeader}>
                    <Logo />
                    <div className={style.navigation}>
                        <a href="/login" className={style.notActiveLink}>Sign in</a>
                        <a href="/registration" className={style.activeLink}>Sign up</a>
                    </div>
                </div>
                <div className="authMain">
                    <form>
                        <InputElem type='text' placeholder='Name' />
                        <InputElem type='email' placeholder='Email' />
                        <InputElem type='password' placeholder='Password' />
                        <ButtonElem title="Sign up" onclick={() => alert('Типа зарегался (◕ヮ◕)')} />
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterWindow