import { FormGroup, ValidationErrors } from '@angular/forms';
import { CrossFieldValidator } from '../cross-field.validator';

import { REAL_ESTATE_SITUATION_DETAILS } from '../wizard.constants';
const MISSING_VALUE_ERROR = 'wizard.missingWarning';

export class RenovationCostValidators extends CrossFieldValidator {

  validateFn(realEstateForm: FormGroup): boolean {
    if (!realEstateForm) {
      return true;
    }

    const marketValue = realEstateForm.get('marketValue').value;
    const purchasePrice = realEstateForm.get('purchasePrice').value;
    const renovationCosts = realEstateForm.get('renovation.renovationCosts').value;
    const renovationRequired = realEstateForm.get('renovation.renovationRequired').value;
    const desiredSituation = realEstateForm.get('situationDetails.desiredSituation').value;

    if (renovationRequired === REAL_ESTATE_SITUATION_DETAILS.RENOVATION_REQUIRED.NO) {
      return true;
    }
    const isRefinanceAnExistingBuilding = desiredSituation === REAL_ESTATE_SITUATION_DETAILS.DESIRED_SITUATION.REFINANCE_AN_EXISTING_BUSINESS_PREMISES;
    let loanAmount = 0;
    if (isRefinanceAnExistingBuilding) {
      loanAmount = marketValue;
    } else {
      if (marketValue > 0) {
        loanAmount = Math.min(marketValue, purchasePrice);
      } else {
        loanAmount = purchasePrice;
      }
    }
    return Number(renovationCosts) <= loanAmount;
  }

  validHandler(realEstateForm: FormGroup): void {
    this.removeError(realEstateForm.get('renovation.renovationCosts'), 'invalid');
  }

  invalidHandler(realEstateForm: FormGroup): ValidationErrors {
    this.setError(realEstateForm.get('renovation.renovationCosts'), { 'invalid': true });
    return this.createErrorMessage('renovationCostError', MISSING_VALUE_ERROR);
  }
}
