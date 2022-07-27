

$(document).ready(function()
{

  const select = $(".currency");

  let realdata = "";
  let text_num = "";
  let text_num1 = "";
  let currency1 = "";
  let currency2 = "";
  // console.log(select);


  const getValue = (realdata) =>{
                            const entries = Object.entries(realdata);
                             //console.log(entries.length);
                             for (var i = 0; i < entries.length; i++)
                             {
                               // console.log(entries[i][1]);
                               select[0].innerHTML  += `<option value = "${entries[i][0]}"> ${entries[i][1]} </option>` ;
                               select[1].innerHTML  += `<option value = "${entries[i][0]}"> ${entries[i][1]} </option>` ;
                               // console.log($("select").val());
                             }
                          }

const currency_convert = async (currency1, currency2, text_num) =>
                                {
                                        try {
                                                const host = 'api.frankfurter.app';
                                                const data1 = await fetch(`https://${ host }/latest?amount=${text_num}&from=${currency1}&to=${currency2}`);
                                                const realdata1 = await data1.json();
                                                const arr_data = [realdata1];
                                                console.log(Object.values(arr_data[0].rates)[0]);
                                               $("#ans").val(Object.values(arr_data[0].rates)[0]);
                                              console.log();
                                                $(".details h1").text(`${Object.values(arr_data[0].rates)[0]} ${currency2}`);
                                                 //console.log(Object.values(realdata1.rates));

                                              } catch (e)
                                                {
                                                    console.log(e);
                                                }
                                }



$(".currency").change(function()
                        {
                           currency1 = select[0].value;
                          currency2 = select[1].value;
                           text_num = $("#num").val();
                          // console.log(text_num);
                           // console.log(currency1); //gives country selected in dropdown box
                           // console.log(currency2);

                          if (currency1!= currency2)
                          {
                            currency_convert(currency1, currency2, text_num);
                            $(".details p").text(`${text_num} ${currency1} equals`);

                          }else {
                            alert("Select two different currencies");
                          }
                        }
                      );



  const convert = async () =>{
                              try
                              {
                                let data = await fetch("https://api.frankfurter.app/currencies");
                                realdata = await data.json();
                                //console.log(realdata);
                                getValue(realdata);
                              }
                              catch (e)
                              {
                                console.log(e);
                              }
                            }

convert();
});
