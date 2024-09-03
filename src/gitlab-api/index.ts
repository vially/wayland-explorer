import {
    WaylandElementType,
    WaylandProtocol as WaylandProtocolModel,
} from '../model/wayland'
import { transformXMLElement, xmlParser } from '../lib/xml-protocol-transformers'

export interface GitLabFile {
    name: string
    webPath: string
    path: string
    protocol: WaylandProtocolModel
}

export interface GitLabMergeRequest {
    iid: number
    title: string
    diffStats: { path: string }[]
    diffHeadSha: string
}

export interface GitLabPaginationInfo {
    endCursor: string
    hasNextPage: boolean
}

export interface GetMergeRequestsResponse {
    pageInfo: GitLabPaginationInfo
    mrs: GitLabMergeRequest[]
}

async function callGraphQl(query: string): Promise<any> {
    const body = JSON.stringify({ query })
    return await fetch('https://gitlab.freedesktop.org/api/graphql', {
        method: 'post',
        body,
        headers: new Headers({
            'Content-Type': 'application/json',
            'Content-Length': body.length.toString(),
        }),
    })
}

function xml_filter({ path }: { path: string }) {
    return path.endsWith('.xml')
}

export async function getMergeRequestFiles(
    mr: GitLabMergeRequest
): Promise<GitLabFile[]> {
    const paths = mr.diffStats.map(({ path }) => path)
    const response = await callGraphQl(`{
      project(fullPath: "wayland/wayland-protocols") {
        repository {
          blobs(ref: "${mr.diffHeadSha}", paths: ${JSON.stringify(paths)}) {
            nodes {
              name
              webPath
              path
              rawBlob
            }
          }
        }
      }
    }`)

    const nodes: {
        name: string
        webPath: string
        path: string
        rawBlob: string
    }[] = (await response.json()).data.project.repository.blobs.nodes

    return nodes.reduce<GitLabFile[]>((out, node) => {
        const xmlData = xmlParser.parse(node.rawBlob)
        const protocol = transformXMLElement<WaylandProtocolModel>(
            xmlData['protocol'],
            WaylandElementType.Protocol
        )

        if (protocol !== undefined) {
            out.push({
                name: node.name,
                webPath: node.webPath,
                path: node.path,
                protocol,
            })
        }

        return out
    }, [])
}

export async function getMergeRequests(
    after: string | undefined
): Promise<GetMergeRequestsResponse> {
    const after_arg = after ? `after: "${after}"` : ''
    const response = await callGraphQl(`{
      project(fullPath: "wayland/wayland-protocols") {
        mergeRequests ( state: opened first: 20 ${after_arg} ) {
          pageInfo {
            endCursor
            hasNextPage
          }
          nodes {
            iid
            title
            diffHeadSha
            diffStats { path }
          }
        }
      }
    }`)

    const json = await response.json()
    const mergeRequests = json.data.project.mergeRequests
    const nodes: GitLabMergeRequest[] = mergeRequests.nodes
    const mrs = nodes
        .map((node) => {
            node.diffStats = node.diffStats.filter(xml_filter)
            return node
        })
        .filter((node) => node.diffStats.length > 0)

    return {
        pageInfo: mergeRequests.pageInfo,
        mrs,
    }
}

export async function getMergeRequest(
    iid: string
): Promise<GitLabMergeRequest> {
    const response = await callGraphQl(`{
      project(fullPath: "wayland/wayland-protocols") {
        mergeRequest ( iid: "${iid}" ) {
          iid
          title
          diffHeadSha
          diffStats { path }
        }
      }
    }`)

    const raw_json = await response.json()
    const mergeRequest: GitLabMergeRequest = raw_json.data.project.mergeRequest
    mergeRequest.diffStats = mergeRequest.diffStats.filter(xml_filter)
    return mergeRequest
}
