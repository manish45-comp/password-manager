import PropTypes from "prop-types";
const TextField = ({
  label,
  type,
  placeholder,
  onChange,
  value,
  onKeyDown,
  className,
  name,
}) => {
  return (
    <div className="mb-3">
      <label
        className="w-full mb-1 text-sm hidden md:block text-gray-500"
        htmlFor={value}
      >
        {label}
      </label>
      <input
        name={name}
        className={`${className} block h-12 mt-2 w-full text-white`}
        type={type}
        label={label}
        value={value}
        onChange={onChange}
        required
        placeholder={placeholder}
        autoComplete="true"
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.string,
  onKeyDown: PropTypes.func,
  className: PropTypes.string,
  name: PropTypes.string,
};

export default TextField;
