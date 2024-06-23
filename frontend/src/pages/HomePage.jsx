import BlocksList from "../components/BlocksList"
import MainBlock from "../components/MainBlock"

import UserMusic from '../assets/images/userMusic.svg'
import Playlist from '../assets/images/playlist.svg'
import Settings from '../assets/images/settings.svg'
import LatestMusicBG from '../assets/images/Latest_music.svg'

function HomePage() {

    let blockChooseArr = [
        { id: 1, title: 'Browse music', background: Playlist, href: '/popular' },
        { id: 2, title: 'Your music', background: UserMusic, href: '/your_music' },
        { id: 3, title: 'Settings', background: Settings, href: '/settings' },
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