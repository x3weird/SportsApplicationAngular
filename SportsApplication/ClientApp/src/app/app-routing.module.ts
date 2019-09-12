import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found.component';
import { AuthGuard } from './auth/auth.guard';
import { AtheleteComponent } from './athelete/athelete.component';


const routes: Routes = [{path: 'athelete', component: AtheleteComponent, canActivate: [AuthGuard]},
                        {path: '', redirectTo: 'login', pathMatch: 'full'},
                        {path: '**', component: PageNotFoundComponent}
                      ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
