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
   
   
    form3: FormGroup = new FormGroup({
      Id: new FormControl(0),
      Name: new FormControl('', [Validators.required,Validators.pattern(/^(\s+\S+\s*)*(?!\s).*$/)]),
      CategoryId: new FormControl('', [Validators.required]),
      CreationDate :new FormControl(null),
      UpdateDate :new FormControl(null),
      CreatedBy:new FormControl(null),
      UpdatedBy :new FormControl(null)
    });


    initializeFormGroup(){
      this.form3.setValue({
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

    if(this.data.dialogTitle !=="?????????? ????????"){
      this.dialogTitle= '??????????';
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
             this.form3.controls['CategoryId'].setValue(this.data.categoryId);
             break;
           }
         }
         if(categorycount==0)
         {
           this.form3.controls['CategoryId'].setValue(null);
         }
   
     
       }
       }
       else{this.notificationService.warn(':: error')}
   
   
   
      });

    if(this.data)
    {
      console.log("data:",this.data)
      this.form3.controls['Id'].setValue(this.data.id);
      this.form3.controls['Name'].setValue(this.data.name);
       this.form3.controls['CreatedBy'].setValue(this.data.createdBy);
       this.form3.controls['CreationDate'].setValue(this.data.creationDate);
       //this.form.controls['UpdatedBy'].setValue(this.data.updatedBy);
       //this.form.controls['UpdatedDate'].setValue(this.data.updatedDate);
     

    } 


  }


  onSubmit(){
    if (!this.form3.valid ) {
 
      return;
  } 
  //////////////////////////
    let type=  {
    
     Name:this.form3.controls['Name'].value,
     
      CategoryId :this.form3.value.CategoryId,
      CategoryName :this.form3.value.Category,
      CreationDate :this.form3.value.CreationDate,
      CreatedBy:this.form3.value.CreatedBy,
      
      //UpdatedDate :this.form.value.UpdatedDate,
      //UpdatedBy:this.form.value.UpdatedBy,
    //  UpdatedBy:this.form.value.UpdatedBy
    
    };
 
   
 if(this.data.dialogTitle=="?????????? ????????")
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
         
         this.loader.idle();
         this.dialogRef.close('save');
         this.form3.reset();
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
      
      
          
           this.form3.controls['UpdatedBy'].setValue(localStorage.getItem('userName') || '');
           
           this.service.UpdateTypeStatus(this.form3.value).subscribe(
             res=>{
               // console.log("ResponseInUpdate",this.service.form.value)
               // console.log("Status response",res)
               if(res.status=true)
               {
               this.notificationService.success(':: Updated successfully');
               this.form3.reset();
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
    this.form3.patchValue({
      Id: id,
      Name: val,
      CategoryId:cat

    });
   

  }






onClose(){
 
   this.form3.reset();
  //  this.form['controls']['category'].setValue('');
  //  this.form['controls']['Name'].setValue('');
  //  this.form['controls']['Id'].setValue(0);
  this.dialogRef.close();

 }






}
