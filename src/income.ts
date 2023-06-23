export interface income{
    _id:String,
    type:{
        type:String,
        default:"income"
    },
    title:String,
    amount:number,
    date:Date,
    user:String
}