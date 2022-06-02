import { FC, useEffect, useRef, useState } from 'react';
import Container from '../../modal/container';
import { Fields, Inputs } from '../../modal/type';
import { IWorkspaceCoreProps, WorkspaceCore } from './components/workspace/workspace';
import { Origin } from '../../modal/origin';
import { ITag, ITextBlock } from './components/workspace/type';
import { createTags } from '../../utils/creator';
import './index.scss';

export interface ITagWorkspaceDataProps {
    fields: Fields;
    inputs: Inputs;
    origin: Origin;
    container: Container;
}
export interface ITagWorkspaceProps extends ITagWorkspaceDataProps {
    onFinished: (result: Origin) => void
}
export const TagWorkspace: FC<ITagWorkspaceProps> = ({ fields, origin, container, onFinished }) => {
    const tags = createTags(fields)
    const [textBlocks, setTextBlocks] = useState<ITextBlock[]>(container.curtTextBlocks)

    const updateTextBlocks = ({ type, field, color }: ITag) => {
        const selection = getSelection()
        if (!selection) {
            return
        }

        const id = selection.anchorNode?.parentElement?.dataset?.id
        const lineNumber = selection.anchorNode?.parentElement?.dataset.linenumber
        if (!id || !lineNumber) {
            return
        }

        const [start, end] = [selection.anchorOffset, selection.focusOffset].sort((a, b) => a - b)
        setTextBlocks((textBlocks) => {
            const res = textBlocks.reduce((prev, curt) => {
                if (String(curt.id) === id) {
                    const curtItems: ITextBlock[] = [
                        {
                            isPlain: true,
                            text: curt.text.slice(0, start),
                            type: '',
                            color: '',
                            field: '',
                            id: container.blockId++,
                            selectable: true,
                            position: {
                                lineNumber: curt.position.lineNumber,
                                start: 0,
                                end: start
                            }
                        },
                        {
                            isPlain: false,
                            text: curt.text.slice(start, end),
                            type,
                            color: color,
                            field,
                            id: container.blockId++,
                            selectable: true,
                            position: {
                                lineNumber: curt.position.lineNumber,
                                start: start,
                                end: end
                            }
                        },
                        {
                            isPlain: true,
                            text: curt.text.slice(end),
                            type: '',
                            color: '',
                            field: '',
                            id: container.blockId++,
                            selectable: true,
                            position: {
                                lineNumber: curt.position.lineNumber,
                                start: end,
                                end: curt.text.length - 1
                            }
                        }
                    ].filter((item) => item.text)

                    return [...prev, ...curtItems]
                } else {
                    return prev.concat(curt)
                }
            }, [] as ITextBlock[])
            return res
        })
    }

    useEffect(() => {
        const handleKeyDown = (ev: KeyboardEvent) => {
            const code = ev.key
            const tag = tags.find((tag) => tag.type === code)
            if (!tag) {
                return
            }

            updateTextBlocks(tag)
        }
        document.addEventListener('keydown', handleKeyDown)

        return () => document.removeEventListener('keydown', handleKeyDown)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const textAreaRef = useRef<HTMLDivElement>(null)
    const activeSpanIdRef = useRef(-1)
    useEffect(() => {
        const textArea = textAreaRef.current
        if (!textArea) {
            return
        }

        const updateSelectable = (ev: MouseEvent): void => {
            const target = ev.target as HTMLElement | null
            if (!target) {
                return
            }
            if (getSelection()?.type === 'Range') {
                return
            }

            const id = target.dataset.id
            if (String(activeSpanIdRef.current) === id) {
                return
            }
            activeSpanIdRef.current = Number(id ? id : 0)

            setTextBlocks((textBlocks) =>
                textBlocks.map((textBlock) => ({
                    ...textBlock,
                    selectable: String(textBlock.id) === id
                }))
            )
        }

        textArea.addEventListener('mousedown', (ev) => {
            getSelection()?.empty()
            activeSpanIdRef.current = -1

            updateSelectable(ev)
        })
        textArea.addEventListener('mouseover', updateSelectable)
    }, [setTextBlocks])

    const removeTag = (id: number) => {
        const combineText = (textBlocks: ITextBlock[]): ITextBlock[] => {
            const tagIndex = textBlocks.findIndex((item) => item.id === id)

            return textBlocks.reduce((prev, curt, index) => {
                if (tagIndex === index) {
                    const before = textBlocks[tagIndex - 1]
                    const after = textBlocks[tagIndex + 1]

                    const beforeText = before?.isPlain ? before.text : ''
                    const afterText = after?.isPlain ? after.text : ''
                    const text = beforeText + textBlocks[tagIndex].text + afterText

                    return prev.concat({
                        ...curt,
                        isPlain: true,
                        type: '',
                        field: '',
                        text
                    })
                } else if ((index === tagIndex - 1 || index === tagIndex + 1) && curt.isPlain) {
                    return prev
                } else {
                    return prev.concat(curt)
                }
            }, [] as ITextBlock[])
        }
        setTextBlocks(combineText)
    }

    const prev = () => {
        if (!container.hasPrev) { return }

        container.loadCurtTextBlocks(textBlocks)
        container.index--
        setTextBlocks(container.curtTextBlocks)
    }

    const next = () => {
        container.loadCurtTextBlocks(textBlocks)
        if (container.isFinished()) {
            onFinished({
                ...origin,
                result: container.exportList()
            })
        } else {
            container.index++
            setTextBlocks(container.curtTextBlocks)
        }
    }

    const workspaceCoreProps: IWorkspaceCoreProps = {
        hasPrev: container.hasPrev,
        tags,
        textBlocks,
        textAreaRef,
        removeTag,
        updateTextBlocks,
        prev,
        next,
    }
    return <WorkspaceCore {...workspaceCoreProps} />
};
