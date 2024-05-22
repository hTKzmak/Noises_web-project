import { Link } from "react-router-dom"

function Settings() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to={'/'}>Customize profile</Link>
                </li>
                <li>
                    <Link to={'/'}>Change password</Link>
                </li>
                <li>
                    <a id="warning" href='/' onClick={() => localStorage.clear()}>Log out</a>
                </li>
                <li>
                    <a id="warning" href='/'>Delete account</a>
                </li>
            </ul>
        </nav>
    )
}

export default Settings