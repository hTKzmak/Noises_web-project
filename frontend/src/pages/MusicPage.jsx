import MusicList from "../components/MusicList"

function MusicPage({title, data, image, type}){
    return(
        <main>
            <MusicList title={title} data={data} image={image} type={type}/>
        </main>
    )
}

export default MusicPage