import style from './Search.module.scss'
import MusicItem from '../MusicList/items/MusicItem'
import PreviousButton from '../UI/PreviousButton'
import { songsdata } from '../PlayerApp/audios.js';
import { useState } from 'react';

function Search() {

    let [searchData, setSearchData] = useState([])

    function searchFunc(value) {
        let music = songsdata.filter(elem => elem.title.toLowerCase().includes(value.toLowerCase()))
        if (music && value) {
            setSearchData(music)
        }
        else if (music && !value) {
            setSearchData([])
        }
        else {
            setSearchData([])
        }
    }

    return (
        <div>
            <div className={style.searchHeader}>
                <PreviousButton />
                <input className={style.searchInput} type="text" placeholder="Search music" onChange={(event) => searchFunc(event.target.value)} />
            </div>
            <div className="searchResult">
                <div className={style.musicList}>
                    <p className={style.searchTitle}>{searchData.length === 0 ? 'All music' : 'Search result'}</p>

                    {searchData.length === 0 ?

                        songsdata.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} />
                        )

                        :

                        searchData.map(elem =>
                            <MusicItem key={elem.id} id={elem.id} title={elem.title} performer={elem.performer} />
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default Search