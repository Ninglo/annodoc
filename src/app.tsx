import { FC, useCallback, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"
import Origins from './pages/origins/origins'
import Upload from './pages/upload/upload'

export const App: FC = () => {

  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<Origins />} />
      <Route path="/createUser" element={<Upload />} />
    </Routes>
  </BrowserRouter>
}
