import PreviousButton from "../components/UI/PreviousButton"
import { Link } from 'react-router-dom'

function SettingsPage(){
    return (
        <main>
            <div className="title">
                <PreviousButton />
                <h1>Settings</h1>
            </div>
            <nav>
                <ul>
                    <li>
                        <Link to={'/'}>Customize profile</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Change password</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Log out</Link>
                    </li>
                    <li>
                        <Link to={'/'}>Delete account</Link>
                    </li>
                </ul>
            </nav>
        </main>
    )
}

export default SettingsPage