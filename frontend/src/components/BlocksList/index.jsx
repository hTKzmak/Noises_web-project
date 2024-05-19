import style from './BlocksList.module.scss'
import BlockItem from "./items/BlockItem"

function BlocksList({data, withoutAnimation, showHeart}) {

    return (
        <div>
            <div className={style.blocksList}>
                {data.map(elem =>
                    <BlockItem key={elem.id} id={elem.id} title={elem.title} background={elem.background} href={elem.href} withoutAnimation={withoutAnimation} showHeart={showHeart}/>
                )}
            </div>
        </div>
    )
}

export default BlocksList