import './styles/Skeleton.css'

const Skeleton = ({width, height, type, animation, className}) => {
    return (
        <div 
            className={`skeleton${type ? ` skeleton-${type}` : ''}${animation ? ` skeleton-animation-${animation}` : ''}${className ? ` ${className}` : ''}`}
            style={{
                width: width ? `${width}px` : undefined,
                height: height ? `${height}px` : undefined,
                minWidth: type === 'circular' ? `${width}px` : undefined,
                minHeight: type === 'circular' ? `${height}px` : undefined,
            }}
        />
    )
}

export default Skeleton