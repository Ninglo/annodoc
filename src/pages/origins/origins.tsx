import { FC, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useOrigins } from '../../hooks/data/useOrigins'
import Container from '../../modal/container'
import { Origin, removeOrigin, updateOrigin } from '../../modal/origin'
import Result from '../workspace/components/result'
import { TagWorkspace, ITagWorkspaceDataProps } from '../workspace/main'
import { IOriginTableProps, OriginTable } from './OriginTable'

function isValid(workspace: ITagWorkspaceDataProps | null): workspace is ITagWorkspaceDataProps {
    return !!workspace
}

const Origins: FC = () => {
    const navigate = useNavigate()
    const { origins, setQuery } = useOrigins({})
    const [workspace, setWorkspace] = useState<ITagWorkspaceDataProps | null>(null)
    const [result, setResult] = useState<Origin | null>(null)

    const originTableProps: IOriginTableProps = {
        origins,
        setQuery,
        removeOrigin(id) {
            removeOrigin(id).then(() => setQuery(query => ({ ...query })))
        },
        gotoTagWorkspace(workspace) {
            const container = new Container(workspace)
            setWorkspace({ ...workspace, container })
        },
        gotoResult: setResult,
        gotoCreateOrigin() { navigate('/createUser') }
    }

    const onFinished = (result: Origin) => {
        setResult(result)
        updateOrigin(result)
    }

    return result ? (
        <Result fields={result.fields} dataList={result.result} dataText={JSON.stringify(result.result)} />
    ) : isValid(workspace) ? (
        <TagWorkspace {...workspace} onFinished={onFinished} />
    ) : (
        <OriginTable {...originTableProps} />
    )
}

export default Origins
