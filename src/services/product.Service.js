const connect  = require('../../configs/connect')
products ={}

products.listProducts =(req, res)=>{
    let sql = `SELECT name AS product_name, quantity_in_stock, unit_price, pc.category_name, (quantity_in_stock * unit_price) AS total_price
    FROM products p  JOIN product_categories pc USING(category_id);`
    connect.query(sql, (error, result)=>{
        console.log(error);
        console.log(result);
        if(error){
            res.status(401).send({
                response_code:'02',
                response_message: "No results found !"
            })
        }else{
            res.status(200).send({
                response_code:'00',
                response_message: "Successfully retrieved!",
                data:result

            })
        }
    })

}
module.exports = products

