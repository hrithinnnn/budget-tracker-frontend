export interface expense{
    _id:String,
    type: {
        type:String,
        default:"expense"
    },
    title:String,
    amount:number,
    date:Date,
    user:String
}