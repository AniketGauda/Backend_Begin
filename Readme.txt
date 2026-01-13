		// This is my beginning of backend, I am following a you-tube tutorial in which (NODE JS + MONGO DB) is being covered.
                              // Every Lecture wise i am making the Notes Here.

########################################################## Lec 1 ####################################################################

> Create a Folder (in my case it's BackendBegin).
> Open it in VS Code.
> Open terminal.
> run some commands
	> 1) node -v (to check the installed node version)
	> 2) npm init -y (It'll generate a package.json file, basically all the dependencies of our project will be here.)
		: But if you're  running this command for the very 1st time in your system then it'll throw an error.
		: That is due to powershell execution policy issue.
		: To Resolve this
			$ Run Powershell as Administrator
			$ Enter this command "Set-ExecutionPolicy RemoteSigned -Scope CurrentUser"
			$ It'll ask to change the Execution Policy so enter Y.
			$ Then Close Vs code and then Reopen it and do npm init -y. (Now it'll work).
	> 3) npm install (This will generate a package-lock.json file, it'll contain all the dependencies of our package.json dependency)
	> 4) npm install express mongoose (It'll create a node_modules file)
		: express is used to create a server
		: mongoose is used to connect with mongo DB.
> Create an index.js file and start coding. (In the js file itself i am making comments so no worries) 
> To make a server, just write this code.
	Code: 
		const express = require('express');
		
		const app = express();

		app.listen(8000,()=>{
			console.log("Server is running on port 8000... :)");
		});
> Install MongoDB.
> It'll automatically install Mongo DB Compass.
> Open the Compass and make a connection (Just click on new connection then enter basically go with the default one)
	: It'll run on local host 27017
> To connect the DataBase with Backend write
	Code:
		const mongoose = require('mongoose');
		mongoose.connect("mongodb://localhost:27017/Aniket")
			.then(()=>console.log("DataBase Connected"))
			.catch((err)=>console.log("Something went wrong" + err));
			
> Now a Problem is when the server is running then if you break some code then it'll not reflect unless you hit ctrl + c and 
	run again.
> to avaoid this	
	: earlier we used to use "nodemon" but now we can go to package.json
	: and in the scripts just add {"start": "node --watch index.js"}
	: Now if Auto save is on then it'll Restart the server automatically.
	
########################################################## Lec 2 ####################################################################

> You have to make a schema which will give us an idea in which format you wanna save data in the DB.
> Code:
	const userSchema = new mongoose.Schema({
		name: String,
		email: String,
		password: String
	});
	
    const User = mongoose.model('User',userSchema);

> Make Two folders Backend & FrontEnd.
> Move files to Backend and then in frontend make an index.html file.
> Where 3 input tags and a button for {name, email and password}

########################################################## Lec 3 ####################################################################

> We make a rest API with normal send.
> Code:
	app.get('/bring_run_functionality',
	  function run(req,res) {
		// This Function contains the functionality of run.
		// So Every Time Someone will call this, he will also have this functionality
		
		res.send('run_functionality');
	  }
	)
> if the server is running then we can call the API and it'll give a response.
> Just for checking, we can run the url "http://localhost:8080/bring_run_functionality" and get the data in normal web search.
> we can replace local host with system IP.
> How to get System IP:
	: Open cmd prompt
	: enter ipconfig
	: copy the ipV4 Address.

########################################################## Lec 4 ####################################################################

> This Lectures objective is to make API in such a way that Once we hit in /save route then 
> we should able to save the data in the database which is obviously coming from frontend.
> API Types:
	: get
	: post
	: put
	: patch
	: delete
> This is the simple post API which we're making which is responsible to saving the data in the DB.
> Code:
	app.post('/save',async function(req,res) {
        const details  = req.body;    
        if(!details.name || !details.email || !details.password) {
            return res.json({message: 'All Fields are required'});
        }
        console.log('DETAILS FROM FRONT_END:: ',details);
        const newUser = new User({
            name: details.name,
            email: details.email,
            password: details.password
        })
        await newUser.save();
        res.json({message: 'User Saved Successfully!'});
    })
> But Currently it's voileting the CORS Policy.
> To avoid it in the terminal do "npm i cors"
> Once successfully installed write below code.
> Code:
	const cors = require('cors');
	
	app.use(cors());
	app.use(express.json());
	
########################################################## Lec 5 ####################################################################

> In this we're making a new form in which i am asking Product Name, Product Desc and Product Price.
> and on click of Add prodxt button i am making an API Call with productDetails Data.
> My Script.js Code:
	const productNameInput = document.getElementById('pName');
	const productDescInput = document.getElementById('pDesc');
	const productPriceInput = document.getElementById('pPrice');
    const productUrlInput = document.getElementById('pUrl');

	async function addProduct () {

		const productDetails = {
			productName: productNameInput.value,
			productDesc: productDescInput.value,
			productPrice: productPriceInput.value,
            productUrl: productUrlInput.value
		}

		productNameInput.value = "";
		productDescInput.value = "";
		productPriceInput.value = "";
        productUrlInput.value = "";
        

		const res = await fetch("http://localhost:8000/addProduct",{
			method:'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(productDetails),
		})
		const dataFromServer = await res.json();
		alert(dataFromServer.message);
	}

> In the backend folder, made a new file named server.js and in package.json also change start to node --watch server.js
> after that access the express and mongoose and cors.
> made app using express and via mongoose connect db with server.
> made an api using post with "/addProduct" route.
> made a product schema and then made a model out of it.
> Used the model to save in the DB Fianlly.
> Code:
	const express = require('express');
	const mongoose = require('mongoose');
	const cors = require('cors');

	const app = express();

	app.use(cors());
	app.use(express.json());

	app.listen(8000,()=>{
		console.log('Server is running at port: 8000');
	})

	mongoose.connect("mongodb://localhost:27017/Aniket")
		.then(()=>console.log("DataBase Connected"))
		.catch((err)=>console.log("Something went wrong " + err));

	const productSchema = new mongoose.Schema({
		productName: String,
		productDesc: String,
		productPrice: Number,
        productUrl: String
	})

	const Product = mongoose.model('Product',productSchema);

	app.get("/",function(req,res) {
		res.send("Port No: 8000 is we're using to run our server");
	})

	app.post("/addProduct",async function(req,res) {
		const productDetails = req.body;
		console.log('PRODUCT DETAILS FROM FRONT END:: ',productDetails);

		const newProduct = new Product({
			productName: productDetails.productName,
			productDesc: productDetails.productDesc,
			productPrice: productDetails.productPrice,
            productUrl: productDetails.productUrl
		});

		await newProduct.save();

		res.json({message: "DB Insertion Successfull 🎉🎉!"});
	})

> DataBase contains multiple Collections, Collection contains multiple Documents & Document contains multiple Keys.

########################################################## Lec 6 ####################################################################

> In Previous Lectures we covered how to store Data in the DB. 
> So Create Part we did in CRUD Operation.
> In this Lecture We will cover the Read Part of CRUD.
> We made a GET API to get all the products Data From the DB.
> Code:
	app.get('/getAllProducts',async function(req,res) {
		try {
			const allProducts = await Product.find();
			res.json(allProducts);
		} catch (error) {
			res.json(error.message)
		}
	})
> In Last class we made a Product Model, with same Model name only by .find() method we'll get all the data.
> So in script.js we're making an api call with same route to get the data in Front end and we'reshowing there.
> Code:
	async function getData() {
		const res = await fetch("http://localhost:8000/getAllProducts");
		const products = await res.json();
		return products;
	}

	async function generateUI() {
		const data = await getData();
		data.forEach((elt,idx)=>{
			productContainer.innerHTML += 
			`
				<div>
					<img src=${elt.productUrl}/>
					<h1>${elt.productName}</h1>
					<h2>${elt.productDesc}</h2>
					<h3>$ ${elt.productPrice}</h3>
				</div>
			`
		})
	}

	const hideUI = ()=>{
		productContainer.innerHTML = ``;
	}
	
########################################################## Lec 7 ####################################################################

> Intro to GitHub.
> Tools and trends evolve, but collaboration endures. With GitHub, developers, agents, and code come together on one platform.
> Created a repo in github named "Product_management_app".
> Copy the link of the given repo "https://github.com/AniketGauda/Product_management_app.git";
> Donwloaded Git.
> Git is a tool to extract code files from our system and pushed it into github.
> Open GitBash and run git config --global user.email "aniketgauda99@gmail.com"
> Note that the email should be same as your github login acc.
> This command will connect git with github so that directy we can push the code to gitbub from local system via Git.
> Then run this command git config --global user.name "Aniket Gauda"
> Then check the list.
> git config --list
> Now everything is configurred thus It's time to push the code to Github.
> We Open Frontend folder of our project cause that's only i wanna push in git.
> Opened that folder in VS-Code and Opened the terminal.
> Enter Command: "git init"
> as soon as you hit enter it'll show Initialized empty git repo in frontend folder path.
> Now enter the command "git add ."
> After git init in-front of files you will see "U" but after this cmd it'll change to "A".
> Now for commit enter `git commit -m "Initial Commit"`
> When you hit enter it'll show `message, 3 files changed...`
> Now to stablish a link enter "git remote add origin https://github.com/AniketGauda/Product_management_app.git"
> Now last Push command "git push origin master".
> If you haven't been logged in to github then it'll ask you to login.
> After successfully authorization, It'll automatically push the code to github.
> Command sequentially:
	: For GitBash
		$ git config --global user.email "aniketgauda99@gmail.com" (Same email in which you've created github acc)
		$ git config --global user.name "Aniket Gauda"
		$ git config --list (to verify configuration).
	
	: Open Folder you wanna push to github in vs code (Open Terminal)
		$ git init 
		$ git add .
		$ git commit -m "Message which you want"
		$ git remote add origin https://github.com/AniketGauda/Product_management_app.git (repo-link)
		$ git push origin main

> git init:
	✔ Initializes a new local Git repository in the current folder
	✔ Creates the hidden .git directory
> git add .
	✔ Adds all new and modified files to the staging area.
> git commit -m "Your Message"
	✔ Save staged changes with a meaningful message
> git remote add origin https://github.com/AniketGauda/Product_management_app.git
	✔ Links your local repository to a remote GitHub repository
	✔ origin is just a name (alias) for the remote URL
> git push origin main 
	✔ Pushes commits from local branch to remote GitHub repository

########################################################## Lec 8 ####################################################################

> If repo alrady exists in git then do these commands
	$ git add .
	$ git commit -m "Your message"
	$ git push origin main(master in my case)
> In this Lecture we made an User Dashboard which we've committed also.

########################################################## Lec 9 ####################################################################

> Made more changes in My User Dashboard.
> Finally Pushed the Modified and new codes to git.

########################################################## Lec 10 ####################################################################

> Split Our User Dashboard in 2 parts UD_FrontEnd and UD_BackEnd.
> Did npm init y in UD_BackEnd and Setup a server.
> Made a POST API which is getting the data from the front-end and storing in the Mongo DB.
> On submit of the form from the front-end i am making that api call named ('/createUser');
> Finally Pushed the Code into the git.

########################################################## Lec 11 ####################################################################

