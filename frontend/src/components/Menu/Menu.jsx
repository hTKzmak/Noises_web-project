import { Link } from 'react-router-dom'
import style from './Menu.module.css'
import { ReactComponent as Logo } from './media/Noises_logo.svg'
import { ReactComponent as Home } from './media/icons/home.svg'
import { ReactComponent as Albums } from './media/icons/albums.svg'
import { ReactComponent as Performers } from './media/icons/performers.svg'
import { ReactComponent as Genres } from './media/icons/genres.svg'

function Menu() {
    return (
        <div className={style.menu}>
            <div className={style.menuDesktop}>
                <Link to={'/'}>
                    <Logo />
                </Link>

                <div className={style.browseMusic}>
                    <h2>Browse music</h2>
                    <ul>
                        <Link to={'/'}>
                            <li>Home</li>
                        </Link>
                        <Link to={'/albums'}>
                            <li>Albums</li>
                        </Link>
                        <Link to={'/performers'}>
                            <li>Performers</li>
                        </Link>
                        <Link to={'/genres'}>
                            <li>Genre</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className={style.browseMusicMobile}>
                    <Link to={'/'}>
                        <Home/>
                    </Link>
                    <Link to={'/albums'}>
                        <Albums/>
                    </Link>
                    <Link to={'/performers'}>
                        <Performers/>
                    </Link>
                    <Link to={'/genres'}>
                        <Genres/>
                    </Link>
            </div>
        </div>
    )
}

export default Menu