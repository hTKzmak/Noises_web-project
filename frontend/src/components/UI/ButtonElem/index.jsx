import style from './ButtonElem.module.scss'

function ButtonElem({title, type, name, onclick, warning}){
    return(
        <button onClick={onclick} type={type} name={name} className={!warning ? style.buttonElem : `${style.buttonElem} ${style.warning}`}>{title}</button>
    )
}

export default ButtonElem