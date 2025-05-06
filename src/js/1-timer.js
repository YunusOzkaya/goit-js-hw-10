import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
let userSelectedDate;
let startBtn = document.querySelector("button[data-start]");
startBtn.disabled = true;
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
     userSelectedDate=selectedDates[0];
     if(selectedDates[0] < new Date()) {
        iziToast.error({
            title: 'Hata',
            message: "Please choose a date in the future",
            position: 'topCenter',
          });
        return;
      }
      else {
        document.querySelector("button[data-start]").disabled = false;
        userSelectedDate = selectedDates[0];
        console.log(userSelectedDate);
      }
    },
  };

  const flatpickrInstance = flatpickr("#datetime-picker", options);

function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
function addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
startBtn.addEventListener("click", () => {
    startBtn.disabled = true;
    let timerId = setInterval(() => {
        const currentTime = new Date();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime < 0) {
            clearInterval(timerId);
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(deltaTime);
        document.querySelector("span[data-days]").textContent = addLeadingZero(days);
        document.querySelector("span[data-hours]").textContent = addLeadingZero(hours);
        document.querySelector("span[data-minutes]").textContent = addLeadingZero(minutes);
        document.querySelector("span[data-seconds]").textContent = addLeadingZero(seconds);
        startBtn.disabled = false;
    }, 1000);
}
);