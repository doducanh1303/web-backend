const Cart=require("../model/cart")

module.exports={
     deleteCart:async (req,res)=>{
    try{
        const query={}
        if(req.params && req.params.id){
            query.id=req.params.id
        }
        const cart=Cart.findOneAndDelete({_id:query.id})
        if(!cart){
            res.send({
                status:500,
                data:null,
                msg:`khong the xoa san pham voi id=${id}`

            })
        }else{
            res.send({
                status:200,
                data:cart,
                msg:'ok'
            })
        }
    }catch(err){
        res.send({
            status: 500,
            data: null,
            msg: 'internal server error'
        })
    }
},
    ADD_CART: async (req, res, next) => {
        try {

            const newCart = new Cart({
                _id: new mongoose.Types.ObjectId(),
                name:req.body.name,
                description:req.body.description,
                price:req.body.price,
                imageUrl:req.body.imageUrl

            })
            console.log('newcart......',newCart)
            const result = await newCart.save();
            res.status(200).json({
                data: result,
                msg:'oke'
            })
        } catch (error) {
            res.send({
                status:500,
                data:null,
                msg:'errorrrrrrrrrr'
            })
        }
    },


}
