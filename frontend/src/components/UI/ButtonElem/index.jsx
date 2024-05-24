import style from './ButtonElem.module.scss'

function ButtonElem({title, type, onclick, warning}){
    return(
        <button onClick={onclick} type={type} className={!warning ? style.buttonElem : `${style.buttonElem} ${style.warning}`}>{title}</button>
    )
}

export default ButtonElem