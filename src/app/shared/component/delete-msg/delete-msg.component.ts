import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-delete-msg',
  templateUrl: './delete-msg.component.html',
  styleUrls: ['./delete-msg.component.css']
})
export class DeleteMsgComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DeleteMsgComponent>,private toastr: ToastrService

    ) { }

  ngOnInit(): void {
  }
  onClose(){

    this.dialogRef.close(false);

  }
  onDelete(){
      this.dialogRef.close(true);
  }

}
