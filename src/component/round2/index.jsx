
import { useRef } from 'react';
import './index.css'

const BoxWidget = () => {
    const circleRef = useRef();

    const handleMouseMove = (e) => {
        const xPos = e.clientX;
        const yPos = e.clientY
        circleRef.current.style.left = `${xPos}px`
        circleRef.current.style.top = `${yPos}px`
    }

    return (
        <div className='parent-div' onMouseMove={handleMouseMove}>
            <div className='circle' ref={circleRef} />
        </div >
    )
}
export default BoxWidget