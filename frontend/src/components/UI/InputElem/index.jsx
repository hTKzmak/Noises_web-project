import style from './InputElem.module.scss'

function InputElem({type, placeholder}){
    return(
        <input type={type} placeholder={placeholder}/>
    )
}

export default InputElem