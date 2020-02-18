import React, { useEffect, useState } from 'react'

import Slider from './Slider'
import './App.css'

const link =
  'https://gist.githubusercontent.com/manfredxu99/df3be12d855d2e8825d30784a43d4b31/raw/d5efd3062343703df33bf0ec1b0c469fb83cb9f9/cat.json'

function App() {
  const [cats, setCats] = useState([])

  useEffect(() => {
    fetch(link)
      .then(resp => resp.json())
      .then(resp => setCats(resp.cats.map(cat => cat.src)))
  }, [])

  return (
    <div className="App">
      <div className="slider-wrapper">
        <Slider images={cats} />
      </div>
    </div>
  )
}

export default App
