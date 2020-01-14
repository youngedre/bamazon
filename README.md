# bamazon
This is a Node based amazon-like storefront app. Built with node.js and mysql, this will allow full interactivity within the console.
## Overveiw
The customer view uses inquirer to ask what product you would like to search for. It will then display all items in the inventory showing the product ID number, name, department, price, and quantity of items in stock. It will then ask the user to enter the product ID number of the item they wish to buy and then the quantity of that item. If that amount does not exist in the inventory it will reply "There are not enough items in stock to fill your order.". Before completing the purchase it will display the chosen product and quantity as well as the total price. 
## Setup
In order to run Bamazon users will need both [MySQL](https://dev.mysql.com/doc/refman/5.6/en/installing.html) and [Node.js](https://nodejs.org/en/download/) installed on their device
## Technologies Used
* Javascript
* Node.js
* MySQL
## NPM Packages:
* [mysql](https://www.npmjs.com/package/mysql)
* [inquirer](https://www.npmjs.com/package/inquirer)
