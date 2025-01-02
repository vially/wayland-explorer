import React from 'react'
import { Link } from 'wouter'

export const Footer: React.FC = () => (
    <footer aria-labelledby="footerHeading">
        <h2 id="footerHeading" className="sr-only">
            Footer
        </h2>
        <div className="max-w-7xl mx-auto py-8">
            <div className="border-t border-gray-200 pt-8 md:flex md:items-center md:justify-between">
                <div className="flex space-x-6 md:order-2">
                    <a
                        href="https://github.com/vially/wayland-explorer"
                        target="_blank"
                        rel="noreferrer"
                        className="text-gray-400 hover:text-gray-500"
                    >
                        <span className="sr-only">GitHub</span>
                        <svg
                            className="h-6 w-6"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                fillRule="evenodd"
                                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </a>
                </div>
                <div className="space-y-4">
                    <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
                        © 2025 <Link href="/">Wayland Explorer</Link>
                    </p>
                    <p className="text-gray-400 text-sm">
                        This website is not affiliated in any way with the
                        official Wayland project. All content on this website is
                        automatically generated from the Wayland protocol XML
                        files.
                    </p>
                    <p className="text-gray-400 text-sm">
                        The{' '}
                        <a
                            href="https://github.com/microsoft/vscode-codicons"
                            target="_blank"
                            rel="noreferrer"
                        >
                            Visual Studio Code - Codicons
                        </a>{' '}
                        used on this website are licensed under{' '}
                        <a
                            href="https://github.com/microsoft/vscode-codicons/blob/main/LICENSE"
                            target="_blank"
                            rel="noreferrer"
                        >
                            CC BY 4.0
                        </a>
                        .
                    </p>
                </div>
            </div>
        </div>
    </footer>
)
