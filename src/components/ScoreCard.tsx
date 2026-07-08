import "./ScoreCard.css";

type ScoreCardProps = {
  name: string;
  color: string;
  score: number;
  onInc: (points: number) => void;
  onDec: (points: number) => void;
  onEditName: (newName: string) => void;
};

function ScoreCard({
  name,
  color,
  score,
  onInc,
  onDec,
  onEditName,
}: ScoreCardProps) {
  const handleNameChange = () => {
    const newName = prompt("Edit name", name);
    if (newName) onEditName(newName);
  };

  return (
    <div className="score-card" style={{ borderColor: color }}>
      <div
        className="score-card__name"
        style={{ color }}
        onClick={handleNameChange}
        title="Click to Change"
      >
        {name}
      </div>
      <div className="score-card__panel">
        <div className="score-card__value" style={{ color }}>
          {score.toString().padStart(2, "0")}
        </div>
        <div className="score-card__controls">
          <button type="button" onClick={() => onDec(1)}>
            -1
          </button>
          <button type="button" onClick={() => onInc(1)}>
            +1
          </button>
          <button type="button" onClick={() => onInc(5)}>
            +5
          </button>
        </div>
      </div>
    </div>
  );
}

export default ScoreCard;
