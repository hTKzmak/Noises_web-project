import style from './BlockItem.module.scss'

function BlockItem({ id, title, background, withoutAnimation }) {
    return (
        <div className={style.blockItem} key={id}>
            <div className={withoutAnimation === true ? style.blockItemImg_withoutAnim : style.blockItemImg} style={{backgroundImage: `url(${background})`}}></div>
            <p>{title}</p>
        </div>
    )
}

export default BlockItem