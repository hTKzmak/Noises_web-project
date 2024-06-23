import { Link } from 'react-router-dom'
import style from './Menu.module.scss'
import { ReactComponent as Logo } from '../../assets/logo/Noises_logo.svg'
import { ReactComponent as Home } from './media/icons/home.svg'
import { ReactComponent as Popular } from '../../assets/icons/popular.svg'
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
                        <Link to={'/popular'}>
                            <li>Popular music</li>
                        </Link>
                        <Link to={'/new'}>
                            <li>New music</li>
                        </Link>
                    </ul>
                </div>
            </div>

            <div className={style.browseMusicMobile}>
                <Link to={'/'}>
                    <Home />
                </Link>
                <Link to={'/popular'}>
                    <Popular />
                </Link>
                <Link to={'/new'}>
                    <Genres />
                </Link>
            </div>
        </div>
    )
}

export default Menu