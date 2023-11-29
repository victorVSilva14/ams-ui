import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discipline } from 'src/app/models/discipline-resource';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user-resource';
import { UserService } from 'src/app/services/user.service';
import { EnumUserRole } from '../../../enums/enum-roles';
import { RegistryFormComponent } from '../../registry/registry-form/registry-form.component';

@Component({
  selector: 'app-discipline-form',
  templateUrl: './discipline-form.component.html',
  styleUrls: ['./discipline-form.component.css']
})
export class DisciplineFormComponent implements OnInit {

  public discipline: Discipline = new Discipline();

  public disciplineForm: FormGroup = new FormGroup({});

  public isEdit: boolean = true;

  public isUserAdmin: boolean = false;

  public user: User = new User();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private userService: UserService,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.isEdit = this.data != null && this.data.id != null;
    this.getUserByUsername();
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

  getUserByUsername(): void {
    if (this.userService.currentUserValue && this.userService.currentUserValue.username) {
      this.authService.findByUsername(this.userService.currentUserValue.username)
        .subscribe(
          (data) => {
            this.user = data;
            this.isUserAdmin = data.roles === EnumUserRole.ROOT;
            this.checkFieldsAdmin();
          },
          (error) => {
            console.error('Erro ao buscar usuário:', error);
          }
        );
    }
  }

  checkIsUserAdmin() {
    this.isUserAdmin = this.user != null && this.user.roles === EnumUserRole.ROOT;
  }

  private checkFieldsAdmin() {
    if (!this.isUserAdmin) {
      this.disciplineForm.disable();
    } else {
      this.disciplineForm.enable();
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

  openDialogRegistry() {
    this.dialog.open(RegistryFormComponent, {
      width: '500px'
    });
  }
}
