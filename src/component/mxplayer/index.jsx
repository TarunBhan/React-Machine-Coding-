import React, { useRef } from 'react'
const MxPlayer = () => {
    const videoRef = useRef()
    const fastForwardInterval = useRef()
    const handlePlay = () => {
        videoRef.current.play()
    }
    const handlePause = () => {
        videoRef.current.pause()
    }
    const handleSeek = () => {
        videoRef.current.currentTime = 10
    }

    const handleVolumeChange = (e) => {
        videoRef.current.volume = e.target.value
    }
    const handleIncreaseSpeed = () => {
        if (videoRef.current) {

            fastForwardInterval.current = setInterval(() => { videoRef.current.currentTime += 1 }, 100)
        }
    }
    const handleNormalSpeed = () => {
        if (videoRef.current) {
            clearInterval(fastForwardInterval.current)
        }
    }

    const handleFullScreen = () => {
        if (videoRef.current) {
            videoRef.current.requestFullscreen()
        }
    }
    return (
        <div>
            <video src='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' ref={videoRef} controls />
            <div className='px-5 flex flex-col w-1/3'>
                <button className='h-10 w-14 text-center bg-blue-500 text-white m-3 rounded-lg' onClick={handlePlay}>Play</button>
                <button className='h-10 w-14 text-center bg-blue-500 text-white m-3 rounded-lg' onClick={handlePause}>Pause</button>
                <button className='h-15 w-20 text-center bg-blue-500 text-white m-3 rounded-lg' onClick={handleSeek} >Forward to 10s</button>
                <button className='h-15 w-20 text-center bg-blue-500 text-white m-3 rounded-lg' onMouseDown={handleIncreaseSpeed} onMouseLeave={handleNormalSpeed}>Handle Speed Up</button>
                <button className='h-15 w-20 text-center bg-blue-500 text-white m-3 rounded-lg' onClick={handleFullScreen} >Full Screen</button>
                <button className='h-15 w-20 text-center bg-blue-500 text-white m-3 rounded-lg' onClick={handleNormalSpeed}>Normal Speed</button>
                <input type='range' min={'0'} max={1} step={0.1} onChange={handleVolumeChange} />
            </div>
        </div>
    )
}
export default MxPlayer