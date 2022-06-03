import React from "react"
import Origins from "./pages/origins/origins"
import Upload from "./pages/upload/upload"
import Result from "./pages/result/result"
import { TagWorkspace } from "./pages/workspace/main"

type IRouter = {
    path: string,
    name: string,
    element: React.ReactElement
    show: boolean
}
export const routes: IRouter[] = [
    {
        path: '/',
        name: '标注文本列表',
        element: <Origins />,
        show: true,
    },
    {
        path: '/upload',
        name: '上传标注文本',
        element: <Upload />,
        show: true,
    },
    {
        path: '/result',
        name: '结果展示',
        element: <Result />,
        show: false,
    },
    {
        path: '/workspace',
        name: '标注页',
        element: <TagWorkspace />,
        show: false,
    }
]