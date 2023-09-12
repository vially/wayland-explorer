import { useRoute } from 'wouter'
import { useAnalytics } from './analytics/plausible'
import { MultiColumnLayout } from './components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from './components/outline/WaylandProtocolOutline'
import { WaylandProtocol } from './components/WaylandProtocol'
import { waylandProtocolRegistry } from './data/protocol-registry'
import { NotFound } from './pages/404'
import { Homepage } from './pages/Homepage'
import { GitLab } from './pages/GitLab'

function App() {
    let contentView = <Homepage />
    let outlineView = null

    const [isGitlab, gitlabParams] = useRoute<{ iid: string }>('/wayland-protocols/:iid')

    const [match, params] = useRoute<{ protocolId: string }>('/:protocolId')
    const isHomepage = !match && !isGitlab

    useAnalytics().trackPageview()

    if (isGitlab && gitlabParams?.iid) {
        return <GitLab iid={gitlabParams?.iid}></GitLab>
    } else if (match && params?.protocolId) {
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
        <MultiColumnLayout outlineView={outlineView} hideSidebar={isHomepage}>
            {contentView}
        </MultiColumnLayout>
    )
}

export default App
