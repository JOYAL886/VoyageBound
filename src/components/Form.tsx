import React, { useState } from 'react';
import { validateForm, ValidationRule } from '../utils/validation';

interface FormField {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  required?: boolean;
  validation?: ValidationRule;
}

interface FormProps {
  fields: FormField[];
  onSubmit: (data: Record<string, string>) => void;
  submitText?: string;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  fields,
  onSubmit,
  submitText = 'Submit',
  className = '',
}) => {
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationRules = fields.reduce((acc, field) => {
      if (field.validation) {
        acc[field.name] = field.validation;
      }
      return acc;
    }, {} as Record<string, ValidationRule>);

    const { isValid, errors: validationErrors } = validateForm(formData, validationRules);
    setErrors(validationErrors);

    if (isValid) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`space-y-4 ${className}`}>
      {fields.map((field) => (
        <div key={field.name} className="space-y-1">
          <label
            htmlFor={field.name}
            className="block text-sm font-medium text-gray-700"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          <input
            type={field.type}
            id={field.name}
            name={field.name}
            value={formData[field.name] || ''}
            onChange={handleChange}
            placeholder={field.placeholder}
            required={field.required}
            aria-invalid={!!errors[field.name]}
            aria-describedby={errors[field.name] ? `${field.name}-error` : undefined}
            className={`w-full px-3 py-2 border rounded-md ${
              errors[field.name]
                ? 'border-red-500 focus:ring-red-500 focus:border-red-500'
                : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
            }`}
          />
          {errors[field.name] && (
            <p
              id={`${field.name}-error`}
              className="text-sm text-red-500"
              role="alert"
            >
              {errors[field.name]}
            </p>
          )}
        </div>
      ))}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        {submitText}
      </button>
    </form>
  );
};

export default Form; 