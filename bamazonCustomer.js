var mysql = require('mysql');
var inq = require('inquirer');
var searchTerm = '';
var itemQuan = null;
var cart = [];
var itemCount = [];
var itemTotal = 0;
var quanUpdater = null;

//firebase data for password
// var config = {
//     apiKey: "AIzaSyCY7Uvf8GEp64PlTI_Ipay45u9oM9qV8lI",
//     authDomain: "mysql-details.firebaseapp.com",
//     databaseURL: "https://mysql-details.firebaseio.com",
//     projectId: "mysql-details",
//     storageBucket: "mysql-details.appspot.com",
//     messagingSenderId: "36011829230"
//   };
//   firebase.initializeApp(config);

// var firebase = firebase.database();

//establish connection to mySQL
connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Rvhsrzrvhs123!",
    database: "bamazon_cust_db"
});

//check for connection
connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
});
startBam();

//master function of Bamazon
function startBam() {
    inq.prompt([{
        type: 'input',
        message: 'Welcome to Bamazon! Please enter the item you would like to purchase: ',
        name: 'BamSearch'
    }]).then((results) => {
        // console.log(firebase.password);
        searchTerm = results.BamSearch;
        //Use MySQL to return all data related to searched item
        connection.query("SELECT * FROM bamazon_store WHERE ?",
            searchTerm, (err, res) => {
                if (err) throw err;
                else if (res.length === 0) {
                    console.log("We are sorry, but we can't find what you are searching for.");
                } else {
                    console.log(res);
                    itemQuan = res.id[1];
                    BamFollowUp(searchTerm);
                }
            });
    })
}

function BamFollowUp(searchTerm) {
    inq.prompt([{
            type: 'number',
            message: 'Please enter the number of items you wish to purchase',
            name: 'ItemNumber'
        }]).then((results) => {
                connection.query("SELECT quantity FROM bamazon_store WHERE ?",
                    searchTerm, (err, res) => {
                        if (err) throw err;
                        quanUpdater = res;
                        if (results.ItemNumber > quanUpdater) {
                            console.log("Sorry, but we don't have enough of this item in stock!");
                        } else {
                            cart = cart.push(searchTerm);
                            itemCount = itemCount.push(results.ItemNumber);
                            console.log(cart);
                            console.log(itemCount);
                            console.log(results.ItemNumber + " of the stated item(s) has been added to the cart.");
                            updateInventory(searchTerm, results.ItemNumber);

                            // }
                        }
                    })
            }
}

            function updateInventory(userSearch, userItemQuan) {
                connection.query("UPDATE bamazon_store SET ? WHERE ? ", [{
                    product: userSearch
                }, {
                    quantity: quanUpdater - userItemQuan
                }], (res, err) => {});
            }

            function endSearch() {
                inq.prompt([{
                    type: 'list',
                    message: 'Would you like to make another purchase?',
                    choices: ['Search for Another Item', 'Go to Cart'],
                    name: 'decision'
                }]).then((results) => {
                    if (results.decision === "Go to Cart") {
                        connection.query("SELECT * FROM price", (res, err) => {
                            if (err) throw err
                            for (i = 1; i < cart.length + 1; i++) {
                                var itemCost = itemCount[i - 1] * res.id[i];
                                //List all items in the cart, name, quantity, and total cost of each item(s)
                                console.log("/n");
                                console.log("Item: " + cart[i - 1] + ", " + "Quantity: " + itemCount[i - 1] + ", " + "Cost: " + itemCost);
                                //add cost of item(s) to the total cost
                                itemTotal += itemCost;
                            }
                            //Calculate sales tax based on total cost
                            var salesTax = 0.15 * itemTotal;
                            itemTotal += salesTax;
                            console.log("/n");
                            console.log("Sales Tax: " + salesTax);
                            //print total cost
                            console.log("/n");
                            console.log("Your shopping total is: " + itemTotal);
                            console.log("/n");
                            console.log("Thank you for shopping at Bamazon!");
                        })
                    } else {
                        startBam();
                    }
                });
            }