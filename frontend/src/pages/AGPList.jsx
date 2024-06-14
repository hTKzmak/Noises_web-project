import { useState } from "react"
import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"
import CreatePlaylist from "../components/ModalWindow/CreatePlaylist"

function AGPList({ title, showHeart, showDelete, data, genresStyle, showCreateBtn }) {

    let [showWindow, setShowWindow] = useState(false)

    return (
        <main>
            <div className="AGP-header">
                <div className="title">
                    <PreviousButton />
                    <h1>{title}</h1>
                </div>

                {/* кнопка для создания плейлсита (отображается только в /playlists) */}
                {showCreateBtn && <div className="expand-icon" onClick={() => setShowWindow(true)}></div>}
            </div>

            {/* отображение окна для создание своего плейлиста */}
            {showWindow &&
                <CreatePlaylist setShowWindow={setShowWindow}/>
            }

            <BlocksList data={data} withoutAnimation={true} showHeart={showHeart} showDelete={showDelete} genresStyle={genresStyle} />
        </main>
    )
}

export default AGPList