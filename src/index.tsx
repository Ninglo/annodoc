import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './app'
import '@arco-design/web-react/dist/css/arco.css'
import './base/base.scss'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)
