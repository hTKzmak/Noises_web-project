import { useNavigate } from "react-router-dom";
import { ReactComponent as Arrow } from '../../../assets/icons/arrow.svg'
import style from './PreviousButton.module.scss'

function PreviousButton() {

    const navigate = useNavigate();

    return (
        <button onClick={() => navigate(-1)} className={style.previousBtn}>
            <Arrow />
        </button>
    )
}

export default PreviousButton