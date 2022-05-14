/*
    @To_Do_List_App
    @ this app is made by using:
    HTML * CSS * Bootstrap * JavaScript * Node.js & Express.js * Ejs
*/
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
/////
//// --------- variables --------
let items =['Doing Sport', 'Eating Breakfast'];
let workItems = [];
///////----------------- rout to the main rout ----------
app.get('/', function(req, res){
    let today = new Date();
    let options = {
        weekday : 'short',
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    }
    let day = today.toLocaleDateString('en-us', options)
    
    res.render('main', {toDoListTitle : day , newListItems: items})
});
//---------       post method for the main rout -------
app.post('/', function(req, res){
    let item = req.body.newItem;
    if(req.body.list === 'Work'){
        workItems.push(item);
        res.redirect('/worklist');
    }else{
     items.push(item);
    res.redirect('/');
    }
 });
/// ------------ work list rout ---------
app.get('/worklist', function(req, res){
    res.render('main', {toDoListTitle :'Work List', newListItems:workItems})
});
app.post('/worklist', function(req, res){
    let item = req.body.newItem;
    workItems.push(item);
    res.redirect('/worklist');
})
//
///------------ about rout -------
app.get('/about', function(req, res){
    res.render('about');
})
app.listen(5000, function(){
    console.log('The server is running on port 5000');
})

