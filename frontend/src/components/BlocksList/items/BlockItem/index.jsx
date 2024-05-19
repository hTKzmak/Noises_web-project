import style from './BlockItem.module.scss'

import { Link } from 'react-router-dom'
import { useState } from 'react'

import { ReactComponent as AddMusic } from '../../../../assets/icons/heart.svg'
import { ReactComponent as AddedMusic } from '../../../../assets/icons/heart_full.svg'

function BlockItem({ id, title, background, withoutAnimation, href, showHeart }) {

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false)

    function addFavorMusic() {
        setAddedFavor(!addedFavor)
    }

    return (
        <div className={style.blockItem} id={id}>
            <Link to={href}>
                <div className={withoutAnimation === true ? style.blockItemImg_withoutAnim : style.blockItemImg} style={{ backgroundImage: `url(${background})` }}></div>
                <p>{title}</p>
            </Link>
            
            {showHeart === true &&
                <div className={style.musicOtherInfo} onClick={() => addFavorMusic()}>
                    {!addedFavor ? <AddMusic /> : <AddedMusic />}
                </div>
            }
        </div>
    )
}

export default BlockItem