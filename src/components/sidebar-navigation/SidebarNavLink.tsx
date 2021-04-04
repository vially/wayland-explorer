import React from 'react'
import { Link, useRoute } from 'wouter'

export const SidebarNavLink: React.FC<{ href: string; title?: string }> = (
    props
) => {
    const [isActive] = useRoute(props.href)

    return (
        <Link href={props.href}>
            <a
                href={props.href}
                title={props.title}
                className={`group border-l-4 py-2 px-3 flex items-center text-sm font-medium ${
                    isActive
                        ? 'bg-purple-50 border-purple-600 text-purple-600'
                        : 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
            >
                <span className="truncate">{props.children}</span>
            </a>
        </Link>
    )
}
