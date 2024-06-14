import style from './BlockItem.module.scss'

import { Link } from 'react-router-dom'
import { useState } from 'react'

import { ReactComponent as AddMusic } from '../../../../assets/icons/heart.svg'
import { ReactComponent as AddedMusic } from '../../../../assets/icons/heart_full.svg'
import { ReactComponent as Trash } from '../../../../assets/icons/trash.svg'

function BlockItem({ id, title, background, withoutAnimation, href, showHeart, showDelete, genresStyle }) {

    // нужен для добавления любимой музыки
    let [addedFavor, setAddedFavor] = useState(false)


    // чтобы добавить музыку или что-либо ещё в любимые, мы должны передать id
    function addFavorMusic() {
        setAddedFavor(!addedFavor)
    }

    function deletePlaylist(){
        alert('o(TヘTo)')
    }

    const storedObject = JSON.parse(localStorage.getItem('userData')) || [];
    let userData = storedObject

    return (
        <div className={!genresStyle ? style.blockItem : style.blockGenre} id={id}>
            <Link to={href}>
                <div className={withoutAnimation === true ? style.blockItemImg_withoutAnim : style.blockItemImg} style={{ backgroundImage: `url(${background})` }}></div>
                <p>{title}</p>
            </Link>

            {(userData.length !== 0) &&
                <div className={style.musicOtherInfo}>
                    {showHeart === true &&
                        (!addedFavor ? <AddMusic onClick={() => addFavorMusic()} /> : <AddedMusic onClick={() => addFavorMusic()}/>)
                    }
                    {showDelete === true &&
                        <Trash onClick={() => deletePlaylist()}/>
                    }
                </div>
            }
        </div>
    )
}

export default BlockItem