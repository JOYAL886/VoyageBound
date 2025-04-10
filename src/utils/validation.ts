export interface ValidationRule {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => string | null;
}

interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export const validateForm = (
  formData: Record<string, string>,
  rules: Record<string, ValidationRule>
): ValidationResult => {
  const errors: Record<string, string> = {};

  Object.entries(rules).forEach(([field, rule]) => {
    const value = formData[field] || '';

    if (rule.required && !value) {
      errors[field] = 'This field is required';
      return;
    }

    if (rule.minLength && value.length < rule.minLength) {
      errors[field] = `Minimum length is ${rule.minLength} characters`;
      return;
    }

    if (rule.maxLength && value.length > rule.maxLength) {
      errors[field] = `Maximum length is ${rule.maxLength} characters`;
      return;
    }

    if (rule.pattern && !rule.pattern.test(value)) {
      errors[field] = 'Invalid format';
      return;
    }

    if (rule.custom) {
      const customError = rule.custom(value);
      if (customError) {
        errors[field] = customError;
      }
    }
  });

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};

export const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;

export const commonValidationRules = {
  email: {
    required: true,
    pattern: emailPattern,
  },
  password: {
    required: true,
    pattern: passwordPattern,
    minLength: 8,
  },
  name: {
    required: true,
    minLength: 2,
    maxLength: 50,
  },
  phone: {
    required: true,
    pattern: /^\+?[\d\s-]{10,}$/,
  },
}; 