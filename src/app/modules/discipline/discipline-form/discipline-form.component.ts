import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discipline } from 'src/app/models/discipline-resource';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.css']
})
export class DisciplineFormComponent implements OnInit {

  public discipline: Discipline = new Discipline();

  public disciplineForm: FormGroup = new FormGroup({});

  public isEdit: boolean = true;

  public isUserAdmin: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data != null && this.data.id != null;
    this.checkFieldsAdmin();
    this.buildDisciplineForm();
  }

  private buildDisciplineForm() {
    this.disciplineForm = this.formBuilder.group({
      id: [{value: this.isEdit ? this.data.id : '', disabled: !this.isUserAdmin}],
      name: [{ value: this.isEdit ? this.data.name : '', disabled: !this.isUserAdmin }, Validators.required],
      startDateTime: [{ value: this.isEdit ? this.data.startDateTime : '', disabled: !this.isUserAdmin }, Validators.required],
      finalDateTime: [{ value: this.isEdit ? this.data.finalDateTime : '', disabled: !this.isUserAdmin }, Validators.required],
      dayOfWeek: [{ value: this.isEdit ? this.data.dayOfWeek : '', disabled: !this.isUserAdmin }, Validators.required],
      classroom: [{ value: this.isEdit ? this.data.classroom : '', disabled: !this.isUserAdmin }],
      image: [this.isEdit ? this.data.image : ''],
      teacher: [{ value: this.isEdit ? this.data.teacher : '', disabled: !this.isUserAdmin }]
    });
  }

  private checkFieldsAdmin() {
    if (!this.isUserAdmin) {
      this.disciplineForm.disable();
    }    
  }

  onImageChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      // Processar a imagem (por exemplo, converter para base64)
      const reader = new FileReader();
      reader.onloadend = () => {
        this.discipline.image = reader.result as string;
        this.disciplineForm.get('image')?.setValue(this.discipline.image);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    if (this.disciplineForm.valid) {
      console.log(this.disciplineForm.value);
    } else {
      // Trate os erros de validação, se necessário
    }
  }
}
