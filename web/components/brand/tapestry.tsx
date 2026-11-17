const PALETTE = [
  "#C96372",
  "#7B3688",
  "#35418E",
  "#F8E12D",
  "#54963D",
  "#CE6B00",
] as const;

const SQUARES = Array.from({ length: 24 }, (_, index) => {
  const position = (index * 5 + Math.floor(index / 12) * 2) % PALETTE.length;
  return PALETTE[position];
});

type TapestryBandProps = {
  className?: string;
  rows?: 1 | 2;
};

/** Faixa quadriculada inspirada na tapeçaria da marca. */
export function TapestryBand({ className = "", rows = 2 }: TapestryBandProps) {
  return (
    <div
      aria-hidden="true"
      className={`grid grid-cols-12 overflow-hidden ${className}`}
      style={{ gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` }}
    >
      {SQUARES.slice(0, rows * 12).map((color, index) => (
        <span
          key={`${color}-${index}`}
          className="block h-full w-full"
          style={{ backgroundColor: color }}
        />
      ))}
    </div>
  );
}
