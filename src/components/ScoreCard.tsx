type ScoreCardProps = {
  color: string;
  score: number;
  onInc: (points: number) => void;
  onDec: (points: number) => void;
};

function ScoreCard({ color, score, onInc, onDec }: ScoreCardProps) {
  return (
    <div className="score-card" style={{ borderColor: color }}>
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
  );
}

export default ScoreCard;
