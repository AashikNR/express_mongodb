let express = require('Express');
let app = express();
let todoRoute = require('./todoRoute.js');
const fetch = require("node-fetch");
let cors = require('cors');
let fs = require('fs');

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded());
// Parse JSON bodies (as sent by API clients)
app.use(express.json());

app.use(cors({origin:true}))
app.use('/todo', todoRoute);
app.listen(3000, function() {
    console.log("server is running on port 3000");
});

once = ()=>{
    let obj = {
        table: []
     };
    obj.table.push({id: 1, value:"first"});
    let json = JSON.stringify(obj);
    fs.writeFile('myjsonfile.json', json, 'utf8', (err) => {
        if (err) throw err;
    });
}
// once()





