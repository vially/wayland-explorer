export const Badge: React.FC<{ bgColor?: string; textColor?: string }> = ({
    children,
    bgColor,
    textColor,
}) => (
    <span
        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-${
            bgColor || 'gray-100'
        } text-${textColor || 'gray-800'}`}
    >
        {children}
    </span>
)
