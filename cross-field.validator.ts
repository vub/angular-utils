import { AbstractControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export abstract class CrossFieldValidator {

  abstract validateFn(formGroup: FormGroup): boolean;
  abstract validHandler(formGroup: FormGroup): void;
  abstract invalidHandler(formGroup: FormGroup): ValidationErrors | null;

  getValidator(): ValidatorFn {
    return (formGroup: FormGroup) => {
      if (!this.validateFn(formGroup)) {
        return this.invalidHandler(formGroup);
      } else {
        this.validHandler(formGroup);
        return null;
      }
    }
  }

  setError(formControl: AbstractControl, error: { [key: string]: any } = {}): void {
    formControl.setErrors({ ...formControl.errors, ...error });
  }

  removeError(formControl: AbstractControl, errorKey: string): void {
    if (formControl.errors && formControl.errors[errorKey]) {
      const errors = formControl.errors;
      delete errors[errorKey];
      const newErrorList = Object.keys(errors).length === 0 ? null : { ...errors };
      formControl.setErrors(newErrorList);
    }
  }

  createErrorMessage(message: string, parameters = null): { [key: string]: any } {
    const result: { [key: string]: any } = {};
    result[message] = parameters;
    return result;
  }
}
