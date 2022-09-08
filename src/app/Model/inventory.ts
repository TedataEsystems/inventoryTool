export interface Inventory {
    id:number;
    m:number;
    comment :string;
    customername :string;
    serialnumber :string;
    devicetype :string;
    ordernumber :number;
    serialNumber:string;
    recipientname :string;
    team :string;
    receiveddate :Date;
    expriydate :Date;
    TypeStatusId? :number;
    TypeStatusName? :string;
    ReceviedStatusId?:number;
    ReceviedStatusName? :string;
    OutgoingStatusId? :number;
    OutgoingStatusName? :string;
    createdBy?:string;
    creationDate?:Date;
   updatedBy?:string;
   updateDate?:Date;
}
