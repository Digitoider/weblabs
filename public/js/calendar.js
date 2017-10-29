/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(1);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

var calendarIsCreated, calendarIsVisible, getMonthNameById, getTable, selectedDay, table;

window.turnOnCalendar = function() {
  var calendar, calendarContainer;
  calendar = createCalendar();
  calendar.style.display = 'none';
  calendarContainer = document.getElementById('calendarContainer');
  calendarContainer.appendChild(calendar);
};

calendarIsCreated = false;

table = void 0;

selectedDay = null;

calendarIsVisible = false;

window.createCalendar = function() {
  var birthMonthLabel, birthMonthSelect, birthYearLabel, birthYearSelect, calendar, dateMonth, i, month, option, year;
  calendar = document.createElement('div');
  calendar.id = 'calendar';
  dateMonth = document.createElement('div');
  dateMonth.id = 'dateMonth';
  dateMonth.className = 'row';
  year = document.createElement('div');
  year.className = 'col-sm-6';
  birthYearLabel = document.createElement('label');
  birthYearLabel.setAttribute('for', 'birthYear');
  birthYearLabel.innerHTML = 'Год';
  birthYearSelect = document.createElement('select');
  birthYearSelect.id = 'birthYear';
  birthYearSelect.className = 'form-control';
  birthYearSelect.setAttribute('onchange', 'onCalendarYearOrMonthChanged(event)');
  i = 1960;
  while (i < 2017) {
    option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    birthYearSelect.appendChild(option);
    i++;
  }
  year.appendChild(birthYearLabel);
  year.appendChild(birthYearSelect);
  dateMonth.appendChild(year);
  month = document.createElement('div');
  month.className = 'col-sm-6';
  birthMonthLabel = document.createElement('label');
  birthMonthLabel.setAttribute('for', 'birthMonth');
  birthMonthLabel.innerHTML = 'Месяц';
  birthMonthSelect = document.createElement('select');
  birthMonthSelect.id = 'birthMonth';
  birthMonthSelect.className = 'form-control';
  birthMonthSelect.setAttribute('onchange', 'onCalendarYearOrMonthChanged(event)');
  i = 0;
  while (i < 12) {
    option = document.createElement('option');
    option.value = i;
    option.innerHTML = getMonthNameById(i);
    birthMonthSelect.appendChild(option);
    i++;
  }
  month.appendChild(birthMonthLabel);
  month.appendChild(birthMonthSelect);
  dateMonth.appendChild(month);
  calendar.appendChild(dateMonth);
  table = getTable(1960, 0);
  calendar.appendChild(table);
  return calendar;
};

getTable = function(year, month) {
  var btn, date, dayNameId, i, q, rows, td, th;
  table = document.createElement('table');
  table.className = 'table table-bordered';
  date = new Date(year, month, 1);
  rows = [];
  rows[0] = document.createElement('tr');
  dayNameId = date.getDay();
  i = dayNameId;
  while (i < 7) {
    th = document.createElement('th');
    th.innerHTML = getDayName('short', i);
    th.style.textAlign = 'center';
    th.style.padding = '13px';
    rows[0].appendChild(th);
    i++;
  }
  i = 0;
  while (i < dayNameId) {
    th = document.createElement('th');
    th.innerHTML = getDayName('short', i);
    th.style.textAlign = 'center';
    th.style.padding = '13px';
    rows[0].appendChild(th);
    i++;
  }
  i = 0;
  q = 0;
  while (i < 7 * Math.ceil(daysInMonth(year, month) / 7)) {
    if (i % 7 === 0) {
      q++;
      rows[q] = document.createElement('tr');
    }
    btn = document.createElement('button');
    btn.className = 'btn btn-warning';
    btn.innerHTML = i + 1;
    btn.style.minWidth = '42px';
    btn.style.minHeight = '42px';
    btn.style.margin = '3px';
    btn.addEventListener('click', onDayClick);
    td = document.createElement('td');
    if (i < daysInMonth(year, month)) {
      td.appendChild(btn);
    }
    rows[q].appendChild(td);
    i++;
  }
  i = 0;
  while (i < rows.length) {
    table.appendChild(rows[i]);
    i++;
  }
  table.style.marginTop = '10px';
  return table;
};

