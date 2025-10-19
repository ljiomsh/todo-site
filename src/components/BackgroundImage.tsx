import React, { useState, useEffect } from 'react'
import { UnsplashResponse } from '../types'

const BackgroundImage: React.FC = () => {
    const [imageUrl, setImageUrl] = useState<string>('')
    const [, setLoading] = useState<boolean>(true)

    useEffect(() => {
        const fetchRandomImage = async (): Promise<void> => {
            setLoading(true)
            try {
                const accessKey = import.meta.env.VITE_UNSPLASH_ACCESS_KEY

                if (!accessKey) {
                    throw new Error('Unsplash access key not found in environment variables')
                }

                const response = await fetch(
                    'https://api.unsplash.com/photos/random?query=nature&orientation=landscape&topics=nature,wallpapers',
                    {
                        headers: {
                            Authorization: `Client-ID ${accessKey}`
                        }
                    }
                )
                const data: UnsplashResponse = await response.json()
                setImageUrl(data.urls.regular)
            } catch (error) {
                console.error('배경 이미지 로드 실패:', error)
                setImageUrl('https://images.unsplash.com/photo-1472214103451-9374bd1c798e')
            } finally {
                setLoading(false)
            }
        }

        fetchRandomImage()
    }, [])

    return (
        <>
            <div
                className="background-image"
                style={{ backgroundImage: `url(${imageUrl})` }}
            />
            <div className="background-overlay" /> {/* 반투명 오버레이 */}
        </>
    )
}

export default BackgroundImage 