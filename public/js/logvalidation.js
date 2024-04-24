$(document).ready(function() {
   
    $("form").submit(function(event) {
      
      event.preventDefault();
      
     
      var email = $("#email").val();
      var password = $("#password").val();
      
      
      if (email.trim() === "" || password.trim() === "") {
        
        alert("Please enter both email and password.");
      } else {
       
        $(this).unbind("submit").submit();
      }
    });
  });