import React, { FC, MutableRefObject, useCallback, useEffect, useRef, useState } from 'react'
import { UpdateView, useUpdateView } from '../../hooks/updateView'
import Container from '../../modal/container'
import { Fields, Inputs, Output } from '../../modal/type'

function init(updateView: UpdateView): Container {
    const fields: Fields = ['id']
    const inputs: Inputs = ['aaa', 'bbb']
    return new Container(fields, inputs, updateView)
}

function ListenNumberEvent(ref: MutableRefObject<Output>) {
    document.addEventListener('keydown', (ev: KeyboardEvent) => {
        ref.current.datas[0] = getSelection()?.toString() || ''
    })
}

const Main: FC = () => {
    const updateView = useUpdateView()
    const [container] = useState(() => init(updateView))
    const [finishLoad, setFinishLoad] = useState(false)

    const [currentInput, setCurrentInput] = useState(container.getCurrentInput())
    const outputRef = useRef<Output>({id: 0, datas: []})
    const next = useCallback( () => {
        try {
            const hasNext = container.loadOutput(outputRef.current)

            if (hasNext) {
                setCurrentInput(container.getCurrentInput())
                outputRef.current = {id: outputRef.current.id+1, datas: []}
            } else {
                setFinishLoad(true)
            }
        } catch (error) {
            alert(error instanceof Error ? error.message : error)
        }
    }, [container])

    useEffect(() => {
        ListenNumberEvent(outputRef)
    }, [])

    if (finishLoad) {
        console.log(container.export())
    }

    return finishLoad ? <div>{'done'}</div> :
    <div>
        <div>{currentInput}</div>
        <button onClick={next}>Next</button>
    </div>
}

export default Main
