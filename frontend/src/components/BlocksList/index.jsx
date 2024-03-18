import MainBlock from "./items/MainBlock"
import style from './BlocksList.module.scss'
import BlockChoose from "./items/BlockChoose"


function Blocks() {
    return (
        <div>
            <div className="mainBlock">
                <MainBlock />
            </div>
            <div className={style.blocksList}>
                <BlockChoose/>
                <BlockChoose/>
                <BlockChoose/>
                <BlockChoose/>
            </div>
        </div>
    )
}

export default Blocks