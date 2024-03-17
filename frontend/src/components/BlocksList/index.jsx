import Block from "./items/Block"
import style from './BlocksList.module.scss'


function Blocks() {
    return (
        <div className={style.blocksList}>
            <h1>I am Blocks</h1>
            <Block />
        </div>
    )
}

export default Blocks