import { useAppContext } from "./context";

export const FormLayout = ({ children, inputLabel, condition }) => {
  return (
    <div className="space-y-4">
      <p className="font-semibold">
        {inputLabel} <span className="font-normal">{condition}</span>
      </p>
      <div className="realtive">{children}</div>
    </div>
  );
};

export const RadioButton = ({ value, label, chartType }) => {
  const { loading } = useAppContext();

  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className="mr-2 cursor-pointer text-rose-400 focus:ring-0"
        value={value}
        name="chart"
        defaultChecked={chartType === value}
        disabled={loading}
      />
      {label}
    </label>
  );
};
export const SliderInput = ({ min, max, value, onChange }) => {
  const { loading } = useAppContext();

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
        disabled={loading}
      />
      <div className="flex justify-between text-xs md:text-sm italic">
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </>
  );
};

export const InputBox = ({ type, maxLength, value, onChange, min, max }) => {
  const { loading } = useAppContext();

  return (
    <input
      className="input-outline"
      required
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      min={min}
      max={max}
      disabled={loading}
    />
  );
};

export const SelectBox = ({ value, onChange }) => {
  const { loading } = useAppContext();

  return (
    <select
      className="select-box"
      required
      value={value}
      onChange={onChange}
      disabled={loading}
    >
      <option value={0}>0</option>
      <option value={0.01}>0.01</option>
      <option value={0.02}>0.02</option>
      <option value={0.03}>0.03</option>
      <option value={0.04}>0.04</option>
      <option value={0.05}>0.05</option>
    </select>
  );
};
