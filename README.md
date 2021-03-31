# Gaurav Srivastava #

### Highlights
This is a simple boiler plate of node js project using express framework.

### Installation
npm install;
touct .env
cp .env.example .env (then add your credentials)
cp app/config/env/local.js app/config/env/development.js

### Important module Links - Refer for documentation
MYSQL : https://www.npmjs.com/package/mysql
REDIS : https://www.npmjs.com/package/redis
LOGS  : https://www.npmjs.com/package/winston
MONGOOSE : https://mongoosejs.com/docs/guide.html
FASTEST-VALIDATOR : https://www.npmjs.com/package/fastest-validator
SOCKET.IO : https://www.npmjs.com/package/socket.io


### Testing

### Known Issue
Nothing at the moment :)

##Key points
* Use Proper indentation. 4 spaces should be there.
* All variables and files should be camelcased. Dont use '_' in any variable and filname.
* No callbacks, use only promises
* Use PromisfyAll if any library doesnot support promises
* Always define validations whenever new API is created
* Define schema before creating mongo model
* Dont require any file inside any function. Require it on top
* Use logger library for logging of response. No consoles in the committed code please.
* Whenever new module is installed, Always add --save-exact at the end of command. Eg. npm install mongoose --save-exact
* All get API should have limit and offset