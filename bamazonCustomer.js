var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "12345678",
    database: "bamazon"
});

connection.connect(function(err){
    if(err)throw err;
    console.log("connected as id "+connection.threadId + "\n");
    start();
});

function start(){
    inquirer.prompt({
        name: "action",
        type: "rawlist",
        message: "What would you like to do?",
        choices: [
            "Search all products",
            "Quit"
        ]
    }).then(function(answer){
        var choice = answer.action;
        inquirer.prompt({
            name: "confirm",
            type: "list",
            message: "You chose "+ answer.action+ ", is this correct?",
            choices: [
                "Yes", 
                "No"
            ]
        
        }).then(function(answer){
            if(answer.confirm ==="Yes"){
                switch (choice){
                    case "Search all products":
                        searchAll();
                        break;
                    case "Quit":
                        connection.end();
                        break;
                }
            }else{
                start();
            }
            
        });
    });
}

function searchAll(){
    // console.log("Search all")
    connection.query("select * from products", function(err, res){
        for(var i = 0; i<res.length; i++){
            
            console.log("\nItem id: " + res[i].item_id + " | Product Name: " +res[i].product_name+ " | Department Name: "+ res[i].department_name + " | Price: " + res[i].price + " | Quantity: " + res[i].stock_quantity);
                
        }
        inquirer.prompt([
            {
                name: 'id',
                type: 'input',
                message: 'Enter the ID number of the product you would like to purchase',
            },
            {
                name: 'quantity',
                type: 'input',
                message: 'Enter the number of units of the selected product you would like to purchase',
            }
        ]).then(function(answer) {
            var query = "SELECT product_name, stock_quantity, price, department_name FROM products WHERE item_id=?";
            connection.query(query, [answer.id], function (err, res) {
                if (err) throw err;
                var userRequest = answer.quantity;
                var name = res[0].product_name;
                var amountAvailable = res[0].stock_quantity;
                if (amountAvailable >= userRequest) {
                    buy(name, res[0].stock_quantity, res[0].price, answer.id, answer.quantity);
                } else {
                console.log("There are not enough items in stock to fill your order.");
                searchAll();
                }
            });

        });
    });
}
function buy(name, amountAvailable, price, product_id, quantity){
    var totalPrice = price * quantity;
    totalPrice = totalPrice.toFixed(2);
    inquirer.prompt([
        {
            name: 'confirm',
            type: 'confirm',
            message: 'You have selected ' + quantity + " " + name + '. Your total is $' + totalPrice + '. Would you like to complete this order?'
        },
    ]).then(function(answer){
            var newStock = amountAvailable - quantity;
            var query = "UPDATE products SET stock_quantity=? WHERE item_id=?";
            connection.query(query, [newStock, product_id], function(err, res){
                console.log("Purchase Successful");
                start();
            });
        });
}
