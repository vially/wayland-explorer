import React from 'react'
import { Link } from 'wouter'
import { usePageTitle } from '../components/common/hooks-utils'
import { capitalizeFirstLetter } from '../components/common/utils'
import { ProtocolBadge } from '../components/content/ProtocolBadge'
import { waylandProtocolRegistry } from '../data/protocol-registry'

export const Homepage: React.FC = () => {
    usePageTitle('Wayland Protocol Documentation')

    return (
        <div className="py-12 lg:py-24 xl:py-32 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="lg:text-center">
                    <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">
                        Wayland Explorer
                    </h2>
                    <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                        A better way to read Wayland documentation
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        The most popular Wayland protocols all in one place and
                        without having to sift through different repositories
                        and XML files.
                    </p>
                    <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                        Start by reading the{' '}
                        <Link className="text-indigo-500" href="/wayland">
                            core Wayland protocol
                        </Link>{' '}
                        or discover some{' '}
                        <Link
                            className="text-indigo-500"
                            href="/xdg-decoration-unstable-v1"
                            title="XDG decoration"
                        >
                            uncut gems
                        </Link>
                        .
                    </p>
                </div>
                <div className="mt-12">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {waylandProtocolRegistry.protocols.map((protocol) => (
                            <div
                                key={protocol.id}
                                className="relative rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm flex items-center space-x-3 hover:border-gray-400 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-indigo-500"
                            >
                                <div className="w-full min-w-0">
                                    <Link href={`/${protocol.id}`}>
                                        <a
                                            href={`/${protocol.id}`}
                                            className="focus:outline-none"
                                        >
                                            <span
                                                className="absolute inset-0"
                                                aria-hidden="true"
                                            />
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm font-medium text-gray-900">
                                                    {protocol.name}
                                                </div>
                                                <ProtocolBadge
                                                    protocol={protocol}
                                                />
                                            </div>
                                            {protocol.protocol.description
                                                ?.summary && (
                                                <p className="text-sm text-gray-500 truncate mt-2">
                                                    {capitalizeFirstLetter(
                                                        protocol.protocol
                                                            .description
                                                            ?.summary
                                                    )}
                                                </p>
                                            )}
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
