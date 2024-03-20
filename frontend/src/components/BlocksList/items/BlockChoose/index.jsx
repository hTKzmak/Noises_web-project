import style from './BlockChoose.module.scss'

function BlockChoose({id, title, background}) {

    return (
        <div className={style.blockItem} key={id}>
            <div className={style.blockChooseItem} style={{backgroundImage: `url(${background})`}}></div>
            <p>{title}</p>
        </div>
    )
}

export default BlockChoose