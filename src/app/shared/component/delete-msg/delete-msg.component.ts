import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { NotificationService } from '../../service/notification.service';

@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.css']
})
export class DeleteMsgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMsgComponent>,public notificationService: NotificationService,
    
    ) { }

  ngOnInit(): void {
  }
  onClose(){
  
    this.dialogRef.close();

  }
  onDelete(){
    //if(confirm('Are you sure to delete this record ?')){
  
        this.onClose();

        this.notificationService.success(' Deleted successfully');
    //}
  }

}
