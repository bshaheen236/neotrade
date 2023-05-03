const productModel = require('../models/product.schema');

exports.addProduct = async (req, res) => {
    try{
        await productModel.create(req.body)
            .then(data => {
                res.status(201).send({
                    statusCode : 201,
                    msg : 'product added successfully',
                    data
                })
            })
            .catch(() => {
                res.status(400).send({
                    statusCode : 400,
                    err : 'something went wrong'
                })
            })
    }
    catch(err){
        res.status(400).send({
            statusCode : 400, 
            err : "something went wrong"
        })
    }
}

exports.findProductByCategoryName = async (req, res) => {
    try{
        await productModel.find({category : req.params.category})
            .then(data => {
                res.status(200).send({
                    statusCode : 200, 
                    data
                })
            })
            .catch(() => {
                res.status(400).send({
                    statusCode : 400,
                    err : "product not found"
                })
            })
    }
    catch(err){ 
        res.status(400).send({
            statusCode : 400,
            err : "something went wrong"
        })
    }
}


exports.UpdatePrice = async(req,res) =>{
    try {
        const id = req.params.id;
        const price = req.body.price;
        await productModel.findOneAndUpdate({
            _id:id, 
        },  { price: price })
        .then(data=>{
            res.status(200).send({
                statusCode:200,
                msg:"price updated",
                data
            })
            console.log(data,"data");
        })
        .catch(()=>{
            res.status(400).send({
                statusCode:400,
                err:"something went wrong",
            });
        });
    }
    catch (err) {
        res.status(500).send({
            statusCode: 500,
            err: 'Something went wrong',
        });
    }
    
}