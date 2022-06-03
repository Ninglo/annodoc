import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Result from '../workspace/components/result'
import { TagWorkspace, ITagWorkspaceDataProps } from '../workspace/main'
import { IOriginTableProps, OriginTable } from './OriginTable'
import { useOriginTable } from './hooks/useOriginTable'
import { useResult } from './useResult'

const Origins: FC = () => {
    const navigate = useNavigate()

    const [workspace, setWorkspace] = useState<ITagWorkspaceDataProps | null>(null)
    const { result, updateResult } = useResult()
    const originTableProps: IOriginTableProps = useOriginTable(setWorkspace, updateResult, navigate)

    return result ? (
        <Result dataList={result.result} dataText={JSON.stringify(result.result)} />
    ) : workspace ? (
        <TagWorkspace {...workspace} onFinished={updateResult} />
    ) : (
        <OriginTable {...originTableProps} />
    )
}

export default Origins
