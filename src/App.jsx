import React from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import Top from './pages/top'
import Setting from './pages/setting'

class App extends React.Component {
  render(){
    return(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Top />} />
          <Route path="/setting" element={<Setting />} />
        </Routes>
      </BrowserRouter>
    )
  }
}

export default App