import { useState } from 'react'
import StockTracker from './blocks/StockTracker'
import './app.scss';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StockTracker />
    </>
  )
}

export default App
