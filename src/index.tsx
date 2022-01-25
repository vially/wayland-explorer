import React from 'react'
import { hydrate, render } from 'react-dom'
import '@vscode/codicons/dist/codicon.css'
import { Router } from 'wouter'
import { setupAnalytics } from './analytics/plausible'
import App from './App'
import './index.css'
import reportWebVitals from './reportWebVitals'

setupAnalytics()

const hydrateOrRender = process.env.NODE_ENV === 'production' ? hydrate : render

hydrateOrRender(
    <React.StrictMode>
        <Router base="/protocols">
            <App />
        </Router>
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
