
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require("dotenv").config();
// const n_ = require("lodash");

const app = express();
const port = process.env.PORT || 5001;
const ejs = require('ejs');
const path = require('path');
const database = process.env.DATABASE;

// let item = "";  //scope issue.
let item_array = ["array1"];

const public_path = path.join(__dirname,"../public");
const views_path = path.join(__dirname, "../views");
//console.log(views_path);
// console.log(public_path);
app.set('view engine', 'ejs');
app.set('views', views_path);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(public_path));


mongoose.connect(`${database}`,
{useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify: false})
.then( ()=> console.log("connection to mongodb is successfull..."))
.catch( (err)=> console.log(err));

const itemSchema = new mongoose.Schema({ name: String });

//collection creation. model name should always be capital.
const Todo_list_item = mongoose.model('Todo_list_item', itemSchema);

const item1 = new Todo_list_item({name : "Add"});
const item2 = new Todo_list_item({name : "New"});
const item3 = new Todo_list_item({name : "Task"});

const defaultItems = [ item1, item2, item3];
 // Todo_list_item.insertMany( defaultItems, function(err)
 //                                          {
 //                                            try
 //                                            {
 //                                              console.log(`saved items to database`);
 //                                            } catch (err)
 //                                            {
 //                                              console.log(err);
 //                                            }
 //                                          }
 //                            );




app.get("/", (req, res) =>
              {
                res.render('index');

              }
      );

  app.get("/rough", (req, res) =>
                    {
                       var myname = "Shreedhar";
                       var today = new Date();
                       var options =
                           {
                             weekday : "long",
                             day : "numeric",
                             month : "long"
                           }
                       var day = today.toLocaleDateString("en-US",options);
                       // res.render("rough", {name : myname, kindofday : day, newListItem : item_array});
                      res.render("rough");      //newListItem : item     -item will be seen in single line
                    }
            );


app.post("/rough", (req, res) =>
              {
                 var item = req.body.newItem;   //newItem is input text name
                 item_array.push(item);
                console.log(item);
                res.redirect("/rough");
              }
        );

app.get("/todo_list", async (req, res) =>
              {
                await Todo_list_item.find( {},
                function(err, foundItems)
                {
                   if (foundItems.length === 0)
                   {
                     Todo_list_item.
                     insertMany( defaultItems,
                                   function(err)
                                   {
                                      try
                                      {
                                          console.log(`saved defaultItems to database`);
                                      } catch (err)
                                        {
                                          console.log(err);
                                        }
                                   }
                              );
                              res.redirect("/todo_list");   //in app.get complusory, not outside
                   } else
                    {
                       console.log(`The foundItems are `+foundItems);
                       res.render("todo_list_mongo2", { newListItem : foundItems});
                    }
                });
                // var name = "Shreedhar";
                // res.render("todo_list_mongo",{ name: name, newListItem : item_array});
              });

      app.post("/todo_list", async (req, res) =>
                    {
                      //this is using array to insert item
                      /* var item = req.body.newItem;   //newItem is input text name
                       item_array.push(item);
                      console.log(item);
                      res.redirect("/todo_list");   //--/todo_list should be same remember*/

                      //insert item using mongodb
                        const itemName = req.body.newItem;  //newItem is input text name
                        if (itemName === "")
                        {
                            console.log("No input\nWrite something!!");
                            res.redirect("/todo_list");
                        } else
                          {
                            console.log(`The latest inserted itemName is `+itemName);
                            const item = new  Todo_list_item( { name : itemName });
                            await item.save();  //to insert single item insertMany([]) for multiple.
                              // console.log(item);
                            res.redirect("/todo_list");
                          }
                    }
              );

app.post("/taskdelete", async (req, res) =>
                    {
                       try
                       {
                          console.log(`The clicked button id is `+req.body.delete_btn_name);
                          const checkItemId = req.body.delete_btn_name;
                           await Todo_list_item.findByIdAndDelete(  checkItemId,
                          /*deprecated - findByIdAndRemove*/  function(err)
                                                               {
                                                                  if (!err)
                                                                  {
                                                                    console.log(`successfull in deleting`);
                                                                  }
                                                               }
                                                          );
                          res.redirect("/todo_list");
                       } catch (e)
                        {
                            console.log(e);
                        }
                    }
        );


app.get("/currency_converter",
          async (req,res) =>
          {
              try
              {
                  await res.render("currency_converter2");

              } catch (e)
                {
                    console.log(`Error for currency_converter is `+e);
                }

          }
        );


app.get("/weather",
                  async (req,res) =>
                  {
                      try
                      {
                          await res.render("weather2");

                      } catch (e)
                        {
                            console.log(`Error for weather_app is `+e);
                        }

                  }
                );

app.get("/quotes",
                  async (req, res) =>
                  {
                      try
                      {
                          await res.render("quotes_gen2");

                      } catch (e)
                      {
                         console.log(`Error for quotes_gen is ` +e);
                      }

                  }
       );

app.get("/quiz", async (req, res) =>
                 {
                    try
                    {
                        await res.render("quiz3");

                    } catch (e) { console.log(`Error for quiz app is ` +e);  }
                 }
        );

app.get("/typing_speed_test", async (req, res) =>
                  {
                            try
                            {
                                await res.render("typing_speed_test");

                            } catch (e) { console.log(`Error for typing_speed_test app is ` +e);  }
                  }
        );



                app.get("/about", async (req, res) =>
                                 {
                                    try
                                    {
                                        await res.render("about");

                                    } catch (e) { console.log(`Error for about is ` +e);  }
                                 }
                        );


app.get("/404error", async (req, res) =>
                     {
                          try
                          {
                             // await res.status(404);
                              await res.render("404error2");

                          } catch (e) { console.log(`Error for practise app is ` +e);  }
                     }
        );



app.use(async (req,res,next) =>
              {
                  try
                  {
                      await res.redirect("/404error");

                  } catch (e) { console.log(`Error for 404error page is ` +e);  }
              }
        );

app.listen(port, () =>
                  {
                      console.log(`This is port no. ${port}`);
                  }
          );

// nodemon src/app.js -e js,ejs
