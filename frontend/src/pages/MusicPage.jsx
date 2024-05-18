import MusicList from "../components/MusicList"

function MusicPage({title, data, image}){
    return(
        <main>
            <MusicList title={title} data={data} image={image}/>
        </main>
    )
}

export default MusicPage