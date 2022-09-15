import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.css']
})
export class DeleteMsgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMsgComponent>,public notificationService: NotificationService

    ) { }

  ngOnInit(): void {
  }
  onClose(){

    this.dialogRef.close(false);

  }
  onDelete(){
    //if(confirm('Are you sure to delete this record ?')){

      this.dialogRef.close(true);

        //this.toastr.success('Deleted successfully');
    //}
  }

}
