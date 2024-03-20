import MainBlock from "./items/MainBlock"
import style from './BlocksList.module.scss'
import BlockChoose from "./items/BlockChoose"

import FavMusicBG from "./images/Fav_music.png"
import FavAlbumsBG from "./images/Fav_albums.png"
import FavPerformersBG from "./images/Fav_performers.png"
import LatestMusicBG from "./images/Latest_music.png"

function Blocks() {

    let blockChooseArr = [
        { id: 1, title: 'Favorite music', background: FavMusicBG },
        { id: 2, title: 'Favorite albums', background: FavAlbumsBG },
        { id: 3, title: 'Favorite performers', background: FavPerformersBG },
        { id: 4, title: 'Latest music', background: LatestMusicBG }
    ]

    return (
        <div>
            <div className="mainBlock">
                <MainBlock />
            </div>
            <div className={style.blocksList}>
                {blockChooseArr.map(elem =>
                    <BlockChoose id={elem.id} title={elem.title} background={elem.background}/>
                )}
            </div>
        </div>
    )
}

export default Blocks