import style from './Search.module.scss'
import MusicItem from '../MusicList/items/MusicItem'
import { songsdata } from '../PlayerApp/audios.js';
import { useState } from 'react';

function Search() {

    let [searchData, setSearchData] = useState([])

    function searchFunc(value) {
        let music = songsdata.find(elem => elem.title.includes(value))
        if (songsdata.find(elem => elem.title.includes(value))) {
            if (!searchData.includes(music)) {
                setSearchData((prev) => [...prev, music]);
            }
        }
        else {
            setSearchData([])
        }
        console.log(searchData)

    }

    return (
        <div>
            <input className={style.searchInput} type="text" placeholder="Search music" onChange={(event) => searchFunc(event.target.value)} />
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