import { MultiColumnLayout } from '../components/layout/MultiColumnLayout'
import { WaylandProtocolOutline } from '../components/outline/WaylandProtocolOutline'
import { WaylandProtocol } from '../components/WaylandProtocol'
import { useCallback, useEffect, useState } from 'react'

import { Link } from 'wouter'
import {
    WaylandProtocolSource,
    WaylandProtocolStability,
} from '../model/wayland-protocol-metadata'
import {
    Breadcrumbs,
    BreadcrumbSection,
} from '../components/breadcrumbs/Breadcrumbs'
import {
    getMergeRequest,
    getMergeRequestFiles,
    getMergeRequests,
    GitLabFile,
    GitLabMergeRequest,
    GitLabPaginationInfo,
} from '../gitlab-api'

const useGitLabMrList = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [page, setPage] = useState<GitLabPaginationInfo | null>(null)
    const [mrs, setMrs] = useState<GitLabMergeRequest[]>([])
    const [error, setError] = useState<string | null>(null)

    const load_more = useCallback(() => {
        // Sanity check for double load_more call
        if (isLoading) {
            return
        }

        setIsLoading(true)
        getMergeRequests(page?.endCursor)
            .then((res) => {
                setIsLoading(false)
                setError(null)
                setPage(res.pageInfo)
                setMrs([...mrs, ...res.mrs])
            })
            .catch((err: Error) => {
                setError(err.message)
                setIsLoading(false)
            })
    }, [mrs, page, isLoading])

    useEffect(
        () => { load_more() },
        // eslint-disable-next-line
        []
    )

    return {
        mrs,
        error,
        hasNextPage: page ? page.hasNextPage : false,
        isLoading,
        load_more,
    }
}

const useGitLabMr = (iid: string) => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [files, setFiles] = useState<GitLabFile[]>([])
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        let ignore = false

        setIsLoading(true)
        getMergeRequest(iid)
            .then(getMergeRequestFiles)
            .then((files) => {
                if (ignore) {
                    return
                }

                setError(null)
                setIsLoading(false)
                setFiles(files)
            })
            .catch((e: Error) => {
                if (ignore) {
                    return
                }

                setError(e.message)
                setIsLoading(false)
                setFiles([])
            })

        return () => {
            ignore = true
        }
    }, [iid])

    return {
        files,
        isLoading,
        error,
    }
}

const LoadingPill: React.FC<{}> = () => {
    return (
        <div className="mt-5 flex justify-center animate-pulse">
            <div className="rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:bg-gray-800 dark:border-black">
                Loading...
            </div>
        </div>
    )
}

const ErrorCard: React.FC<{ error: string }> = ({ error }) => {
    return (
        <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 dark:bg-stone-900"
            role="alert"
        >
            <p className="font-bold">Error</p>
            <p>{error}</p>
        </div>
    )
}

export const GitLabMrList: React.FC = () => {
    const { mrs, hasNextPage, isLoading, error, load_more } = useGitLabMrList()

    const contentView = (
        <div>
            <div className="py-4 border-b border-gray-200 mb-10 dark:border-gray-700">
                <div className="flex items-center">
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight dark:text-white">
                        Merge requests
                    </h1>
                </div>

                <Breadcrumbs>
                    <BreadcrumbSection href="https://gitlab.freedesktop.org/wayland">
                        wayland
                    </BreadcrumbSection>
                    <BreadcrumbSection href="https://gitlab.freedesktop.org/wayland/wayland-protocols">
                        wayland-protocols
                    </BreadcrumbSection>
                </Breadcrumbs>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {mrs.map((mr) => (
                    <div
                        key={mr.iid}
                        className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:bg-gray-800 dark:border-black"
                    >
                        <div className="w-full min-w-0">
                            <Link href={`/wayland-protocols/${mr.iid}`}>
                                <a
                                    href={`/wayland-protocols/${mr.iid}`}
                                    className="focus:outline-none"
                                >
                                    <span
                                        className="absolute inset-0"
                                        aria-hidden="true"
                                    />
                                    <div className="flex justify-between items-center">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                                            {mr.title}
                                        </div>
                                    </div>
                                    <p className="capitalize text-sm text-gray-500 truncate mt-2">
                                        !{mr.iid}
                                    </p>
                                </a>
                            </Link>
                        </div>
                    </div>
                ))}
            </div>

            {!isLoading && hasNextPage ? (
                <div className="mt-5 flex justify-center">
                    <button
                        className="rounded-lg border border-gray-300 bg-white px-6 py-3 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500 dark:bg-gray-800 dark:border-black"
                        onClick={load_more}
                    >
                        Show Older
                    </button>
                </div>
            ) : null}

            {isLoading ? <LoadingPill /> : null}
        </div>
    )

    const errorCard = error ? <ErrorCard error={error} /> : null

    return (
        <MultiColumnLayout hideSidebar={false}>
            {errorCard}
            {contentView}
        </MultiColumnLayout>
    )
}

export const GitLab: React.FC<{ iid: string }> = ({ iid }) => {
    const { files, isLoading, error } = useGitLabMr(iid)

    const contentView = !isLoading ? (
        <div>
            {files.map((file) => (
                <div key={file.path} id={file.name}>
                    <WaylandProtocol
                        element={file.protocol}
                        metadata={{
                            id: file.name.substring(0, file.name.length - 4),
                            name: file.protocol.name,
                            source: WaylandProtocolSource.External,
                            stability: WaylandProtocolStability.Unstable,
                            externalUrl: `https://gitlab.freedesktop.org${file.webPath}`,
                        }}
                    />
                </div>
            ))}
            {files.length === 0 ? <h1 className="text-center text-2xl mt-5">Not found</h1> : null}
        </div>
    ) : (
        <LoadingPill />
    )

    const outlineView = files && files.length !== 0 ? (
        <div>
            {files.map((file) => (
                <div key={file.name}>
                    {files.length > 1 ? (
                        <a
                            href={`#${file.name}`}
                            className="
                                group flex items-center text-sm font-medium
                                bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-800
                                border-l-4 border-black dark:border-white
                                hover:text-purple-500 hover:border-purple-600
                                py-2 px-3 mt-2 mb-2
                            "
                        >
                            <span className="truncate">{file.name}</span>
                        </a>
                    ) : null}
                    <WaylandProtocolOutline
                        key={file.name}
                        element={file.protocol}
                    />
                </div>
            ))}
        </div>
    ) : null

    const errorCard = error && <ErrorCard error={error} />

    return (
        <MultiColumnLayout outlineView={outlineView} hideSidebar={false}>
            {errorCard}
            {contentView}
        </MultiColumnLayout>
    )
}
