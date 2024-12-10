import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectionsRoutingModule } from './connections.routing.module';
import { ConnectionsComponent } from './connections/connections.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { SharedModule } from 'src/app/shared/shared.module';
import { ConnectionsService } from './services/connections.service';

@NgModule({
  declarations: [
    ConnectionsComponent
  ],
  imports: [
    CommonModule,
    ConnectionsRoutingModule,
    SharedModule,
    ModalModule,
    FormsModule,
    ReactiveFormsModule,
    TooltipModule.forRoot(),
  ],
  providers: [
    ConnectionsService
  ]
})
export class ConnectionsModule { }
