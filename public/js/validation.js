$(document).ready(function() {
    $('#registrationForm').submit(function(event) {
        event.preventDefault(); 

        
        var firstName = $('#firstName').val();
        var lastName = $('#lastName').val();
        var email = $('#email').val();
        var password = $('#password').val();
        var iAgree = $('#iAgree').is(':checked');

       
        if (!firstName.trim()) {
            alert('Please enter your first name');
            return;
        }
        if (!lastName.trim()) {
            alert('Please enter your last name');
            return;
        }
        if (!email.trim()) {
            alert('Please enter your email');
            return;
        }
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        if (!isValidPassword(password)) {
            alert('Please enter your password');
            return;
        }
        if (!iAgree) {
            alert('Please agree to the terms and conditions');
            return;
        }

        
        this.submit();
    });

    
    function isValidEmail(email) {
        
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function isValidPassword(password){
        
    var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=])[a-zA-Z\d@#$%^&+=]{8,}$/;
    
    return passwordRegex.test(password);

    }
});