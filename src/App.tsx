import 'vscode-codicons/dist/codicon.css'
import { Router } from 'wouter'
import './App.css'
import { WaylandProtocolViewer } from './pages/WaylandProtocolViewer'

function App() {
    return (
        <Router base="/protocols">
            <WaylandProtocolViewer />
        </Router>
    )
}

export default App
