import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

let userSelectedDate;
const startBtn = document.querySelector("button[data-start]");
const inputEl = document.querySelector("#datetime-picker");

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (selectedDates[0] < new Date()) {
      iziToast.error({
        title: 'Hata',
        message: "Please choose a date in the future",
        position: 'topCenter',
      });
      startBtn.disabled = true;
      return;
    }

    startBtn.disabled = false;
    console.log('Tarih seçildi:', userSelectedDate);
  },
};

flatpickr("#datetime-picker", options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

startBtn.addEventListener("click", () => {
  startBtn.disabled = true;
  inputEl.disabled = true;

  const timerId = setInterval(() => {
    const currentTime = new Date();
    const deltaTime = userSelectedDate - currentTime;

    if (deltaTime <= 0) {
      clearInterval(timerId);
      inputEl.disabled = false; // Geri sayım tamamlanınca giriş tekrar etkin
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(deltaTime);

    document.querySelector("span[data-days]").textContent = addLeadingZero(days);
    document.querySelector("span[data-hours]").textContent = addLeadingZero(hours);
    document.querySelector("span[data-minutes]").textContent = addLeadingZero(minutes);
    document.querySelector("span[data-seconds]").textContent = addLeadingZero(seconds);
  }, 1000);
});
