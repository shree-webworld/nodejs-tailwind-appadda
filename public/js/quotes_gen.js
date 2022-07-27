
$(document).
ready(  function()
        {
          let realdata = " ";
          const getRandomQuotes = () =>{
                                          let rnum = Math.floor(Math.random() * 1642);
                                          console.log(rnum);
                                          $("#quotes").html(`<i class="ri-double-quotes-l"></i> ${realdata[rnum].text} <i class="ri-double-quotes-r"></i>`);
                                          $("#author").html(`&#8211; ${realdata[rnum].author}`);
                                        }

          const nextQuotes = async () =>{
                                          try
                                          {
                                            const api = 'https://type.fit/api/quotes';
                                            let data = await fetch(api);
                                          //  console.log(data);  //we get here response.
                                            // console.log(data.json());
                                             realdata = await data.json();
                                             //console.log(realdata.length);  //1643,so we multiple by 10 or 1642
                                            getRandomQuotes();

                                          } catch (e)
                                          {
                                            console.log(e);
                                          }
                                        }

          $("#submit_btn").click(getRandomQuotes);
           nextQuotes();

        }
    );
