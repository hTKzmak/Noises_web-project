import BlocksList from "../components/BlocksList"
import MainBlock from "../components/MainBlock"

import FavMusicBG from '../assets/images/Fav_music.svg'
import FavAlbumsBG from '../assets/images/Fav_albums.svg'
import FavPerformersBG from '../assets/images/Fav_performers.svg'
import LatestMusicBG from '../assets/images/Latest_music.svg'

function HomePage() {

    let blockChooseArr = [
        { id: 1, title: 'Favorite music', background: FavMusicBG },
        { id: 2, title: 'Favorite albums', background: FavAlbumsBG },
        { id: 3, title: 'Favorite performers', background: FavPerformersBG },
        { id: 4, title: 'Latest music', background: LatestMusicBG }
    ]

    return (
        <main>
            <MainBlock />
            <BlocksList data={blockChooseArr}/>
        </main>
    )
}

export default HomePage