window.onCalendarYearOrMonthChanged = function(event) {
  var birthMonth, birthYear, selectedMonth, selectedYear;
  birthMonth = document.getElementById('birthMonth');
  selectedMonth = birthMonth.options[birthMonth.selectedIndex].value;
  birthYear = document.getElementById('birthYear');
  selectedYear = birthYear.options[birthYear.selectedIndex].value;
  calendar.removeChild(table);
  table = getTable(selectedYear, selectedMonth);
  calendar.appendChild(table);
  selectedDay = null;
  showBirthday();
  event.preventDefault();
};

window.onDayClick = function(event) {
  if (selectedDay !== null) {
    selectedDay.className = 'btn btn-warning';
  }
  selectedDay = event.target;
  selectedDay.className = 'btn btn-success';
  showBirthday();
  event.preventDefault();
};

window.showBirthday = function() {
  var birthMonth, birthYear, day, month, year;
  birthMonth = document.getElementById('birthMonth');
  month = birthMonth.options[birthMonth.selectedIndex].value;
  month++;
  birthYear = document.getElementById('birthYear');
  year = birthYear.options[birthYear.selectedIndex].value;
  day = void 0;
  if (selectedDay === null) {
    day = '--';
  } else {
    day = selectedDay.innerText;
  }
  document.getElementById('birthDate').value = year + '/' + (month < 10 ? '0' + month : month) + '/' + (day < 10 ? '0' + day : day);
};

window.daysInMonth = function(year, month) {
  return 33 - new Date(year, month, 33).getDate();
};

window.showCalendar = function(event) {
  var switchButton;
  if (!calendarIsCreated) {
    turnOnCalendar();
    calendarIsCreated = true;
  }
  calendarIsVisible = !calendarIsVisible;
  switchButton = document.getElementById('switchButton');
  if (calendarIsVisible) {
    calendar.style.display = 'block';
    switchButton.innerHTML = "Turn off calendar";
    switchButton.classList.add('btn-danger');
    switchButton.classList.remove('btn-success');
  } else {
    calendar.style.display = 'none';
    switchButton.innerHTML = "Turn on calendar";
    switchButton.classList.add('btn-success');
    switchButton.classList.remove('btn-danger');
  }
  event.preventDefault();
};

window.getDayName = function(type, day) {
  if (type === 'short') {
    switch (day) {
      case 0:
        return 'ВС';
      case 1:
        return 'ПН';
      case 2:
        return 'ВТ';
      case 3:
        return 'СР';
      case 4:
        return 'ЧТ';
      case 5:
        return 'ПТ';
      case 6:
        return 'СБ';
    }
  }
  if (type === 'long') {
    switch (day) {
      case 0:
        return 'Воскресенье';
      case 1:
        return 'Понедельник';
      case 2:
        return 'Вторник';
      case 3:
        return 'Среда';
      case 4:
        return 'Четверг';
      case 5:
        return 'Пятница';
      case 6:
        return 'Суббота';
    }
  }
};

getMonthNameById = function(i) {
  switch (i) {
    case 0:
      return 'Январь';
    case 1:
      return 'Февраль';
    case 2:
      return 'Март';
    case 3:
      return 'Апрель';
    case 4:
      return 'Май';
    case 5:
      return 'Июнь';
    case 6:
      return 'Июль';
    case 7:
      return 'Август';
    case 8:
      return 'Сентябрь';
    case 9:
      return 'Октябрь';
    case 10:
      return 'Ноябрь';
    case 11:
      return 'Декабрь';
  }
};


/***/ })
/******/ ]);