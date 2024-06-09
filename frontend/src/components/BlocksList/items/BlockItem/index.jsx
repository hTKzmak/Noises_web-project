import style from './BlockItem.module.scss'

import { Link } from 'react-router-dom'
import { useState } from 'react'

import { ReactComponent as AddMusic } from '../../../../assets/icons/heart.svg'
import { ReactComponent as AddedMusic } from '../../../../assets/icons/heart_full.svg'

function BlockItem({ id, title, background, withoutAnimation, href, showHeart, genresStyle }) {

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false)

    function addFavorMusic() {
        setAddedFavor(!addedFavor)
    }

    const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
    let userData = storedObject

    return (
        <div className={!genresStyle ? style.blockItem : style.blockGenre} id={id}>
            <Link to={href}>
                <div className={withoutAnimation === true ? style.blockItemImg_withoutAnim : style.blockItemImg} style={{ backgroundImage: `url(${background})` }}></div>
                <p>{title}</p>
            </Link>

            {(userData.length !== 0 && showHeart === true) &&
                <div className={style.musicOtherInfo} onClick={() => addFavorMusic()}>
                    {!addedFavor ? <AddMusic /> : <AddedMusic />}
                </div>
            }
        </div>
    )
}

export default BlockItem