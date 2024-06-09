import style from './InputElem.module.scss'

function InputElem({type, accept, placeholder, name, value, onChange, maxLength}){
    return(
        <input className={style.inputStyle} type={type} accept={accept} placeholder={placeholder} name={name} value={value} onChange={onChange} maxLength={maxLength}/>
    )
}

export default InputElem