import style from './ButtonElem.module.scss'

function ButtonElem({title, onclick}){
    return(
        <button onClick={onclick} className={style.buttonElem}>{title}</button>
    )
}

export default ButtonElem