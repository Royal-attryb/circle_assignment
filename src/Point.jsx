import './Point.css';

export default function Point({ point }) {
  const side = 391;
  const radius = 391 / 2;

  function checkCircle(x, y) {
    if (((x - radius) ** 2) + ((y - radius) ** 2) <= (radius ** 2)) {
      return true;
    }
    return false;
  }

  const dynamicStyles = {
    position: 'absolute',
    top: point.y,
    left: point.x,
  };

  return (
    <div
      style={dynamicStyles}
      className={`point ${checkCircle(point.x, point.y) ? 'red' : 'blue'}`}
    ></div>
  );
}
