const buyModel = require('../models/buymacanism');
const sellModel = require('../models/sellmacanism');
const cartModel = require('../models/cart.schema');
const userModel = require('../models/user.schema');
const holdingModel = require('../models/holding.schema')
const productMoldel = require('../models/product.schema')

const holdingViewGold = async (req, res) => {
    try {
        await holdingModel.find({
            user_id: req.body.id,
            category: req.body.category
        })
            .then(data => {
                res.status(200).send({
                    statusCode: 200,
                    data
                });
            })
            .catch(() => {
                res.status(400).send({
                    statusCode: 400,
                    err: 'Something went wrong',
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

const holdingViewSilver = async (req, res) => {
    try {
        await holdingModel.find({
            user_id: req.body.id,
            category: req.body.category2
        })
            .then(data => {
                res.status(200).send({
                    statusCode: 200,
                    data
                });
            })
            .catch(() => {
                res.status(400).send({
                    statusCode: 400,
                    err: 'Something went wrong',
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

const holdingViews = async (req, res) => {

    try {
        await holdingModel.find({
            user_id: req.params.id
        })
            .then(data => {
                res.status(200).send({
                    statusCode: 200,
                    data,
                });
            })
            .catch(() => {
                res.status(400).send({
                    statusCode: 400,
                    err: 'Something went wrong',
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

const sellItem = async (req, res) => {
    const { category, type, quantity, price, unit, trade_amount, currentPrice } = req.body;
    const body = req.body;
    const id = req.params.id;
    try {
        const Data = req.body;
        const d = await holdingModel.findOne({
            user_id: Data.user_id,
            unit: Data.unit,
            type: Data.type,
            category: Data.category
        })
        if (d == null) {
            res.status(400).send({
                statusCode: 400,
                'err': "you don't have this type of gold and silver",
                d
            })
        }
        else if ((d.quantity - Data.quantity) <= 0) {
            await userModel.findById({ _id: Data.user_id }).then(async data => {
                const tradeData = new sellModel({
                    user_id: req.params.id,
                    category: category,
                    type: type,
                    quantity: quantity,
                    price: price,
                    unit: unit,
                    trade_amount: trade_amount,
                    profit_loss: currentPrice - (d.trade_amount / d.quantity)
                });
                const dataAdded = tradeData.save();

                await productMoldel.findOneAndUpdate({
                    category: category, type: type, unit: unit
                },
                    {
                        $inc: { quantity: quantity }
                    }
                )

                res.status(201).send({
                    "statusCode": 201,
                    "msg": "Gold sell successfully",
                    "data": dataAdded
                })
            });
            d.deleteOne()
        }
        else {
            const data = await holdingModel.findOneAndUpdate({
                user_id: Data.user_id,
                unit: Data.unit,
                type: Data.type,
                category: Data.category
            },
                {
                    $inc:
                    {
                        quantity: -(Data.quantity),
                        trade_amount: -((d.trade_amount / d.quantity) * Data.quantity)
                    }
                })

            if (data == null) {
                res.status(400).send({
                    statusCode: 400,
                    'err': "you don't have this type of gold and silver",
                    data
                })
            }

            else if (data != null && data.quantity >= req.body.quantity) {
                await userModel.findById({ _id: Data.user_id }).then(async data => {
                    const tradeData = new sellModel({
                        user_id: req.params.id,
                        category: category,
                        type: type,
                        quantity: quantity,
                        price: price,
                        unit: unit,
                        trade_amount: trade_amount,
                        profit_loss: currentPrice - (d.trade_amount / d.quantity)
                    });
                    const dataAdded = tradeData.save();

                    await productMoldel.findOneAndUpdate({
                        category: category, type: type, unit: unit
                    },
                        {
                            $inc: { quantity: quantity }
                        }
                    )

                    res.status(201).send({
                        "statusCode": 201,
                        "msg": "Gold sell successfully",
                        "data": dataAdded
                    })
                });
            }
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: 500,
            err: 'Something went wrong',

        });
    }
};


const addCart = async (req, res) => {
    try {
        const { category, type, quantity, price, unit, trade_amount } = req.body;
        if (!quantity || quantity <= 0) {
            return res.status(400).send({
                statusCode: 400,
                msg: 'quantity should not be negative or zero',
            });
        }
        else {
            await userModel.findById({ _id: req.params.id }).then(async data => {

                const cart = new cartModel({
                    user_id: req.params.id,
                    category: category,
                    type: type,
                    quantity: quantity,
                    price: price,
                    unit: unit,
                    trade_amount: trade_amount,
                });
                console.log(cart, "data")
                const dataAdded = await cart.save();
                res.status(201).send({
                    "statusCode": 201,
                    "msg": " added successfully",
                    "data": dataAdded
                })
            });
        }
    } catch (err) {
        console.log(err)
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',

        });
    }
};

const findUserTrade = async (req, res) => {
    try {
        const id = req.params.id
        await cartModel.find({ user_id: id })
            .then(data => {
                res.status(200).send({
                    data,
                    'statusCode': 200,
                });
                // console.log(data, " data aaya kya?")
            })
            .catch(err => res.status(400).send({
                'err': 'User not found',
                'statusCode': 400
            }));
    }
    catch (err) {
        res.status(400).send({
            'err': 'User not found',
            'statusCode': 400
        });
    }
}
const deleteCartItem = async (req, res) => {
    try {
        const pid = req.params.id;
        cartModel.deleteOne({ _id: pid }, (err) => {
            if (err) {
                res.send("Something wrong");
            } else {
                res.status(200).send("item Deleted");
            }
        });
    }
    catch (err) {
        console.log("error responce", err);
        res.status(500).send(err);
    }
};

const updateCart = async (req, res) => {
    try {
        const id = req.params.id;
        const quantity = req.body.quantity;
        const price = req.body.price;
        // Update the quantity of the object with the given id in the cart
        await cartModel.findOneAndUpdate({ _id: id }, { quantity: quantity, trade_amount: quantity * price })
            .then(data => {
                res.status(200).send({
                    'msg': 'quantity updated successfully',
                    'statusCode': 200,
                    data
                });
            })
            .catch(err => {
                res.status(400).send({
                    'err': 'something went wrong',
                    'statusCode': 400
                })
            })
    }
    catch {
        res.status(400).send({
            'err': 'something went wrong',
            'statusCode': 400
        })
    }
}

const buyItem = async (req, res) => {
    try {
        const body = req.body;
        await buyModel.insertMany(body)
        const dataArray = [];
        body.forEach(async (item) => {
            const data = await holdingModel.findOneAndUpdate({
                user_id: item.user_id,
                unit: item.unit, type: item.type, category: item.category
            }, { $inc: { quantity: item.quantity, trade_amount: item.trade_amount } })
            dataArray.push(data);

            if (data == null) {
                await holdingModel.create(body)
                    .then(resp => {
                        // res.status(201).send({
                        //     statusCode: 201,
                        //     msg: "data added",
                        //     resp
                        // })
                        dataArray.push(resp)

                    })
                    .catch((err) => {
                        res.status(400).send({
                            statusCode: 400,
                            err: " something went wrong buy ka"
                        })
                        console.log(err);
                    })
            }
        })
        await cartModel.deleteMany();


        body.forEach(async (item) => {
            await productMoldel.findOneAndUpdate({
                category: item.category, type: item.type, unit: item.unit
            },
                {
                    $inc: { quantity: -(item.quantity) }
                }
            )
        })

        if (dataArray) {
            res.status(200).send({
                statusCode: 200,
                dataArray
            })
        }
    }
    catch (err) {
        console.log(err, "errrrrrrrrrrrrrr");
        res.status(500).send({
            statusCode: 500,
            err: "something went wrong"
        })
    }
};

// one user with pagination
const sellOrdersView = async (req, res) => {
    const pagesell = parseInt(req.query.pagesell) || 1;
    const limitsell = parseInt(req.query.limitsell) || 10;
    const startIndex = (pagesell - 1) * limitsell;
    const endIndex = pagesell * limitsell;
    try {

        const results = {};
        results.totalCount = await sellModel.countDocuments().exec();
        if (endIndex < results.totalCount) {
            results.nextsell = {
                pagesell: pagesell + 1,
                limitsell: limitsell
            }
        }

        if (startIndex > 0) {
            results.previoussell = {
                pagesell: pagesell - 1,
                limitsell: limitsell
            }
        }
        results.current = {
            pagesell: pagesell,
            limitsell: limitsell
        }

        results.data = await sellModel.find({
            user_id: req.params.id,
        }).limit(limitsell).skip(startIndex).exec();
        res.status(200).json(results);
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

//one user with pagination
const buyOrdersView = async (req, res) => {
    const pagebuy = parseInt(req.query.pagebuy) || 1;
    const limitbuy = parseInt(req.query.limitbuy) || 10;
    const startIndex = (pagebuy - 1) * limitbuy;
    const endIndex = pagebuy * limitbuy;
    try {
        const results = {};
        results.totalCount = await buyModel.countDocuments().exec();
        if (endIndex < results.totalCount) {
            results.nextbuy = {
                pagebuy: pagebuy + 1,
                limitbuy: limitbuy
            }
        }

        if (startIndex > 0) {
            results.previousbuy = {
                pagebuy: pagebuy - 1,
                limitbuy: limitbuy
            }
        }
        results.current = {
            pagebuy: pagebuy,
            limitbuy: limitbuy
        }

        results.data = await buyModel.find({
            user_id: req.params.id,
        }).limit(limitbuy).skip(startIndex).exec();
        res.status(200).send(results);
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

// one user without pagination
const sellView = async (req, res) => {
    try {
        await sellModel.find({
            user_id: req.params.id
        })
            .then(data => {
                res.status(200).send({
                    statusCode: 200,
                    data,
                });
            })
            .catch(() => {
                res.status(400).send({
                    statusCode: 400,
                    err: 'Something went wrong',
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

// one user without pagination
const buyView = async (req, res) => {
    try {
        await buyModel.find({
            user_id: req.params.id
        })
            .then(data => {
                res.status(200).send({
                    statusCode: 200,
                    data,
                });
            })
            .catch(() => {
                res.status(400).send({
                    statusCode: 400,
                    err: 'Something went wrong',
                });
            });
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
};

 const exportSellData = async(req,res)=>{
    const pagesell = parseInt(req.query.pagesell) || 1;
    const limitsell = parseInt(req.query.limitsell) || 10;
    const startIndex = (pagesell - 1) * limitsell;
    const endIndex = pagesell * limitsell;
    try {
        const results = {};
        results.totalCount = await sellModel.countDocuments().exec();
        if (endIndex < results.totalCount) {
            results.nextsell = {
                pagesell: pagesell + 1,
                limitsell: limitsell
            }
        }
        if (startIndex > 0) {
            results.previoussell = {
                pagesell: pagesell - 1,
                limitsell: limitsell
            }
        }
        results.current = {
            pagesell: pagesell,
            limitsell: limitsell
        }
        results.data = await sellModel.find().limit(limitsell).skip(startIndex).exec();
        const dataa = await sellModel.find() // Replace YourModel with your Mongoose model
        res.json({withountPagination:dataa, withPagination:results})  
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
 }

 const exportBuyData = async (req,res)=>{
    const pagebuy = parseInt(req.query.pagebuy) || 1;
    const limitbuy = parseInt(req.query.limitbuy) || 10;
    const startIndex = (pagebuy - 1) * limitbuy;
    const endIndex = pagebuy * limitbuy;
    try {
        const results = {};
        results.totalCount = await buyModel.countDocuments().exec();
        if (endIndex < results.totalCount) {
            results.nextbuy = {
                pagebuy: pagebuy + 1,
                limitbuy: limitbuy
            }
        }

        if (startIndex > 0) {
            results.previousbuy = {
                pagebuy: pagebuy - 1,
                limitbuy: limitbuy
            }
        }
        results.current = {
            pagebuy: pagebuy,
            limitbuy: limitbuy
        }

        results.data = await buyModel.find().limit(limitbuy).skip(startIndex).exec();
        const dataa = await buyModel.find()
        res.json({withountPagination:dataa, withPagination:results})  
    } catch (err) {
        res.status(400).send({
            statusCode: 400,
            err: 'Something went wrong',
        });
    }
 }


module.exports = {
    holdingViewGold,
    holdingViewSilver,
    holdingViews,
    sellItem,
    addCart,
    findUserTrade,
    deleteCartItem,
    buyItem,
    updateCart,
    sellOrdersView,
    buyOrdersView,
    sellView,
    buyView,
    exportSellData,
    exportBuyData
}