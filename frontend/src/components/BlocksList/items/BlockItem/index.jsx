import style from './BlockItem.module.scss'
import { Link } from 'react-router-dom'

function BlockItem({ id, title, background, withoutAnimation, href }) {
    return (
        <div className={style.blockItem} key={id}>
            <Link to={href}>
                <div className={withoutAnimation === true ? style.blockItemImg_withoutAnim : style.blockItemImg} style={{ backgroundImage: `url(${background})` }}></div>
                <p>{title}</p>
            </Link>
        </div>
    )
}

export default BlockItem