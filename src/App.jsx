import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Top from './pages/top'
import Setting from './pages/setting'
import Game from './pages/game'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/setting" element={<Setting />} />
          <Route path="/game" element={<Game />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App