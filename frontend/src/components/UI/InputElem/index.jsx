import style from './InputElem.module.scss'

function InputElem({type, placeholder, name, value, onChange, maxLength}){
    return(
        <input className={style.inputStyle} type={type} placeholder={placeholder} name={name} value={value} onChange={onChange} maxLength={maxLength}/>
    )
}

export default InputElem