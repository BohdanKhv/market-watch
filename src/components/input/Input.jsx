import { useRef } from 'react'
import './styles/Input.css'

const Input = ({value, onChange, icon, type, placeholder, onFocus, onBlur, id }) => {
    const inputRef = useRef(null);

    return (
        <div className="input-wrapper"
            onClick={() => inputRef.current.focus()}
        >
            <input
                id={id ? id : ''}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                ref={inputRef}
                onFocus={onFocus}
                autoComplete="off"
                onBlur={onBlur}
            />
            <div className="input-icon">{icon}</div>
        </div>
    )
}

export default Input