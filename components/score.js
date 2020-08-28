import React, { useState } from 'react';
import CountUp from 'react-countup';

export default function Score(props) {
  return (
    <div className="score-box">
      <div className="score-text">score</div>
      <div className="score">
        <CountUp
          start={props.score > 0 ? props.score-10 : 0}
          end={props.score} />
      </div>
    </div>
  );
}
