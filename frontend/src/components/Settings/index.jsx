import { Link } from "react-router-dom"
import style from './Settings.module.scss'
import ButtonElem from "../UI/ButtonElem"
import { useState } from "react"

function Settings() {

    let [showWindow, setShowWindow] = useState(false)

    return (
        <div>
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
                        <a id="warning" onClick={() => setShowWindow(!showWindow)}>Delete account</a>
                    </li>
                </ul>
            </nav>

            {!showWindow ? null :
                <div className={style.modalWindow_bg}>
                    <div className={style.modalWindow}>
                        <h1>Are you shure what you want to delete your account?</h1>
                        <p>If you delete, you will never restore your account</p>

                        <div className={style.modalWindow_btn}>
                            <ButtonElem title={'Delete'} warning={true} />
                            <ButtonElem title={'Come back'} onclick={() => setShowWindow(!showWindow)}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default Settings