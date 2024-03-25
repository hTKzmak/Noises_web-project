import ButtonElem from '../UI/ButtonElem'
import style from './NotFound.module.scss'
import { useNavigate } from "react-router-dom";

function NotFound() {

    const navigate = useNavigate();

    return (
        <div className={style.errorMessage}>
            <h1>404</h1>
            <h3>We couldn’t find this page you are looking for.</h3>
            <ButtonElem title="return to Home Page" onclick={() => navigate('/')}/>
        </div>
    )
}

export default NotFound