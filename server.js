// Loads the express module
const express = require("express");
const hbs = require("hbs");

const bodyParser = require("body-parser");

const path = require("path");

//Creates our express server
const app = express();
const port = 3000;

//Serves static files (we need it to import a css file)
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "hbs");
app.use(bodyParser.urlencoded({ extended: true }));

//Sets a basic route

// Render the initial page with the number input form
app.get("/", (req, res) => {
  res.render("index");
});

// Create express route binder for draw.hbs and get the data from the url as parameters
// that came from index.hbs

  app.post("/happy", (req, res) => {

    const { name } = req.body;
    const { gender } = req.body;
    const { number } = req.body;
    // const { checkbox } = req.body;
    // const { invited } = req.body;
    const { checkbox1 } = req.body;
    const { name1 } = req.body;
    const { checkbox2 } = req.body;
    const { name2 } = req.body;

    console.log(name, gender, number, checkbox1, name1, name2, checkbox2);

  
    let arrayName = new Array();
// to get the invited guests inside of arrayName
for (let i = 1; i <= 16; i++) {
  const checkbox = req.body[`checkbox${i}`];

  if (!req.body[`name${i}`];) {
    break;
  } 
  if (checkbox !== undefined) {
    arrayName.push(req.body[`name${i}`];);
  }
}


    let songTotal = "Happy birthday to you. Happy birthday to you. Happy birthday dear _. Happy birthday to you! For __ a jolly good fellow. For __ a jolly good fellow. For __ a jolly good fellow, which nobody can deny!"
    let song = songTotal.split(' ');
    let happy = ' ';

    console.log(song);
// to change the blanks to their respective names and genders
    for(key in song) {

      if(song[key] == '_.') {
        song[key] = name;
      } else if (song[key] == '__') {
        if(gender == "male") {
          song[key] = "he's";
        } else {
          song[key] = "she's";
        }
      }
    }
//making the output to be sent in the happy.hbs file
    let output = '';
    let nameCounter = 0;
    for(key in song) {
      nameCounter == arrayName.length ? nameCounter = 0 : null;
      output += arrayName[nameCounter] + ": " + song[key] + "<br>";
      nameCounter++;
    }
    console.log(output);
    res.render("happy", { name, gender, number, checkbox1, name1, checkbox2, name2, output });

  });
  app.get("/happy", (req, res) => {
    res.render('happy');
  });

//Makes the app listen to port 3000
app.listen(port, () => console.log(`App listening to port ${port}`));
