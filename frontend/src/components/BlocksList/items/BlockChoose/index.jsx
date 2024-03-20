import style from './BlockChoose.module.scss'

function BlockChoose({key, title, background}) {

    return (
        <div className={style.blockItem} id={key}>
            <div className={style.blockChooseItem} style={{backgroundImage: `url(${background})`}}></div>
            <p>{title}</p>
        </div>
    )
}

export default BlockChoose