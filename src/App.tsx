import React from 'react'
import 'vscode-codicons/dist/codicon.css'
import { useRoute } from 'wouter'
import './App.css'
import { MultiColumnLayout } from './components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from './components/outline/WaylandProtocolOutline'
import { WaylandProtocolLinks } from './components/sidebar-navigation/WaylandProtocolLinks'
import { WaylandProtocol } from './components/WaylandProtocol'
import { waylandProtocolRegistry } from './data/protocol-registry'

function App() {
    const [match, params] = useRoute<{ protocolId: string }>(
        '/protocols/:protocolId'
    )
    const protocolWithMetadata = match
        ? waylandProtocolRegistry.getProtocolWithMetadata(params?.protocolId!)
        : null

    const contentView = protocolWithMetadata ? (
        <WaylandProtocol
            element={protocolWithMetadata.protocol}
            metadata={protocolWithMetadata.metadata}
        />
    ) : null

    const outlineView = protocolWithMetadata ? (
        <WaylandProtocolOutline element={protocolWithMetadata.protocol} />
    ) : null

    return (
        <MultiColumnLayout
            protocolContentView={contentView}
            outlineView={outlineView}
            sidebarView={<WaylandProtocolLinks />}
        />
    )
}

export default App
