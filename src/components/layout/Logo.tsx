export const Logo: React.FC = () => (
    <div className="flex items-center">
        <img className="h-8 w-auto" src="/protocols/logo.svg" alt="Logo" />
        <span
            className="font-black ml-2 truncate cursor-default"
            title="Wayland Explorer"
        >
            Wayland Explorer
        </span>
    </div>
)
