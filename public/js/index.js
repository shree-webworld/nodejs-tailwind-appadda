
$(document).
ready( function()
       {
         var options = {
           strings: [
                      'Currency Converter App',
                      'Weather App',
                      'Quotes App',
                      'To-Do List App',
                      'Quiz Game ',
                      'Typing Speed Test Game '
                    ],
           typeSpeed: 120,
           backSpeed:120,
           loop:true,
           cursorChar:"✍🏽",
         };

         var typed = new Typed('#anim', options);
       }
);
