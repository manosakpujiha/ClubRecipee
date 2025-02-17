(function () {
    'use strict'
    // Fetch all the forms we want to apply custom Bootstrap validation styles to
    const forms = document.querySelectorAll('.validate-form')
    
    // Loop over them and prevent submission
    Array.from(forms).forEach(function (form) {
        form.addEventListener('submit', function (event) {
            if (!form.checkValidity()) {
                event.preventDefault()
                event.stopPropagation()
            }
            form.classList.add('was-validated')
        }, false)
    })
})();


document.addEventListener('DOMContentLoaded', function() {
    // Flag to track if a star has been clicked
    let ratingSelected = false;
    const radios = document.querySelectorAll('input[name="review[rating]"]');

    // Attach click listeners to all rating radio inputs
    radios.forEach((radio) => {
      radio.addEventListener('click', function() {
        ratingSelected = true;
      });
    });

    const form = document.querySelector('.validate-form');
    form.addEventListener('submit', function(e) {
      // Even if 3 is selected by default, if no star has been actively clicked,
      // inform the user to select one.
      if (!ratingSelected) {
        e.preventDefault();
        alert("Please select a rating by clicking the stars.");
      }
    });
  });