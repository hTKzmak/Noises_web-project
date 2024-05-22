import BlocksList from "../components/BlocksList"
import PreviousButton from "../components/UI/PreviousButton"

function AGPList({ title, showHeart, data, genresStyle }) {
    return (
        <main>
            <div className="title">
                <PreviousButton />
                <h1>{title}</h1>
            </div>
            <BlocksList data={data} withoutAnimation={true} showHeart={showHeart} genresStyle={genresStyle} />
        </main>
    )
}

export default AGPList