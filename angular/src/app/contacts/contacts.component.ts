import {Component, OnInit} from '@angular/core'
import {FormControl, FormGroup, Validators} from '@angular/forms'

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  myForm!: FormGroup

  ngOnInit() {
    this.myForm = new FormGroup({
      email: new FormControl('', [
        Validators.email,
        Validators.minLength(7),
        Validators.required
      ]),
      message: new FormControl('', [
        Validators.minLength(20),
        Validators.maxLength(1500),
        Validators.required
      ])
      /* checkbox: new FormControl('', [
      Validators.required
      ])*/
    })
  }

  submit() {
    if (this.myForm.valid) {
      console.log('Form: ', this.myForm);

      const formData = {...this.myForm.value}

      console.log('Form Data: ', formData);

      this.myForm.reset()
    }
  }
}
