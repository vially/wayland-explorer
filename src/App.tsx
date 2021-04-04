import 'vscode-codicons/dist/codicon.css'
import { Router, useRoute } from 'wouter'
import './App.css'
import { MultiColumnLayout } from './components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from './components/outline/WaylandProtocolOutline'
import { WaylandProtocol } from './components/WaylandProtocol'
import { waylandProtocolRegistry } from './data/protocol-registry'
import { NotFound } from './pages/404'
import { Homepage } from './pages/Homepage'

function App() {
    let contentView = <Homepage />
    let outlineView = null

    const [match, params] = useRoute<{ protocolId: string }>(
        '/protocols/:protocolId'
    )

    if (match && params?.protocolId) {
        const protocolWithMetadata = match
            ? waylandProtocolRegistry.getProtocolWithMetadata(params.protocolId)
            : null

        contentView = protocolWithMetadata ? (
            <WaylandProtocol
                element={protocolWithMetadata.protocol}
                metadata={protocolWithMetadata.metadata}
            />
        ) : (
            <NotFound />
        )

        outlineView = protocolWithMetadata ? (
            <WaylandProtocolOutline element={protocolWithMetadata.protocol} />
        ) : null
    }

    return (
        <Router base="/protocols">
            <MultiColumnLayout outlineView={outlineView}>
                {contentView}
            </MultiColumnLayout>
        </Router>
    )
}

export default App
