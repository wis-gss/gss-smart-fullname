import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { PersonModel } from '../../models/person.model';

@Component({
  selector: 'app-gss-smart-full-name',
  templateUrl: './gss-smart-full-name.component.html',
  styleUrls: ['./gss-smart-full-name.component.scss']
})
export class GssSmartFullNameComponent implements OnInit, OnDestroy {

  @Input() person: PersonModel;

  public personForm: FormGroup;
  public isShowFullName: boolean;

  private _fullNameFormValueChangedSub: Subscription;
  private _prefixFormValueChangedSub: Subscription;
  private _firstNameFormValueChangedSub: Subscription;
  private _middleNameFormValueChangedSub: Subscription;
  private _lastNameFormValueChangedSub: Subscription;
  private _suffixFormValueChangedSub: Subscription;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.isShowFullName = false;
    this.initForm();

    this.subscribe();
  }

  ngOnDestroy() {
    this._fullNameFormValueChangedSub && this._fullNameFormValueChangedSub.unsubscribe();
    this._prefixFormValueChangedSub && this._prefixFormValueChangedSub.unsubscribe();
    this._firstNameFormValueChangedSub && this._firstNameFormValueChangedSub.unsubscribe();
    this._middleNameFormValueChangedSub && this._middleNameFormValueChangedSub.unsubscribe();
    this._lastNameFormValueChangedSub && this._lastNameFormValueChangedSub.unsubscribe();
    this._suffixFormValueChangedSub && this._suffixFormValueChangedSub.unsubscribe();
  }

  private initForm() {
    this.personForm = this._fb.group({
      name: [''],
      prefix: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: ['', Validators.required],
      suffix: ['']
    });

    if (this.person) {
      this.personForm.patchValue({
        name: this.person.name,
        prefix: this.person.prefix,
        firstName: this.person.firstName,
        middleName: this.person.middleName,
        lastName: this.person.lastName,
        suffix: this.person.suffix,
      }, { emitEvent: false });
    }
  }

  public showFullName() {
    this.isShowFullName = !this.isShowFullName;
  }

  private subscribe() {
    this._fullNameFormValueChangedSub = this.personForm
      .get('name')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.parseFullName(value);
      });

    this. _prefixFormValueChangedSub = this.personForm
      .get('prefix')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.patchFullName(value, 0);
      });

    this._firstNameFormValueChangedSub = this.personForm
      .get('firstName')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.patchFullName(value, 1);
      });

    this._middleNameFormValueChangedSub = this.personForm
      .get('middleName')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.patchFullName(value, 2);
      });

    this._lastNameFormValueChangedSub = this.personForm
      .get('lastName')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.patchFullName(value, 3);
      });

    this._suffixFormValueChangedSub = this.personForm
      .get('suffix')
      .valueChanges
      .debounceTime(1000)
      .subscribe((value) => {
        this.patchFullName(value, 4);
      });
  }

  /**
   Case 1 word
   First word -> first name

   Case 2 words
   First word -> first name
   Second word -> last name

   Case 3 words
   First word -> first name
   Second word -> middle name
   Third word -> last name

   Case 4 words
   First word -> title
   Second word -> first name
   Third word -> middle name
   Fourth word -> last name

   Case 5 words
   First word -> title
   Second word -> first name
   Third word -> middle name
   Fourth word -> last name
   Fifth Word -> Suffix
   * @param {string} value
   */
  private parseFullName(value: string) {
    if (value.trim() !== '') {
      const result = value.trim().split(' ');

      let prefix = '',
        firstName = '',
        middleName = '',
        lastName = '',
        suffix = '';

      switch (result.length) {
        case 0: break;
        case 1: {
          firstName = result[0];
        } break;
        case 2: {
          firstName = result[0];
          lastName = result[1];
        } break;
        case 3: {
          firstName = result[0];
          middleName = result[1];
          lastName = result[2];
        } break;
        case 4: {
          prefix = result[0];
          firstName = result[1];
          middleName = result[2];
          lastName = result[3];
        } break;
        default: {
          prefix = result[0];
          firstName = result[1];
          middleName = result[2];
          lastName = result[3];
          suffix = result
            .map((el, index) => {
              if (index >= 4) {
                return el;
              }
            })
            .join(' ')
            .trim();
        } break;
      }

      this.personForm.patchValue({
        prefix: prefix,
        firstName: firstName,
        middleName: middleName,
        lastName: lastName,
        suffix: suffix,
      }, {emitEvent: false});
    }
  }

  /**
   * Patch all name parts into full name
   * @param {string} value
   * @param {number} position
   */
  private patchFullName(value: string, position: number) {
    const fullName = this.personForm.get('name').value;

    if (fullName[0] === '') {
      this.personForm.patchValue({ name: value }, {emitEvent: false});
    } else {
      const result = [
        this.personForm.get('prefix').value,
        this.personForm.get('firstName').value,
        this.personForm.get('middleName').value,
        this.personForm.get('lastName').value,
        this.personForm.get('suffix').value
      ];

      result[position] = value;
      this.personForm.patchValue( {
        name: result.join(' ').trim().replace(/ +(?= )/g, '')
      }, {emitEvent: false});
    }
  }
}
