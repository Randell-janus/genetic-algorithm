import { useAppContext } from "./context";

const SliderInput = ({ min, max, value, onChange }) => {
  const { generationCount } = useAppContext();
  return (
    <>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        step={10}
        className="slider-thumb slider-track"
        onChange={onChange}
      />
      <div className="flex justify-between text-xs md:text-sm italic">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </>
  );
};

export default SliderInput;
