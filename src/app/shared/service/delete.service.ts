import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DeleteMsgComponent } from '../component/delete-msg/delete-msg.component';

@Injectable({
  providedIn: 'root'
})
export class DeleteService {

 
  constructor(private dialog:MatDialog) { }

  openConfirmDialog(){
   return this.dialog.open(DeleteMsgComponent,{
      width : '390px',
      panelClass:'confirm-dialog-container',
      disableClose : true,
      position:{top:"48px"}
    })
    
  }
}
