
$(document).
ready( function()
       {
         window.onload = function()
         {
           $("#listitem").focus();
         };

         $("#add").
         click(  function()
                 {
                     if($("#listitem").val() === "")
                     {
                       alert("No input\nWrite something!!");
                     }
                 }
              );
        }
    );
