
$(document).
ready(function()
      {
        const typingText = document.querySelector("#typing_text p"),
              inpField = document.querySelector(".hero .input"),
              timeTag = document.querySelector("#time span b"),
              mistakeTag = document.querySelector("#mistake span"),
              wpmTag = document.querySelector("#wpm span"),
              cpmTag = document.querySelector("#cpm span"),
              tryAgainBtn = document.querySelector("#content button");

        let timer, isTyping = false,
        maxTime = 60,
        timeLeft = maxTime,
        charIndex = mistakes = 0; //This line means charIndex & mistakes value is 0.

        let randomParagraph = () =>
            {
              let ranIndex = Math.floor(Math.random() * paragraphs.length);
                  typingText.innerHTML = ""; //for tryAgainBtn to erase old para & load new one

              paragraphs[ranIndex].split("").forEach(span => {
                                                                let spanTag = `<span>${span}</span>`;
                                                                typingText.innerHTML += spanTag;
                                                              }
                                                    );
              document.addEventListener("keydown", ()=> inpField.focus());
              typingText.addEventListener("click", ()=> inpField.focus());

            }

        let initTyping = () =>
            {
              const characters = typingText.querySelectorAll("span");
              let typedChar = inpField.value.split("")[charIndex];
              // console.log(characters[0]);
              // console.log(typedChar);
              if(charIndex < characters.length - 1 && timeLeft > 0)
              {
                        if(!isTyping) //once the timer is start, it won't reset again
                        {
                            timer = setInterval(initTimer, 1000);
                            isTyping = true;
                        }
                        // For backspace button
                        if(typedChar == null)
                        {
                          charIndex--; //decrement charIndex and
                          if(characters[charIndex].classList.contains("incorrect"))
                          {
                              mistakes--;
                          }
                          characters[charIndex].classList.remove("correct", "incorrect"); //remove correct & incorrect for erased characters

                        } else
                          {
                            if (characters[charIndex].innerText === typedChar)
                            {
                              // console.log(`correct`);
                              characters[charIndex].classList.add("correct");

                            }else
                              {
                                // console.log(`incorrect`);
                                mistakes++;
                                characters[charIndex].classList.add("incorrect");
                              }
                              charIndex++;
                          }
                            //Showing blinking underline on the active character
                            characters.forEach(span => span.classList.remove("active")); //removing active class from all span
                            characters[charIndex].classList.add("active"); //then adding to current span tag only

                        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60);
                      //if wpm value is 0   || empty || Infinity then setting its value to 0
                            wpm  = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
                            mistakeTag.innerText = mistakes; //Showing no. of mistakes
                            cpmTag.innerText = charIndex - mistakes;
                            wpmTag.innerText = wpm;
                  }
                  else
                  {
                        //when timer is 0 input filed is reset to blank and timer too reset.
                        inpField.value = " ";
                        clearInterval(timer);
                  }
            }


        let initTimer = () =>
            {
                if(timeLeft > 0)
                {
                    timeLeft--;
                    timeTag.innerText = timeLeft;
                }else
                  {
                      clearInterval(timer);  //timer = setInterval(initTimer, 1000);
                  }
            }

        let resetGame = () =>
            {
              randomParagraph();
              clearInterval(timer);
              timeLeft = maxTime;
              charIndex = mistakes = isTyping = 0;
              inpField.value = "";
              timeTag.innerText = timeLeft;
              wpmTag.innerText = 0;
              mistakeTag.innerText = 0;
              cpmTag.innerText = 0;

            }

        randomParagraph();
        inpField.addEventListener("input", initTyping);
        tryAgainBtn.addEventListener("click",resetGame);
      }
    );
