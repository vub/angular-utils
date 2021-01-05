import { Component, Injector, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { RenovationCostValidators } from './renovation-cost.validator';

@Component({
  templateUrl: './real-estate.component.html',
})
export class RealEstateComponent implements OnInit, OnDestroy, IWizardStep {

  constructor(
  ) {
  }


  buildForm(): void {

    this.realEstateForm = new FormGroup({
        situationDetails: new FormGroup({
          currentSituation: new FormControl(this.realEstateData.situationDetails.currentSituation, [Validators.required]),
          desiredSituation: new FormControl(this.realEstateData.situationDetails.desiredSituation, [Validators.required]),
          realisationOfConstruction: new FormControl(this.realEstateData.situationDetails.realisationOfConstruction, []),
        }, []),
        knownAddress: new FormControl( this.realEstateData.knownAddress, [Validators.required]),

      }, [new SituationValidators().getValidator(), new RenovationCostValidators().getValidator()]);
  }

}
