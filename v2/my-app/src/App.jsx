import { useState } from 'react'
import Img from './component/imageload'
import Form from './component/inputLoad'

import loginImg from './assets/image.png'
import registerImg from './assets/image1.png'
import forgotImg from './assets/image3.png'

function App() {
  const [mode, setMode] = useState('login')

  let currentImage = loginImg
  if (mode === 'register') currentImage = registerImg
  if (mode === 'forgot') currentImage = forgotImg

  return (
    <div id="par">
      <Img src={currentImage} alt={`${mode} illustration`} />
      <Form mode={mode} setMode={setMode} />
    </div>
  )
}

export default App
