const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 3000;


app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.get('/', (req, res) => {
    // res.send('Welcome to Club Recipee Man');
    res.render('home');
});
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});



// module.exports = app; 