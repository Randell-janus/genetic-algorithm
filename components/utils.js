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
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        className="mr-2 cursor-pointer text-rose-400 focus:ring-0"
        value={value}
        name="chart"
        defaultChecked={chartType === value}
      />
      {label}
    </label>
  );
};
export const SliderInput = ({ min, max, value, onChange }) => {
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

export const InputBox = ({
  type,
  maxLength,
  value,
  onChange,
  isLoading,
  min,
  max,
}) => {
  return (
    <input
      className="input-outline"
      required
      type={type}
      maxLength={maxLength}
      value={value}
      onChange={onChange}
      disabled={isLoading}
      min={min}
      max={max}
    />
  );
};

export const SelectBox = ({ value, onChange, isLoading }) => {
  return (
    <select
      className="select-box"
      required
      value={value}
      onChange={onChange}
      disabled={isLoading}
    >
      <option value={0.01}>0.01</option>
      <option value={0.02}>0.02</option>
      <option value={0.03}>0.03</option>
      <option value={0.04}>0.04</option>
      <option value={0.05}>0.05</option>
    </select>
  );
};

export const ResultsLayout = ({ children, label, spanText, pText }) => {
  return (
    <div className="sm:flex items-center space-x-0 sm:space-x-2 space-y-2 sm:space-y-0">
      <div className="flex space-x-2">
        {children}
        <h3 className="font-semibold">{label}</h3>
      </div>
      <p>
        <span className="font-semibold mr-1">{spanText}</span>
        {pText}
      </p>
    </div>
  );
};
