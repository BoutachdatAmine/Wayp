# Programming Project 1 - Groep 6 - ehB
## Web part.
In one week we build a little e-commerce website in node.js (for the backend) & html, css and js (for the front end).
To deploy the app we used PM2 and ExpressJS.

## When you clone the project.
use
```bash
npm i
```
to install the dependecies. And
```bash
npm start
``` 
for launching the script

## Good to know's
We fist launched our projet on a home deployed Raspberri Pi 3 running in Raspbian and using PM2.
Now it's running on our school Bbuntu VM. We've used port 3000.
* __Auth0__
For the user part we used The Auth0 tool to manage the login, and user creation. They also send a confirmation mail and manage the password with Bcrypt.
`/callback` is the node entry for acces to the Auth0 app and `/logout`for logging out.

* __Home page__
Some products from the database are displayed on the home page. We wrote a little script to show the n last products on the page.
`/homeProducts`

* __Single Products__
For displaiying the product page we used `/singleProducts`with as param the productID to show the product on a single page.
On this page you can add a product to your cart.

* __Add to cart__
For this we used `localstorage` and stored the ID's inside. To get them, we just took the string, splitted it and took it inside an array.
By clicking on checkout. The system will create a new order and store the data inside the database with `/newOrder` & `/newOrderProduct`.

By clicking on the little _trash_ you can of course also remove an item from your cart.
