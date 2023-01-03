import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Category } from 'src/app/Model/category';
import { TypeStatus } from 'src/app/Model/type-status';
import { LoaderService } from 'src/app/shared/service/loader.service';
import { NotificationService } from 'src/app/shared/service/notification.service';
import { TypeStatusService } from 'src/app/shared/service/type-status.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit {
  isNameRepeated: boolean = false;
  dialogTitle:string = "";
  flag:boolean=false;
  form: FormGroup = new FormGroup({
    Id: new FormControl(0),
    Name: new FormControl('', [Validators.required]),
    CategoryId: new FormControl('', [Validators.required]),
    CreationDate :new FormControl(null),
    UpdateDate :new FormControl(null),
    CreatedBy:new FormControl(null),
    UpdatedBy :new FormControl(null)
  });
  Type = {
    Id: 0,
    Name: "",
    CategoryId:0,
    CreatedBy: ""
  }
  TypeList: TypeStatus[] = [] 
  TypeListTab?: TypeStatus[] = [];
  valdata = ""; valuid = 0;
  /////////////
  Category: Category[] = [];
  //////
 
  constructor(private loader: LoaderService,public service :TypeStatusService, private router: Router,
    public dialogRef: MatDialogRef<AddTypeComponent>,public notificationService: NotificationService,@Inject(MAT_DIALOG_DATA) public data: any ) { }
    initializeFormGroup(){
      this.form.setValue({
        Id:0,
        Name: '',
        CategoryId:0,
        CreationDate:null,
        CreatedBy:null,
        UpdateDate:null,
        UpdatedBy:null,
      })}
  ngOnInit(): void {
 
      


this.initializeFormGroup();

    if(this.data.dialogTitle !=="اضافة جديد"){
      this.dialogTitle= 'تعديل';
      this.flag=true;
    }
    else{
      this.dialogTitle = this.data.dialogTitle;
    }
    this.service.GettingLists().subscribe(res=>{
      // debugger
       if(res.status==true)
       {
      
       this.Category = res.category;
        
   // console.log("///////////////////"+this.Category)
       if(this.data)
       {
         //set list in update
       
         var categorycount=0;
        
         for(var category of this.Category )
         {
           if(this.data.categoryId==category.id)
           {
             categorycount ++;
             this.form.controls['CategoryId'].setValue(this.data.categoryId);
             break;
           }
         }
         if(categorycount==0)
         {
           this.form.controls['CategoryId'].setValue(null);
         }
   
     
       }
       }
       else{this.notificationService.warn(':: error')}
   
   
   
      });

    if(this.data)
    {
      console.log("data:",this.data)
      this.form.controls['Id'].setValue(this.data.id);
      this.form.controls['Name'].setValue(this.data.name);
       this.form.controls['CreatedBy'].setValue(this.data.createdBy);
       this.form.controls['CreationDate'].setValue(this.data.creationDate);
       //this.form.controls['UpdatedBy'].setValue(this.data.updatedBy);
       //this.form.controls['UpdatedDate'].setValue(this.data.updatedDate);
     

    } 


  }


  onSubmit(){
    
  //////////////////////////
    let type=  {
    
     Name:this.form.value.Name,
      CategoryId :this.form.value.CategoryId,
      CategoryName :this.form.value.Category,
      CreationDate :this.form.value.CreationDate,
      CreatedBy:this.form.value.CreatedBy,
      //UpdatedDate :this.form.value.UpdatedDate,
      //UpdatedBy:this.form.value.UpdatedBy,
    //  UpdatedBy:this.form.value.UpdatedBy
    
    };
   
 if(this.data.dialogTitle=="اضافة جديد")
 {  
   //Add
   type.CreatedBy=localStorage.getItem('userName') || '';
       this.service.AddTypeStatus(type).subscribe(
         res=>{
           // console.log("model",this.service.form.value)
           // console.log("Status response",res)
           if(res.status=true)
           {
         this.notificationService.success(':: Submitted successfully');
         this.form.reset();
         this.loader.idle();
         this.dialogRef.close('save');
           }
           else{
             this.notificationService.warn(':: Failed');
             this.loader.idle();
           }
   
       },
   
     )
     
    }

    else
    {
      //update
      
      
          
           this.form.controls['UpdatedBy'].setValue(localStorage.getItem('userName') || '');
           
           this.service.UpdateTypeStatus(this.form.value).subscribe(
             res=>{
               // console.log("ResponseInUpdate",this.service.form.value)
               // console.log("Status response",res)
               if(res.status=true)
               {
               this.notificationService.success(':: Updated successfully');
               this.form.reset();
               this.loader.idle();
               this.dialogRef.close('save');
             // this.onClose();
  
  
               }
               else{
                 this.notificationService.warn(':: Failed');
                 this.loader.idle();
  
               }
  
           },
  
         )
         
        
  
    }
  
 
 
 
   this.loader.idle();
 
 
 
   }//submit
  

   setReactValue(id: number, val: any,cat:any) {
    this.form.patchValue({
      Id: id,
      Name: val,
      CategoryId:cat

    });
   

  }






onClose(){
 
   this.form.reset();
  //  this.form['controls']['category'].setValue('');
  //  this.form['controls']['Name'].setValue('');
  //  this.form['controls']['Id'].setValue(0);
  this.dialogRef.close();

 }






}
