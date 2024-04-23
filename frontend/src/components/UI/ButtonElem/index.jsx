import style from './ButtonElem.module.scss'

function ButtonElem({title, type, onclick}){
    return(
        <button onClick={onclick} type={type} className={style.buttonElem}>{title}</button>
    )
}

export default ButtonElem