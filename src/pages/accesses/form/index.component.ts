import {Component, Injector} from '@angular/core';
import {BaseFormComponent} from "@panel";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AccessRepository} from "@identity";

@Component({
  selector: 'page-identity-accesses-form',
  templateUrl: 'index.component.html',
  styleUrls: ['./index.component.scss']
})
export class FormComponent extends BaseFormComponent {

  form = new FormGroup({
    id: new FormControl(undefined, []),
    name: new FormControl('', [Validators.required]),
    parentId: new FormControl(undefined, []),
  });

  constructor(injector: Injector, repository: AccessRepository) {
    super(injector, repository);
  }
}
