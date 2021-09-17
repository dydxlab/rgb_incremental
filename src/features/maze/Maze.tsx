import React, { useState } from 'react';


import styles from './Counter.module.css';

export function Maze() {

  function svgStart() {
    return (<svg height="300px" width="300px" fill="#229922"></svg>)
  }

  return (
    <div>
      {svgStart()}
    </div>
  );
}
