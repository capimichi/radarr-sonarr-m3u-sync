import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { ServicesProvider } from './servicesContext'
import AppRouter from './router'

function App() {

  return (
    <>
      <ServicesProvider>
        <AppRouter/>
      </ServicesProvider>
    </>
  )
}

export default App
