import './Random.css';
import Point from './Point.jsx';
import { useEffect, useState } from 'react';

export default function Random() {
  const [numPoints, setNumPoints] = useState(0);
  const [displayedPoints, setDisplayedPoints] = useState([]);
    
  useEffect(() => {
    const points = generateRandomPoints(numPoints, { min: 0, max: 391 }, { min: 0, max: 391 });

    // Display points one by one with a delay of 500 milliseconds
    const displayPointsWithDelay = async () => {
      for (let i = 0; i < numPoints; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setDisplayedPoints((prevPoints) => [...prevPoints, points[i]]);
      }
    };

    // Reset displayed points when the number of points changes
    setDisplayedPoints([]);

    // Display points with delay when numPoints changes
    if (numPoints > 0) {
      displayPointsWithDelay();
    }
  }, [numPoints]);
  
  function generateRandomPoints(numPoints, xRange, yRange) {
    const points = [];

    for (let i = 0; i < numPoints; i++) {
      const x = getRandomNumber(xRange.min, xRange.max);
      const y = getRandomNumber(yRange.min, yRange.max);
      points.push({ x, y });
    }

    return points;
  }

  function getRandomNumber(min, max) {
    return Math.random() * (max - min) + min;
  }

  function displayPoint(point, index) {
    return <Point key={index} point={point} />;
  }

  function handleSubmit(event) {
    console.log(event.target[0].value);
    setNumPoints(event.target[0].value);
    event.preventDefault();
  }

  function handleClear() {
    setNumPoints(0);
  }

  return (
    <div className='random-wrapper'>
      <div className='input-wrapper'>
        <p>Enter number of points:</p>
        <form onSubmit={handleSubmit}>
          <input type='text' className='input-box'></input>
          <button type='submit'>Submit</button>
          <button type='button' onClick={handleClear}>
            Clear
          </button>
        </form>
      </div>
      <div className='box'>{displayedPoints.map(displayPoint)}</div>
    </div>
  );
}
