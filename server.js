// server.js
// where your node app starts

// init project

// we've started you off with Express,
// but feel free to use whatever libs or frameworks you'd like through `package.json`.

// http://expressjs.com/en/starter/static-files.html
const express = require('express');
const bodyParser = require("body-parser");
const app = express();
const http = require("http");
const port = 8080;
const fs = require("fs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static("view"));

// init sqlite db
var mysql = require('mysql');
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "h0n3ysun17MS",
  database: "testdb"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  //var sql = "CREATE TABLE Opportunities (id INT AUTO_INCREMENT PRIMARY KEY, name TEXT, category TEXT, type TEXT, location TEXT, dateRange TEXT, deadline TEXT, cost TEXT, description TEXT, link TEXT)";
  //var sql = 'INSERT INTO Opportunities(name, category, type, location, dateRange, deadline, cost, description, link) VALUES ("Teens in AI", "Computer Science", "Summer Camp", "Remote", "2020-07-20 to 2020-08-07", "2020-07-01", "None", "The Teens In AI initiative, launched at the AI for Good Global Summit at the UN in May 2018, exists to inspire the next generation of AI researchers, entrepreneurs and leaders who will shape the world of tomorrow. It aims to give young people early exposure to AI being developed and deployed for social good. Through a combination of teensinai’s own hackathons, accelerators, and bootcamps together with expert mentoring, talks, company tours, workshops, and networking opportunities the program creates the platform for young people aged 12-18 to explore AI, machine learning, and data science.", "https://www.teensinai.com/"), ("WAVE", "Tech", "Mentorship", "Remote", "Ongoing", "None", "None", "WAVE is a one-of-a-kind mentorship program that is designed to support female and non-binary students as they take the first step into their careers. Each Advisee receives personal support from a dedicated professional who will show you the career possibilities and help you develop the valuable skills needed to land your first job or internship.  WAVE was created for female and non-binary students between the age of 15-22 years old. No particular experience needed, just a desire to learn and grow into your career. We offer both in-person and remote sessions so anyone within the US is welcomed. WAVE is a free program but we take commitment very seriously.", "https://www.builtbygirls.com/about-wave"), ("First Bytes", "Computer Science", "Summer Camp", "Austin, TX", "2020-07-01 to 2020-07-08", "2020-03-30", "None", "First Bytes is a free, one-week annual summer camp offered by the University of Texas at Austin Department of Computer Science intended to break misconceptions and introduce computer science to high school girls.", "https://www.cs.utexas.edu/outreach/camps/first-bytes"), ("Girls Go CyberStart", "Computer Science", "CTF", "Remote", "2021-02-10 to 2021-05-21", "2020-02-14", "None", "Girls Go CyberStart is a fun and interactive online program composed of digital challenges to introduce high school girls to cybersecurity. The program is made up of three stages. You start by participating in a fun online tryout called CyberStart Assess. Here you’ll master techniques needed to contend in an online Capture the Flag in CyberStart Compete! Find out more about each stage. No prior experience is needed to take part! We’ll build your knowledge through the program by introducing you to exciting topics like cryptography, web vulnerabilities, Python, Linux and forensics. Teamwork, persistence and determination are key. Whether you already know a bit about computer science, or have never considered a career in technology, you’ll love Girls Go CyberStart!", "https://girlsgocyberstart.org/students"), ("High School Aerospace Scholars", "Physics", "Summer Camp", "Houston, TX", "Ongoing", "None", "None", "High School Aerospace Scholars (HAS) is a unique NASA experience that begins with a 16-week online interactive course on NASA activities related to space exploration, Earth science, technology, mathematics and aeronautics. Students complete design challenges including 3D drawings, science quizzes, discussion posts, technology writings and monthly webinars with NASA scientists and engineers. The highest achieving students are invited to NASA for a six-day residential summer experience at NASAs Johnson Space Center in Houston, Texas, where they work with NASA experts on designing a mission to Mars. Students are nominated by their state legislator and must be a Texas resident and U.S. citizen currently in their junior year of high school (rising seniors).", "https://www.nasa.gov/centers/johnson/stem/High_School_Aerospace_Scholars.html"), ("USI Girls Only STEM Camp", "Math", "Summer Camp", "Remote", "2020-07-06 to 2020-07-10", "2020-06-19", "$25", "The Girls Only (GO) STEM! Summer Camp at the University of Southern Indiana (USI) is taking on a new crew of campers this year - middle school girls!  Come join us for a week-long, non-residential experience where you can master new STEM skills and collaborate with your peers to solve problems using LEGO® EV3 robots, Spheros, and other cool gadgets! If you have been wondering about all the buzz surrounding LEGO® robotics and are looking for something fun to do during your summer break, grab a friend, and come join us!", "https://www.usi.edu/science/southwest-indiana-stem/girls-only-go-stem-summer-camp/"),("Girls Count", "Math", "Summer Camp", "Remote", "Ongoing", "None", "$75", "Becoming Data Scientists: We can tell important stories by creating graphs and we can learn about key relationships by reading graphs. Throughout the week we will become empowered data scientists who aren’t afraid to call out a misleading graph or confidently share a personal story through data. Each day, we will analyze a new set of real-world data and try our hands at presenting meaningful data concerning real world issues we care about.", "https://www.girlscountpdx.org/camps"),("Superposition All-Girls Hackathon", "Tech", "Hackathon", "Bay Area, CA", "2021-02-29 to 2020-03-01", "2020-02-16", "None", "Superposition IV is the oldest and largest 24-hour hackathon for high school and college females (trans and non-binary inclusive) in the Bay Area. We hosted 220 students from across 8 states and 2 countries, of which 77% were first-time hackathon attendees. This event is free to attend, and wi-fi, food, swag, and workspaces will be provided. Bring your passion for computer science and well take care of the rest! Its the perfect opportunity for anyone to take their next step forward in tech.", "https://superposition.tech/"),("Information Technology Intership", "Tech", "Internship", "Springfield, MO", "Ongoing", "None", "You get paid.", "Offers an opportunity for girls to use technology in real life situations such as accident and health insurance; property/casualty insurance for personal lines, agribusiness and targeted commercial businesses; and retirement, annuities and pension plan products.", "https://jobs.americannational.com/go/Students-and-Internships/4358700/"),("Technovation", "Tech", "Competition", "Remote", "2020-03-30", "2020-01-14 to 2020-08-14", "None", "Technovation Girls is a free technology-based program for girls ages 10 - 18. Working in teams (of 1 to 5), girls find a problem in their community and build a mobile app to help solve it. Along the way, they develop their collaboration, problem-solving, and leadership skills. Technovation Girls will take 30+ hours to complete (we recommend allocated about 12 weeks to finish) and is completely free.", "https://technovationchallenge.org/"),("Perry Outreach Program", "Medicine", "Learning", "Multiple", "Ongoing", "None", "None", "The Perry Initiative partners with medical centers, universities, and high schools to host Perry Outreach Programs for young women in high school. These day-long programs are held at over 45 locations nationwide throughout the year. Participants perform mock orthopaedic surgeries and conduct biomechanical engineering experiments, while also hearing from prominent women engineers and surgeons in the field.", "https://perryinitiative.org/"),("Womens Technology Program", "Tech", "Summer Camp", "Cambridge, MA", "2020-06-20 to 2020-07-22", "2020-01-15", "$3,500", "MIT’s Women’s Technology Program (WTP) is a four-week intensive academic and residential experience, wherein female students participate in hands-on classes, labs, and team-based projects. Students can attend the WTP in Electrical Engineering and Computer Science (EECS), or Mechanical Engineering (ME), however no prior background (or very little) in engineering is required for any student entering into the program (though high proficiency in math and science is required). Female MIT graduate students, or post-docs, not only design and teach the classes, but also share dorms with the students for the entirety of the program.", "http://wtp.mit.edu/")';
  //con.query(sql, function (err, result) {
    //if (err) throw err;
    //console.log("1 record inserted");
  //});
});

