import { useEffect, useRef, useState } from "react"
import './styles/Alert.css'

const Alert = ({type, msg, setAlert}) => {
    const alertRef = useRef(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert('')
        }, 3000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="alert-wrapper">
            <div className={`alert${type ? ` alert-${type}` : ''}`} ref={alertRef}>
                {msg}
            </div>
        </div>
    )
}

export default Alert