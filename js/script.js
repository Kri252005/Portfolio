$(document).ready(function() {
    
    // 1. Footer Year Update
    // Sets the current year dynamically in the footer.
    $('#current-year').text(new Date().getFullYear());

    // 2. jQuery for Mobile Navigation Toggle (Hamburger Menu)
    // Toggles the visibility of the main navigation list on mobile.
    $('.menu-toggle').on('click', function() {
        // .stop() prevents animation queuing if the button is clicked rapidly.
        $('#main-nav ul').stop().slideToggle(300); 
    });

    // 3. CORRECTED jQuery AJAX for Formspree Submission
    var form = $('#contact-form');
    var formMessage = $('#form-message');

    $(form).submit(function(e) {
        // Prevent the default browser form submission (which causes a page reload)
        e.preventDefault(); 
        
        // Convert serialized form data into a JSON object, as required by Formspree for AJAX
        var formData = $(form).serializeArray().reduce(function(obj, item) {
            obj[item.name] = item.value;
            return obj;
        }, {});

        // Clear any previous messages
        $(formMessage).text('');
        $(formMessage).removeClass('success error');

        $.ajax({
            url: $(form).attr('action'), // Uses the Formspree action URL
            method: 'POST',
            data: JSON.stringify(formData), // Send data as JSON string
            dataType: 'json', 
            contentType: 'application/json', // Crucial: tells the server the data format is JSON
        })
        .done(function(response) {
            // Success: Formspree returns a 200/204 response
            $(formMessage).removeClass('error').addClass('success');
            $(formMessage).text('Thank you! Your message has been sent successfully.');
            form[0].reset(); // Clear the form fields
        })
        .fail(function(data) {
            // Failure: Can be due to network error, Formspree block, or invalid data
            $(formMessage).removeClass('success').addClass('error');
            
            // Check for specific Formspree response if available, otherwise use a generic error
            if (data.status === 422) {
                 $(formMessage).text('Please check your form input. There was a data validation error.');
            } else {
                 $(formMessage).text('Oops! An error occurred and your message could not be sent. Check console for details.');
            }
            console.error('AJAX Submission Failed:', data);
        });
    });
});