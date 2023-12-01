import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Discipline } from 'src/app/models/discipline-resource';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user-resource';
import { UserService } from 'src/app/services/user.service';
import { EnumUserRole } from '../../../enums/enum-roles';
import { RegistryFormComponent } from '../../registry/registry-form/registry-form.component';
import { DisciplineService } from 'src/app/services/discipline.service';

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

  imageFile: File | undefined;


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Discipline,
    private userService: UserService,
    private disciplineService: DisciplineService,
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
      id: [{value: this.isEdit ? this.data.id : null, disabled: !this.isUserAdmin}],
      name: [{ value: this.isEdit ? this.data.name : '', disabled: !this.isUserAdmin }, Validators.required],
      startDateTime: [{ value: this.isEdit ? this.data.startDateTime : '', disabled: !this.isUserAdmin }, Validators.required],
      finalDateTime: [{ value: this.isEdit ? this.data.finalDateTime : '', disabled: !this.isUserAdmin }, Validators.required],
      dayOfWeek: [{ value: this.isEdit ? this.data.dayOfWeek : '', disabled: !this.isUserAdmin }, Validators.required],
      classroom: [{ value: this.isEdit ? this.data.classroom : '', disabled: !this.isUserAdmin }],
      image: [this.isEdit ? this.data.image : ''],
      users:  [this.isEdit && this.data.teacher ? this.data.users : 1],
      teacher: [{ value: this.isEdit && this.data.teacher ? this.data.teacher : 1, disabled: !this.isUserAdmin }]
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
      this.imageFile = event.target.files[0];
      console.log('Arquivo selecionado:', this.imageFile);
      const reader = new FileReader();
      reader.onloadend = () => {
        this.discipline.image = reader.result as string;
        console.log('Arquivo selecionado 2:', this.discipline.image);
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit() {
    const disciplineData = this.disciplineForm.value;
    const formData = new FormData();
    formData.append('discipline', JSON.stringify(disciplineData));
  
    // Supondo que this.imageFile é um objeto File contendo a imagem
    if (this.imageFile) {
      this.convertToBase64(this.imageFile).then((imageBase64: string) => {
        formData.append('imageBase64', imageBase64);
  
        this.disciplineService.createDiscipline(disciplineData, imageBase64).subscribe(
          (response) => {
            console.log('Discipline created:', response);
          },
          (error) => {
            console.error('Error creating discipline:', error);
          }
        );
      });
    }
  }
  
  convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const base64String = reader.result?.toString().split(',')[1]; // Remove o cabeçalho 'data:image/png;base64,' da string base64
        resolve(base64String || '');
      };
      reader.onerror = (error) => reject(error);
    });
  }
  
  openDialogRegistry() {
    this.dialog.open(RegistryFormComponent, {
      width: '500px'
    });
  }
}
