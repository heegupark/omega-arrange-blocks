import React from 'react';
import { useSpring, animated } from 'react-spring'

export default function Score(props) {
  const spring = useSpring({ number: 1, from: { number: 0 } })
  return (
    <div className="score">
      <animated.span>
        {`SCORE: ${spring.number}`}
      </animated.span>
    </div>
  );
}
