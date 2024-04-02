import style from './BlocksList.module.scss'
import BlockChoose from "./items/BlockChoose"

function BlocksList({data, withoutAnimation}) {

    return (
        <div>
            <div className={style.blocksList}>
                {data.map(elem =>
                    <BlockChoose id={elem.id} title={elem.title} background={elem.background} withoutAnimation={withoutAnimation}/>
                )}
            </div>
        </div>
    )
}

export default BlocksList