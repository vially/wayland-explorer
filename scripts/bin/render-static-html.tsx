import * as fs from 'fs/promises'
import { minify } from 'html-minifier'
import * as path from 'path'
import { renderToString } from 'react-dom/server'
import { Router } from 'wouter'
import staticLocationHook from 'wouter/static-location'
import App from '../../src/App'
import { waylandProtocolRegistry } from '../../src/data/protocol-registry'

const buildDir = path.resolve(__dirname, '../../build/protocols')

interface StaticPageDescriptor {
    routerPath: string
    fileName: string
    pageTitle: string
}

async function main() {
    const indexHTMLPlaceholder = await readIndexHTML()

    const renderPage = async (page: StaticPageDescriptor) => {
        await renderAndWriteHTML(indexHTMLPlaceholder, page)
        console.log(`✔ ${page.routerPath} rendered`)
    }

    await Promise.all(allPageDescriptors().map(renderPage))
}

function allPageDescriptors(): StaticPageDescriptor[] {
    const staticPages: StaticPageDescriptor[] = [
        {
            routerPath: '/',
            fileName: 'index.html',
            pageTitle: 'Wayland Protocol Documentation | Wayland Explorer',
        },
        {
            routerPath: '/404',
            fileName: '404.html',
            pageTitle: '404 - Page not found',
        },
        {
            routerPath: '/wayland-protocols/0',
            fileName: 'wayland-protocols-gitlab.html',
            pageTitle: 'Git',
        },
    ]

    const protocolPages: StaticPageDescriptor[] =
        waylandProtocolRegistry.protocols.map((protocol) => ({
            routerPath: `/${protocol.id}`,
            fileName: `${protocol.id}.html`,
            pageTitle: `${protocol.name} protocol | Wayland Explorer`,
        }))

    return [...staticPages, ...protocolPages]
}

async function renderAndWriteHTML(
    indexHTML: string,
    { routerPath, fileName, pageTitle }: StaticPageDescriptor
): Promise<void> {
    const contentHTML = renderToString(
        <Router hook={staticLocationHook(routerPath)} base="/protocols">
            <App />
        </Router>
    )

    const html = injectContentIntoHTML(contentHTML, pageTitle, indexHTML)
    await fs.writeFile(path.join(buildDir, fileName), html)
}

async function readIndexHTML(): Promise<string> {
    const htmlFilePath = path.join(buildDir, 'index.html')
    return fs.readFile(htmlFilePath, { encoding: 'utf-8' })
}

function injectContentIntoHTML(
    contentHTML: string,
    pageTitle: string,
    indexHTMLPlaceholder: string
): string {
    const minifiedContentHTML = minify(contentHTML, {
        collapseWhitespace: true,
    })
    const contentPlaceholder = '<div id="root"></div>'
    const contentReplacement = `<div id="root">${minifiedContentHTML}</div>`

    const titlePlaceholder = '<title>Wayland Explorer</title>'
    const titleReplacement = `<title>${pageTitle}</title>`

    return indexHTMLPlaceholder
        .replace(titlePlaceholder, titleReplacement)
        .replace(contentPlaceholder, contentReplacement)
}

main()
