import { Link } from 'wouter'
import { usePageTitle } from '../components/common/hooks-utils'

export const NotFound: React.FC = () => {
    usePageTitle('404 - Page not found')

    return (
        <div className="relative max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
            <h1 className="text-4xl font-extrabold tracking-tight text-black sm:text-5xl lg:text-6xl">
                404 - Page not found
            </h1>
            <div className="mt-6">
                <Link href="/" className="text-indigo-700">
                    Return to homepage
                </Link>
            </div>
        </div>
    )
}
