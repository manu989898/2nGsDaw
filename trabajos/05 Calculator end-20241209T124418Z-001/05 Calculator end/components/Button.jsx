import "./Button.css";

export default function Button({ symbol, color, handleClick }){
  return (
    <div
      onClick={() => handleClick(symbol)}
      className="button-wrapper"
      style={{ backgroundColor: color }}
    >
      {symbol}
    </div>
  );
}
