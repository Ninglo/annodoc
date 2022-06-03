import { FC } from 'react'
import { IOriginTableProps, OriginTable } from './OriginTable'
import { useOriginTable } from './hooks/useOriginTable'

const Origins: FC = () => {
    const originTableProps: IOriginTableProps = useOriginTable()

    return (
        <OriginTable {...originTableProps} />
    )
}

export default Origins