import { compileNgModule } from '@angular/compiler';
import { NgModule } from '@angular/core';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatInputModule} from '@angular/material/input'
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatList, MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import {FlexLayoutModule} from "@angular/flex-layout";
// import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

const matModules=[
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    FlexLayoutModule,
    MatFormFieldModule,
    MatSidenavModule,
    MatToolbarModule,
    MatSlideToggleModule
    
]

@NgModule({
    imports:matModules,
    exports:matModules
})
export class materialModule{}