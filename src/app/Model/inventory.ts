export interface Inventory {
    Id:number;
    //M:number;
    Comment :string;
    Customername :string;
    DeviceType :string;
    OrderNumber :number;
    ReorderingPoint :number;
    BR :number;
    ItemCode :string;
    Meter :number;
    Number :number;
    SubItem:boolean;
    SerielNumber:string;
    RecipientName :string;
   
    Status:string;
    ReceivedDate :Date;
    ExpriyDate :Date;
    TypeStatusId? :number;
    TeamId? :number;
    TypeStatusName? :string;
    TeamName? :string;
    ReceviedStatusId?:number;
    ReceviedStatusName? :string;
    OutgoingStatusId? :number;
    OutgoingStatusName? :string;
    CategoryId? :number;
    CategoryName? :string;
    CompanyId? :number;
    CompanyName? :string;
    ReceviedTypeId? :number;
    ReceviedTypeName? :string;
    AcceptanceId? :number;
    AcceptanceName? :string;
    LocationId? :number;
    LocationName? :string;
    CreatedBy?:string;
    CreationDate?:Date;
   UpdatedBy?:string;
   UpdateDate?:Date;
   TypeStatusIDs? :Array<number>;
   TeamIDs? :Array<number>;
   ReceviedStatusIDs? :Array<number>;
   OutgoingStatusIDs? :Array<number>;
   CategoryIDs? :Array<number>;
   CompanyIDs? :Array<number>;
   ReceviedTypeIDs? :Array<number>;
   AcceptanceIDs? :Array<number>;
   LocationIDs? :Array<number>;
}
