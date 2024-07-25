type Props = {
  labelName: string;
  type: string;
  name: string;
  placeholder: string;
  value: string;
  handleChange: (event: any) => void;
  isRandom?: boolean;
  handleRandom?: () => void;
};

function Form({ labelName, type, name, placeholder, value, handleChange, isRandom, handleRandom }: Props) {
  return (
    <div>
      <div className="flex items-center gap-2 mb-2">
        <label htmlFor={name} className="block text-sm font-medium text-gray-900">
          {labelName}
        </label>
        {isRandom && (
          <button
            type="button"
            onClick={handleRandom}
            className="font-semibold text-xs bg-[#ececf1] py-1 px-2 rounded-[5px] text-black"
          >
            Surprise me
          </button>
        )}
      </div>
      <input
        type={type}
        id={name}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        required
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-[#4649ff] focus:border-[#4649ff] outline-none block w-full p-3"
      />
    </div>
  );
}

export default Form;
