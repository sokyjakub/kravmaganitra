$('#contactForm').submit( (event) => {

    event.preventDefault();


    // get values from FORM
    const name = $('input#full_name').val();
    const email = $('input#email').val();
	const phone = $('input#tel').val();
	const message = $('textarea#message').val();
    const checkbox = $('input#gdpr');


    // VALIDATION
    if( isEmpty(name) ) { 
        $('input#full_name').addClass('required')
    } else {
        $('input#full_name').removeClass('required')
    }
    if( isEmpty(email) ){ 
        $('input#email').addClass('required')
    } else {
        $('input#email').removeClass('required')
    }
    if( isEmpty(phone) ){ 
        $('input#tel').addClass('required')
    } else {
        $('input#tel').removeClass('required')
    }

    if( isEmpty(name) || isEmpty(email) || isEmpty(phone) ) {

        // Fill field message 
        $('#response_msg')
                .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <div class="d-flex align-items-center">
                          <i class="fas fa-exclamation-circle fa-2x me-2"></i>
                          <strong>Prosím vyplňte všetky povinné polia!</strong>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);

        return;
    }

    if( !checkbox.is(':checked') ) {

        checkbox.addClass('required');

        // Agree with GDPR
        $('#response_msg')
                .html(`<div class="alert alert-danger alert-dismissible fade show" role="alert">
                        <div class="d-flex align-items-center">
                          <i class="fas fa-exclamation-circle fa-2x me-2"></i>
                          <strong>Musíte súhlasiť so spracovaním údajov!</strong>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);

        return;
    } else {
        checkbox.removeClass('required');

    }

	
    $.ajax({
        type: "POST",
        url: "././formular.php",
        data: {
            name: name,
			email: email,
            phone: phone,
			message: message		
        },
        cache: false,

        success: () => {

            // Success message
            $('#response_msg')
                .html(`<div class="alert alert-success alert-dismissible fade show" role="alert">
                        <div class="d-flex align-items-center">
                          <i class="fas fa-check-circle fa-2x me-2"></i>
                          <strong>Tvoja správa bola odoslaná.</strong>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);

            //clear all fields
            $('#contactForm').trigger("reset");
        },

        error: () => {

            // Fail message
            $('#response_msg')
                .html(`<div class="alert alert-warning alert-dismissible fade show" role="alert">
                        <div class="d-flex align-items-center">
                          <i class="fas fa-exclamation-triangle fa-2x me-2"></i>
                          <strong>Tvoju správu sa nepodarilo odoslať. Prosím, skús to znova!</strong>
                        </div>
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                      </div>`);

            //clear all fields
            $('#contactForm').trigger("reset");
        }

    });

});



function isEmpty(str) {
    return !str.trim().length;
}