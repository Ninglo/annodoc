import { FC } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from './provider'

export const App: FC = () => {

  return <BrowserRouter>
    <Provider></Provider>
  </BrowserRouter>

}
