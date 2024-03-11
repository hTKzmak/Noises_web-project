import { Link } from 'react-router-dom'
import style from './Menu.module.css'
import { ReactComponent as Logo } from './media/Noises_logo.svg'

function Menu() {
    return (
        <div className={style.menu}>
            <div className={style.menuFixed}>
                <Link to={'/'}>
                    <Logo />
                </Link>

                <div className={style.browseMusicList}>
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
        </div>
    )
}

export default Menu