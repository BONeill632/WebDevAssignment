# CSC7084-WebDevAssignment
Assignment for module CSC7084 Web development at Queen's University Belfast

-This README is for CSC7084: Web Development Assignment

-It is an emotion logging web application designed for the above module

***How to install & run the project***

-Run 40086826-webdev-assignment.sql
on your chosen database environment (MySQL/SSMS/phpMyAdmin)
-It contains dummy users, & dummy data assignment as well as all
the used tables

-The web app does not contain the node_modules folder,
nor does it contain the package-lock.json file.
-Run the below command to populate this.


***NOTE***
-There is 2 projects here. The web application and the webAPI.
-Please run the script below against both environents


***run this in terminal***
-npm init -y
-npm install axios bcrypt dayjs dotenv ejs express helmet morgan mysql2 nodemon -- save

-Once installed, add '"start": "nodemon app.js"' to the scripts tag
in the app.js of both projects

-Now, run npm start in each respective terminal

-The web app runs on port 4000
-The API runs on port 4001

-Navigate to http://localhost:4000/ in the browser. This will take you to the homepage of the application