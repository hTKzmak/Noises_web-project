import BlocksList from "../components/BlocksList"
import MainBlock from "../components/MainBlock"

import FavMusicBG from '../assets/images/Fav_music.svg'
import FavAlbumsBG from '../assets/images/Fav_albums.svg'
import FavPerformersBG from '../assets/images/Fav_performers.svg'
import LatestMusicBG from '../assets/images/Latest_music.svg'

function HomePage() {

    let blockChooseArr = [
        { id: 1, title: 'Favorite music', background: FavMusicBG, href: '/favorite_music' },
        { id: 2, title: 'Favorite albums', background: FavAlbumsBG, href: '/albums' },
        { id: 3, title: 'Favorite performers', background: FavPerformersBG, href: '/performers' },
        { id: 4, title: 'Latest music', background: LatestMusicBG, href: '/latest_music' }
    ]

    return (
        <main>
            <MainBlock />
            <BlocksList data={blockChooseArr}/>
        </main>
    )
}

export default HomePage