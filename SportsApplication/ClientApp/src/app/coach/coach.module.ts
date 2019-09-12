import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoachComponent } from './coach.component';
import { EditTestComponent } from './edit-test/edit-test.component';
import { EditResultComponent } from './edit-test/edit-result/edit-result.component';
import { CreateTestComponent } from './create-test/create-test.component';
import { AtheleteListComponent } from './athelete-list/athelete-list.component';
import { AddNewAtheleteComponent } from './athelete-list/add-new-athelete/add-new-athelete.component';
import { AddNewAtheleteToTestComponent } from './edit-test/add-new-athelete-to-test/add-new-athelete-to-test.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthGuard } from '../auth/auth.guard';



@NgModule({
  declarations: [
    CoachComponent,
    EditTestComponent,
    EditResultComponent,
    CreateTestComponent,
    AtheleteListComponent,
    AddNewAtheleteComponent,
    AddNewAtheleteToTestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild([{path: 'coach', component: CoachComponent, canActivate: [AuthGuard]},
                            {path: 'createTest', component: CreateTestComponent, canActivate: [AuthGuard]},
                            {path: 'atheleteList', component: AtheleteListComponent, canActivate: [AuthGuard]},
                            {path: 'addNewAthelete', component: AddNewAtheleteComponent, canActivate: [AuthGuard]},
                            {path: 'editTest/:id', component: EditTestComponent, canActivate: [AuthGuard]},
                            {path: 'editResult/:id', component: EditResultComponent, canActivate: [AuthGuard]},
                            {path: 'addNewAtheleteToTest/:id', component: AddNewAtheleteToTestComponent, canActivate: [AuthGuard]}
                          ])
  ]
})
export class CoachModule { }
