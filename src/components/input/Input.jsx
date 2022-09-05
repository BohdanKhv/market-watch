import { useRef } from 'react'
import './styles/Input.css'

const Input = ({value, onChange, icon, type, placeholder, onFocus, onBlur }) => {
    const inputRef = useRef(null);

    return (
        <div className="input-wrapper"
            onClick={() => inputRef.current.focus()}
        >
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={inputRef}
                onFocus={onFocus}
                onBlur={onBlur}
            />
            <div className="input-icon">{icon}</div>
        </div>
    )
}

export default Input