import { useEffect, useState, useRef } from 'react'
import './styles/Avatar.css'

const Avatar = ({image, name, size}) => {
  const [loading, setLoading] = useState(true);
  const [imageErr, setImageErr] = useState(false);
  const imageRef = useRef(null);

  useEffect(() => {

    if (imageRef.current) {
        imageRef.current.addEventListener("load", () => {
            setLoading(true);

            // Cash image for offline use
            if ('caches' in window) {
                caches.open('companyImage').then(cache => {
                    cache.add(imageRef.current.src);
                })
            }
        })
    }

    return () => {
        if (imageRef.current) {
            imageRef.current.removeEventListener("load", () => {
                setLoading(false);
            });
        }
    }
}, [])

  return (
    <div 
      className={`avatar${size ? ` avatar-${size}` : ''}`}
    >
      { image ?
        <img
          className={`${loading ? '' : ' avatar-loading'}`}
          ref={imageRef}
          src={image} 
          alt={name} 
          decoding="async"
          loading="lazy"
          // onError={() => setImageErr(true)}
        />
        :
        name?.length === 1 ? name.toUpperCase() :
        name?.length > 1 ? name?.slice(0, 1).toUpperCase() :
        'AV'
      }
    </div>
  )
}

export default Avatar