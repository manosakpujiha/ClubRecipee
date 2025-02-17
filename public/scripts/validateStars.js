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