import { useEffect, useState, useRef } from 'react'
import './styles/Avatar.css'

const Avatar = ({image, name, size}) => {
  const [loading, setLoading] = useState(true);
  const [imageErr, setImageErr] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {
    if (imageRef.current) {
        imageRef.current.addEventListener("load", () => {
            setLoading(true)
        })
    }

    return () => {
        if (imageRef.current) {
            imageRef.current.removeEventListener("load", () => {
                setLoading(false)
            });
        }
    }
}, [])

  return (
    <div 
      className={`avatar${size ? ` avatar-${size}` : ''}`}
    >
      { image && !imageErr ?
        <img
          className={`${loading ? '' : ' avatar-loading'}`}
          ref={imageRef}
          src={image} 
          alt={name} 
          decoding="async"
          onError={() => setImageErr(true)}
        />
        :
        name.slice(0, 2).toUpperCase()
      }
    </div>
  )
}

export default Avatar