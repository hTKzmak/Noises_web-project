import style from './BlockChoose.module.scss'

function BlockChoose({id, title, background, withoutAnimation}) {
    return (
        <div className={style.blockItem} key={id}>
            <div className={withoutAnimation === true ? style.blockChooseItem_without_animation : style.blockChooseItem} style={{backgroundImage: `url(${background})`}}></div>
            <p>{title}</p>
        </div>
    )
}

export default BlockChoose