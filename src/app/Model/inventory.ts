export interface Inventory {
    Id:number;
    M:number;
    Comment :string;
    Customername :string;
    DeviceType :string;
    OrderNumber :number;
    SerielNumber:string;
    RecipientName :string;
    Team :string;
    ReceivedDate :Date;
    ExpriyDate :Date;
    TypeStatusId? :number;
    TypeStatusName? :string;
    ReceviedStatusId?:number;
    ReceviedStatusName? :string;
    OutgoingStatusId? :number;
    OutgoingStatusName? :string;
    CreatedBy?:string;
    CreationDate?:Date;
   UpdatedBy?:string;
   UpdateDate?:Date;
}
