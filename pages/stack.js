import React, { useEffect, useState} from 'react';
import { Motion, spring } from 'react-motion';
import range from 'lodash.range';

function reinsert(arr, from, to) {
  const _arr = arr.slice(0);
  const val = _arr[from];
  _arr.splice(from, 1);
  _arr.splice(to, 0, val);
  return _arr;
}

function clamp(n, min, max) {
  return Math.max(Math.min(n, max), min);
}

const springConfig = { stiffness: 300, damping: 50 };

export default function Stack(props) {
  const [topDeltaY, setTopDeltaY] = useState(0);
  const [mouseY, setMouseY] = useState(0);
  const [isPressed, setIsPressed] = useState(false);
  const [originalPosOfLastPressed, setOriginalPosOfLastPressed] = useState(0);
  const [order, setOrder] = useState(0);
  const containerRef = React.createRef()
  const height = 50;
  const heightWithMargin = 55;
  const result = {}

  const itemsCount = props.items.length || 0;
  useEffect(() => setOrder(range(itemsCount)), [itemsCount])

  const handleTouchStart = (key, pressLocation, e) => {
    handleMouseDown(key, pressLocation, e.touches[0]);
  };

  const handleTouchMove = (e) => {
    handleMouseMove(e.touches[0]);
  };

  const handleMouseDown = (pos, pressY, { pageY }) => {
    setTopDeltaY(pageY - pressY)
    setMouseY(pressY)
    setIsPressed(true)
    setOriginalPosOfLastPressed(pos)
  };

  const handleMouseMove = ({ pageY }) => {
    if (isPressed) {
      const mouseY = pageY - topDeltaY;
      const currentRow = clamp(Math.round(mouseY / heightWithMargin), 0, itemsCount - 1);
      let newOrder = order;
      if (currentRow !== order.indexOf(originalPosOfLastPressed)) {
        newOrder = reinsert(order, order.indexOf(originalPosOfLastPressed), currentRow);
      }
      setMouseY(mouseY)
      setOrder(newOrder)
    }
  };
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    }
  }, [isPressed]);

  const checkWin = (result) => {
    const value = Object.values(result)
    let firstIdx = 0
    let secondIdx = 1
    while(firstIdx < value.length && secondIdx < value.length) {
      if (value[firstIdx] > value[secondIdx]) return false
      firstIdx++
      secondIdx++
    }
    return true
  }

  const handleMouseUp = () => {
    setIsPressed(false)
    setTopDeltaY(0)
    if (event.target.id && event.target.id !== '__next') {
      for (let i of event.target.parentNode.children) {
        result[Math.abs(Math.round(Number(i.style.transform.split('px,')[1]) / heightWithMargin))] = Number(i.id)
      }
      if (checkWin(result)) {
        props.setScore(props.score + 10)
        setTimeout(() => {
          props.generateItems('number', 5, 5)
        }, 1000)
        props.generateItems('number', 1, 1)
      }
    }

  };
  useEffect(() => {
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchend', handleMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchend', handleMouseUp);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="container">
      {props.items.map((item, index) => {
        result[index] = item
        const style = originalPosOfLastPressed === index && isPressed
          ? {
            scale: spring(1.1, springConfig),
            shadow: spring(16, springConfig),
            y: mouseY,
          }
          : {
            scale: spring(1, springConfig),
            shadow: spring(1, springConfig),
            y: spring(order.indexOf(index) * heightWithMargin, springConfig),
          };
        return (
          <Motion style={style} key={index}>
            {({ scale, shadow, y }) =>
              <div
                id={item}
                onMouseDown={handleMouseDown.bind(null, index, y)}
                onTouchStart={handleTouchStart.bind(null, index, y)}
                style={{
                  height: `${height}px`,
                  lineHeight: `${height}px`,
                  boxShadow: `rgba(0, 0, 0, 0.2) 0px ${shadow}px ${2 * shadow}px 0px`,
                  transform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  WebkitTransform: `translate3d(0, ${y}px, 0) scale(${scale})`,
                  zIndex: index === originalPosOfLastPressed ? 99 : index,
                }}>
                {item}
              </div>
            }
          </Motion>
        );
      })}
    </div>
  );
}