// con.connect(function(err) {
//   if (err) throw err;
//   con.query("SELECT * FROM Opportunities", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });
// });


app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));


var server = app.listen(8080, "127.0.0.1", function () {

  var host = server.address().address
  var port = server.address().port

  console.log("Example app listening at http://%s:%s", host, port)

});

app.get('/', (req, res) => res.send('Hello World!'));


app.get("/getOpps", function (request, response) {
  con.query("SELECT * from Opportunities", function (err, rows, fields) {
    if (err) throw err;
    response.send(JSON.stringify(rows));
  });
});


var listener = app.listen(process.env.PORT, () => {
  console.log(`Your app is listening on port ${listener.address().port}`);
});


// db.serialize(() => {
//   if (!exists) {
//     db.run(
//       //"DROP TABLE Opportunities"
//       "CREATE TABLE Opportunities (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, category TEXT, type TEXT, location TEXT, dateRange TEXT, deadline TEXT, cost TEXT, description TEXT, link TEXT)"
//     );
//     console.log("New table Opportunities created!");
//
//     // insert default dreams
//     db.serialize(() => {
//       db.run(
//         'INSERT INTO Opportunities(name, category, type, location, dateRange, deadline, cost, description, link) VALUES ("Teens in AI", "Computer Science", "Summer Camp", "Remote", "2020-07-20 to 2020-08-07", "2020-07-01", "None", "The Teens In AI initiative, launched at the AI for Good Global Summit at the UN in May 2018, exists to inspire the next generation of AI researchers, entrepreneurs and leaders who will shape the world of tomorrow. It aims to give young people early exposure to AI being developed and deployed for social good. Through a combination of teensinai’s own hackathons, accelerators, and bootcamps together with expert mentoring, talks, company tours, workshops, and networking opportunities the program creates the platform for young people aged 12-18 to explore AI, machine learning, and data science.", "https://www.teensinai.com/"), ("WAVE", "Tech", "Mentorship", "Remote", "Ongoing", "None", "None", "WAVE is a one-of-a-kind mentorship program that is designed to support female and non-binary students as they take the first step into their careers. Each Advisee receives personal support from a dedicated professional who will show you the career possibilities and help you develop the valuable skills needed to land your first job or internship.  WAVE was created for female and non-binary students between the age of 15-22 years old. No particular experience needed, just a desire to learn and grow into your career. We offer both in-person and remote sessions so anyone within the US is welcomed. WAVE is a free program but we take commitment very seriously.", "https://www.builtbygirls.com/about-wave"), ("First Bytes", "Computer Science", "Summer Camp", "Austin, TX", "2020-07-01 to 2020-07-08", "2020-03-30", "None", "First Bytes is a free, one-week annual summer camp offered by the University of Texas at Austin Department of Computer Science intended to break misconceptions and introduce computer science to high school girls.", "https://www.cs.utexas.edu/outreach/camps/first-bytes"), ("Girls Go CyberStart", "Computer Science", "CTF", "Remote", "2021-02-10 to 2021-05-21", "2020-02-14", "None", "Girls Go CyberStart is a fun and interactive online program composed of digital challenges to introduce high school girls to cybersecurity. The program is made up of three stages. You start by participating in a fun online tryout called CyberStart Assess. Here you’ll master techniques needed to contend in an online Capture the Flag in CyberStart Compete! Find out more about each stage. No prior experience is needed to take part! We’ll build your knowledge through the program by introducing you to exciting topics like cryptography, web vulnerabilities, Python, Linux and forensics. Teamwork, persistence and determination are key. Whether you already know a bit about computer science, or have never considered a career in technology, you’ll love Girls Go CyberStart!", "https://girlsgocyberstart.org/students"), ("High School Aerospace Scholars", "Physics", "Summer Camp", "Houston, TX", "Ongoing", "None", "None", "High School Aerospace Scholars (HAS) is a unique NASA experience that begins with a 16-week online interactive course on NASA activities related to space exploration, Earth science, technology, mathematics and aeronautics. Students complete design challenges including 3D drawings, science quizzes, discussion posts, technology writings and monthly webinars with NASA scientists and engineers. The highest achieving students are invited to NASA for a six-day residential summer experience at NASAs Johnson Space Center in Houston, Texas, where they work with NASA experts on designing a mission to Mars. Students are nominated by their state legislator and must be a Texas resident and U.S. citizen currently in their junior year of high school (rising seniors).", "https://www.nasa.gov/centers/johnson/stem/High_School_Aerospace_Scholars.html"), ("USI Girls Only STEM Camp", "Math", "Summer Camp", "Remote", "2020-07-06 to 2020-07-10", "2020-06-19", "$25", "The Girls Only (GO) STEM! Summer Camp at the University of Southern Indiana (USI) is taking on a new crew of campers this year - middle school girls!  Come join us for a week-long, non-residential experience where you can master new STEM skills and collaborate with your peers to solve problems using LEGO® EV3 robots, Spheros, and other cool gadgets! If you have been wondering about all the buzz surrounding LEGO® robotics and are looking for something fun to do during your summer break, grab a friend, and come join us!", "https://www.usi.edu/science/southwest-indiana-stem/girls-only-go-stem-summer-camp/"),("Girls Count", "Math", "Summer Camp", "Remote", "Ongoing", "None", "$75", "Becoming Data Scientists: We can tell important stories by creating graphs and we can learn about key relationships by reading graphs. Throughout the week we will become empowered data scientists who aren’t afraid to call out a misleading graph or confidently share a personal story through data. Each day, we will analyze a new set of real-world data and try our hands at presenting meaningful data concerning real world issues we care about.", "https://www.girlscountpdx.org/camps"),("Superposition All-Girls Hackathon", "Tech", "Hackathon", "Bay Area, CA", "2021-02-29 to 2020-03-01", "2020-02-16", "None", "Superposition IV is the oldest and largest 24-hour hackathon for high school and college females (trans and non-binary inclusive) in the Bay Area. We hosted 220 students from across 8 states and 2 countries, of which 77% were first-time hackathon attendees. This event is free to attend, and wi-fi, food, swag, and workspaces will be provided. Bring your passion for computer science and well take care of the rest! Its the perfect opportunity for anyone to take their next step forward in tech.", "https://superposition.tech/"),("Information Technology Intership", "Tech", "Internship", "Springfield, MO", "Ongoing", "None", "You get paid.", "Offers an opportunity for girls to use technology in real life situations such as accident and health insurance; property/casualty insurance for personal lines, agribusiness and targeted commercial businesses; and retirement, annuities and pension plan products.", "https://jobs.americannational.com/go/Students-and-Internships/4358700/"),("Technovation", "Tech", "Competition", "Remote", "2020-03-30", "2020-01-14 to 2020-08-14", "None", "Technovation Girls is a free technology-based program for girls ages 10 - 18. Working in teams (of 1 to 5), girls find a problem in their community and build a mobile app to help solve it. Along the way, they develop their collaboration, problem-solving, and leadership skills. Technovation Girls will take 30+ hours to complete (we recommend allocated about 12 weeks to finish) and is completely free.", "https://technovationchallenge.org/"),("Perry Outreach Program", "Medicine", "Learning", "Multiple", "Ongoing", "None", "None", "The Perry Initiative partners with medical centers, universities, and high schools to host Perry Outreach Programs for young women in high school. These day-long programs are held at over 45 locations nationwide throughout the year. Participants perform mock orthopaedic surgeries and conduct biomechanical engineering experiments, while also hearing from prominent women engineers and surgeons in the field.", "https://perryinitiative.org/"),("Womens Technology Program", "Tech", "Summer Camp", "Cambridge, MA", "2020-06-20 to 2020-07-22", "2020-01-15", "$3,500", "MIT’s Women’s Technology Program (WTP) is a four-week intensive academic and residential experience, wherein female students participate in hands-on classes, labs, and team-based projects. Students can attend the WTP in Electrical Engineering and Computer Science (EECS), or Mechanical Engineering (ME), however no prior background (or very little) in engineering is required for any student entering into the program (though high proficiency in math and science is required). Female MIT graduate students, or post-docs, not only design and teach the classes, but also share dorms with the students for the entirety of the program.", "http://wtp.mit.edu/")'
//       );
//     });
//   } else {
//     console.log('Database "Opportunities" ready to go!');
//     db.each("SELECT * from Opportunities", (err, row) => {
//       if (row) {
//         console.log(`record: ${row.name}`);
//       }
//     });
//   }
// });
//
// // http://expressjs.com/en/starter/basic-routing.html
// app.get("/", (request, response) => {
//   response.sendFile(`${__dirname}/views/index.html`);
// });
//
// // endpoint to get all the dreams in the database
// app.get("/getOpps", async (req, res) => {
//   const conn = await connection(dbConfig).catch(e => {})
//   const results = await query(conn, 'SELECT * FROM Opportunities').catch(console.log);
//   res.json({ results });
//    });
//
// // endpoint to add a dream to the database
// app.post("/addOpps", (request, response) => {
//   console.log(`add to opportunities ${request.body.name}`);
//
//   // DISALLOW_WRITE is an ENV variable that gets reset for new projects
//   // so they can write to the database
//   if (!process.env.DISALLOW_WRITE) {
//     db.run(
//       "INSERT INTO Opportunities (name, category, type, location, dateRange, deadline, cost, description, link) VALUES (?,?,?,?,?,?,?,?,?)",
//       request.body.name,
//       request.body.category,
//       request.body.type,
//       request.body.location,
//       request.body.dateRange,
//       request.body.deadline,
//       request.body.cost,
//       request.body.description,
//       request.body.link,
//       error => {
//         if (error) {
//           response.send({ message: "error!" });
//         } else {
//           response.send({ message: "success" });
//         }
//       }
//     );
//   }
// });
//
// // helper function that prevents html/css/script malice
// const cleanseString = function(string) {
//   return string.replace(/</g, "&lt;").replace(/>/g, "&gt;");
// };
//
// // listen for requests :)
// var listener = app.listen(process.env.PORT, () => {
//   console.log(`Your app is listening on port ${listener.address().port}`);
// });
