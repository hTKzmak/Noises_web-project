import Settings from "../components/Settings"
import PreviousButton from "../components/UI/PreviousButton"

function SettingsPage(){
    return (
        <main>
            <div className="title">
                <PreviousButton />
                <h1>Settings</h1>
            </div>
            <Settings/>
        </main>
    )
}

export default SettingsPage