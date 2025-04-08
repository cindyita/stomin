import React from "react";

interface InputProps {
  name: string;
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  validate?: (value: string) => string | null; // Función de validación
}

const Input: React.FC<InputProps> = ({
  name,
  label,
  value,
  onChange,
  error,
  type = "text",
  validate,
}) => {
  // Validación
  const handleBlur = () => {
    if (validate) {
      const validationError = validate(value);
      if (validationError) {
        // Puedes mostrar el error de alguna forma
      }
    }
  };

  return (
    <div className="mb-3">
      <label htmlFor={name} className="form-label">
        {label}
      </label>
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onBlur={handleBlur}
        className={`form-control ${error ? "border-danger" : ""}`}
      />
      {error && <div className="text-danger">{error}</div>}
    </div>
  );
};

export default Input;
