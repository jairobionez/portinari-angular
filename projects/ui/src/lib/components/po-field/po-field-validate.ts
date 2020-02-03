import { Input } from '@angular/core';
import { Validator, AbstractControl, ValidationErrors } from '@angular/forms';

import { PoField } from './po-field';
import { requiredFailed } from './validators';
import { convertToBoolean } from '../../utils/util';

export abstract class PoFieldValidate<T> extends PoField<T> implements Validator {

  private _required: boolean = false;
  private _optional: boolean = false;

  @Input('p-optional') set optional(value: boolean) {
    this._optional = convertToBoolean(value);
  }

  get optional() {
    return this._optional;
  }

  @Input('p-required') set required(value: boolean) {
    this._required = convertToBoolean(value);
  }

  get required() {
    return this._required;
  }

  private onValidatorChange: any;

  abstract stateValidate(control: AbstractControl): ValidationErrors;

  validate(control: AbstractControl): ValidationErrors {

    // avaliar quando for input number (0)
    if (requiredFailed(this.required, this.disabled, control.value)) {
      return {
        required: {
          valid: false
        }
      };
    }

    return this.stateValidate(control);
  }

  registerOnValidatorChange(fn: any) {
    this.onValidatorChange = fn;
  }

  validateModel() {
    if (this.onValidatorChange) {
      this.onValidatorChange();
    }
  }

}
