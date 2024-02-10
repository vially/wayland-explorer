export const Badge: React.FC<{
    bgColor?: string
    textColor?: string
    fontWeigth?: string
    title?: string
    children?: React.ReactNode
}> = ({ children, bgColor, textColor, fontWeigth, title }) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs  ${
            fontWeigth || 'font-medium'
        } ${bgColor || 'bg-gray-100'} ${textColor || 'text-gray-800'}`}
        title={title}
    >
        {children}
    </span>
)
