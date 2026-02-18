import '@mining-sdk/fonts/jetbrains-mono.css'
import '@mining-sdk/core/styles.css'
import '@mining-sdk/foundation/src/styles/index.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'

import { router } from './router'
import './index.scss'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')

ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
