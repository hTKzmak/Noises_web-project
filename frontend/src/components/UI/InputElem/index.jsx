import style from './InputElem.module.scss'

function InputElem({type, placeholder, name, value, onChange}){
    return(
        <input className={style.inputStyle} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange}/>
    )
}

export default InputElem