import React, { useEffect, useRef, useState } from "react";
import { ParentContainer, Snake } from "./Test.styles";

const Test = () => {
  const [snakeLength, setSnakeLength] = useState(0)
  const [direction, setDirection] = useState(null)
  const [fruitPost, setFruitPost] = useState(0)
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const step = 5;
  const handleFruitPosition = () => {
    const pos = Math.floor((Math.random() * (500 - 0)) + 0)
    console.log(pos);
    setFruitPost(pos)
  }
  const requestRef = useRef()

  const animate = () => {
    console.log('render');
    setPosition((prev) => {
      let newTop = prev.top;
      let newLeft = prev.left;

      switch (direction) {
        case 'up':
          newTop = Math.max(prev.top - step, 0)
          break;
        case 'down':
          newTop = Math.min(prev.top + step, 500 - 20)
          break;
        case 'left':
          newLeft = Math.max(prev.left - step, 0)
          break;
        case 'right':
          newLeft = Math.min(prev.left + step, 500 - 20)
          break;
        default:
          break;
      }
      return { top: newTop, left: newLeft }

    })
    requestRef.current = requestAnimationFrame(animate);

  }

  const handleKeypress = (event) => {
    console.log('event', event.key);
    switch (event.key) {
      case 'ArrowUp':
        setDirection('up');
        break;
      case 'ArrowDown':
        setDirection('down');
        break;
      case 'ArrowLeft':
        setDirection('left');
        break;
      case 'ArrowRight':
        setDirection('right');
        break;
      default:
        break;
    }
  }

  useEffect(() => {
    // handleFruitPosition()
    window.addEventListener('keydown', handleKeypress)
    requestRef.current = requestAnimationFrame(animate);
    return () => {
      window.removeEventListener('keydown', handleKeypress);
      cancelAnimationFrame(requestRef.current)
    }
  }, [direction])

  console.log(position.top);
  return <ParentContainer>

    <div style={{ height: '20px', width: '20px', background: 'red', position: 'absolute', top: `${position.top}px`, left: `${position.left}px`, transition: 'top 3s linear, left 3s linear' }}> </div>
    <div style={{ position: 'absolute', top: `${fruitPost}px`, width: '20px', height: '20px', background: 'yellow' }}></div>
  </ParentContainer>;
};

export default Test;
