
$(document).
ready(  function()
        {
          let quizDB = [
                           {
                             question :"Q1. Inside which HTML element do we put the JavaScript?",
                             a : "<script>",
                             b : "<scripting>",
                             c : "<JavaScript>",
                             d : "<js>",
                             ans : "ansa",
                           },
                           {
                             question :"Q2. How do you write 'Hello World' in an  box?",
                             a : "alert('Hello World');",
                             b : "alertBox('Hello World');",
                             c : "msg('Hello World');",
                             d : "msgBox('Hello World');",
                             ans : "ansa",
                           },
                           {
                             question : "Q3. How to write an IF statement in JavaScript?",
                             a : "if i == 5 then",
                             b : "if = 5",
                             c : "if(i == 5)",
                             d : "if i = 5 then",
                             ans : "ansc",
                           },

                         ];

            let count = 0;
            let score = 0;
            let selected_answer = document.querySelectorAll(".answer");


            const loadQuestion = () => {
                                            $("#question").text(quizDB[count].question);
                                            $("#label_id1").text(quizDB[count].a);
                                            $("#label_id2").text(quizDB[count].b);
                                            $("#label_id3").text(quizDB[count].c);
                                            $("#label_id4").text(quizDB[count].d);
                                            $("#reload_btn").hide();
                                       }
            loadQuestion();

            const deselectAll = () =>{
                                          selected_answer.
                                          forEach((currCheckedElement) => { currCheckedElement.checked = false});

                                     }

            let getCheckedAnswer = () =>{ //first define function
                                            let checked_answer = undefined ;
                                            // $(".answer").
                                            selected_answer.
                                            forEach(     //"each" instead of "forEach" in jquery
                                                     (currCheckedElement) => {
                                                                                if (currCheckedElement.checked)
                                                                                {
                                                                                    checked_answer = currCheckedElement.id;
                                                                                }
                                                                             }
                                                  );
                                            console.log(`the checked_answer is `+checked_answer);
                                            return checked_answer;
                                          }


            //button code
            $("#quiz_btn").
            click(  function()
                    {
                          let checkbox_selected = getCheckedAnswer();//then call function always
                          //
                          console.log(` The checkbox selected is ${checkbox_selected} and ${quizDB[count].ans}
                                      ${Boolean(checkbox_selected === quizDB[count].ans)},
                                      ${checkbox_selected}===${quizDB[count].ans}
                                       ${typeof(checkbox_selected)}===${typeof(quizDB[count].ans)}
                                        and score = ${score}
                                        quizDB = ${quizDB.length}`);

                          if( (checkbox_selected === quizDB[count].ans) )
                          {
                              // console.log(`in if loop ${checkbox_selected} === ${quizDB[count].ans}`);
                              score+=0 ;
                          }else {
                            score++;
                          }
                          console.log(`score in if loop: ${score} `);
                          count++;
                          console.log(`count ${count}`);
                          deselectAll();
                          if ( count < quizDB.length)
                          {
                              loadQuestion();
                          } else
                            {
                                $("#header_section").hide();
                                $(".time_line").hide();
                                $("#question").hide();
                                $("#label_id1").hide();
                                $("#label_id2").html(`<figure>
                                                        <img class='animate-pulse mt-5' src="images/quiz/trophy.png"  alt="trophy_image" width="300" height="200">
                                                        <figcaption class='text-4xl font-bold mt-5 text-yellow-500 '>
                                                           Your score is (${score}/${quizDB.length})
                                                        </figcaption>
                                                    </figure>`);
                                $("#label_id3").hide();
                                $("#label_id4").hide();
                                $(".radio-lg").hide();
                                $("#quiz_btn").hide();
                                $("#reload_btn").show();
                            }
                     }
                 );
        }
    );
