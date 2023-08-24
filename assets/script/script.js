
// Function that holds the entire app functionality
$(function() {

  //Waits until the DOM is completely loaded before executing the current date/time
  $(document).ready(function updateTime() {
		var now = dayjs().format('dddd, MMMM DD, YYYY h:mm:ss A');
		$('#now').text(now);
    setInterval(updateTime, 1000);
  });

  // Sets current hour
  var currentHour = dayjs().hour();

  // Iterates through each hour and determines what state of time the current time is
  $('.time-block').each(function () {
		var thisHour = parseInt($(this).attr('id').split('-')[1]); // Turns id 'hour-x' into an array, splits into two values, and selects the number instead of 'hour'

		if (thisHour < currentHour) {
			$(this).removeClass('present future').addClass('past');
		} else if (thisHour == currentHour) {
			$(this).removeClass('past future').addClass('present');
		} else {
			$(this).removeClass('past present').addClass('future');
		}
  });

      // Adds event listener to save set items to selected time slot using local storage
      $('.saveBtn').on('click', function() {
        var timeId = $(this).parent().attr('id');

        var savedItem = $(this).siblings('.description').val();

        localStorage.setItem(timeId, savedItem);
      });

      // Checks local storage for saved items and retrieves them
      $('.time-block').each(function() {
        var timeId = $(this).attr('id');
        var savedItem = localStorage.getItem(timeId);

        if (savedItem) {
          $(this).find('.description').val(savedItem);
        }
});
    });
