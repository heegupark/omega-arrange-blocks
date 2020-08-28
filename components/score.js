import React from 'react';
import { useSpring, animated } from 'react-spring'

export default function Score(props) {
  const spring = useSpring({
    number: props.score > 0 ? props.score : 0,
    from: {
      number: props.score > 0 ? props.score-10 : 0
    } })
  return (
    <div className="score-box">
      <div className="score-text">score</div>
      <div className="score">
        <animated.span>
          {spring.number.to(val => Math.floor(val))}
        </animated.span>
      </div>
    </div>
  );
}
