import style from './loading.module.scss'
import { FC } from 'react'

type LoadingTypes = {
    isWhite?: boolean
}

const Loading: FC<LoadingTypes> = ({ isWhite = false }) => {
    return (
        <div className={`${isWhite && style.ldsWhiteRing} ${style.ldsRing}`}><div></div><div></div><div></div><div></div></div>
    )
}

export default Loading