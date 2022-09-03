import './styles/Box.css'

const Box = ({children, title}) => {
    return (
        <div className="box">
            <div className="box-title">
                <h3>{title}</h3>
            </div>
            <div className="box-content">
                {children}
            </div>
        </div>
    )
}

export default Box