window.turnOnCalendar = ->
  calendar = createCalendar()
  calendar.style.display = 'none'
  calendarContainer = document.getElementById('calendarContainer')
  calendarContainer.appendChild calendar
  return
calendarIsCreated = false
table = undefined
selectedDay = null
calendarIsVisible = false


window.createCalendar = ->
  calendar = document.createElement('div')
  calendar.id = 'calendar'
  dateMonth = document.createElement('div')
  dateMonth.id = 'dateMonth'
  dateMonth.className = 'row'
  year = document.createElement('div')
  year.className = 'col-sm-6'
  birthYearLabel = document.createElement('label')
  birthYearLabel.setAttribute 'for', 'birthYear'
  birthYearLabel.innerHTML = 'Год'
  birthYearSelect = document.createElement('select')
  birthYearSelect.id = 'birthYear'
  birthYearSelect.className = 'form-control'
  birthYearSelect.setAttribute 'onchange', 'onCalendarYearOrMonthChanged(event)'
  i = 1960
  while i < 2017
    option = document.createElement('option')
    option.value = i
    option.innerHTML = i
    birthYearSelect.appendChild option
    i++
  year.appendChild birthYearLabel
  year.appendChild birthYearSelect
  dateMonth.appendChild year
  month = document.createElement('div')
  month.className = 'col-sm-6'
  birthMonthLabel = document.createElement('label')
  birthMonthLabel.setAttribute 'for', 'birthMonth'
  birthMonthLabel.innerHTML = 'Месяц'
  birthMonthSelect = document.createElement('select')
  birthMonthSelect.id = 'birthMonth'
  birthMonthSelect.className = 'form-control'
  birthMonthSelect.setAttribute 'onchange', 'onCalendarYearOrMonthChanged(event)'
  i = 0
  while i < 12
    option = document.createElement('option')
    option.value = i
    option.innerHTML = getMonthNameById(i)
    birthMonthSelect.appendChild option
    i++
  month.appendChild birthMonthLabel
  month.appendChild birthMonthSelect
  dateMonth.appendChild month
  calendar.appendChild dateMonth
  table = getTable(1960, 0)
  calendar.appendChild table
  calendar

getTable = (year, month) ->
  table = document.createElement('table')
  table.className = 'table table-bordered'
  date = new Date(year, month, 1)
  rows = []
  rows[0] = document.createElement('tr')
  dayNameId = date.getDay()
  i = dayNameId
  while i < 7
    th = document.createElement('th')
    th.innerHTML = getDayName('short', i)
    th.style.textAlign = 'center'
    th.style.padding = '13px'
    rows[0].appendChild th
    i++
  i = 0
  while i < dayNameId
    th = document.createElement('th')
    th.innerHTML = getDayName('short', i)
    th.style.textAlign = 'center'
    th.style.padding = '13px'
    rows[0].appendChild th
    i++
  i = 0
  q = 0
  while i < 7 * Math.ceil(daysInMonth(year, month) / 7)
    if i % 7 == 0
      q++
      rows[q] = document.createElement('tr')
    btn = document.createElement('button')
    btn.className = 'btn btn-warning'
    btn.innerHTML = i + 1
    btn.style.minWidth = '42px'
    btn.style.minHeight = '42px'
    btn.style.margin = '3px'
    btn.addEventListener 'click', onDayClick
    td = document.createElement('td')
    if i < daysInMonth(year, month)
      td.appendChild btn
    rows[q].appendChild td
    i++
  i = 0
  while i < rows.length
    table.appendChild rows[i]
    i++
  table.style.marginTop = '10px'
  table

window.onCalendarYearOrMonthChanged = (event) ->
  birthMonth = document.getElementById('birthMonth')
  selectedMonth = birthMonth.options[birthMonth.selectedIndex].value
  birthYear = document.getElementById('birthYear')
  selectedYear = birthYear.options[birthYear.selectedIndex].value
  calendar.removeChild table
  table = getTable(selectedYear, selectedMonth)
  calendar.appendChild table
  selectedDay = null
  showBirthday()
  event.preventDefault()
  return

window.onDayClick = (event) ->
  if selectedDay != null
    selectedDay.className = 'btn btn-warning'
  selectedDay = event.target
  selectedDay.className = 'btn btn-success'
  showBirthday()
  event.preventDefault()
  return

window.showBirthday = ->
  birthMonth = document.getElementById('birthMonth')
  month = birthMonth.options[birthMonth.selectedIndex].value
  month++
  birthYear = document.getElementById('birthYear')
  year = birthYear.options[birthYear.selectedIndex].value
  day = undefined
  if selectedDay == null
    day = '--'
  else
    day = selectedDay.innerText
  document.getElementById('birthDate').value = year + '/' + (if month < 10 then '0' + month else month) + '/' + (if day < 10 then '0' + day else day)
  return

window.daysInMonth = (year, month) ->
  33 - new Date(year, month, 33).getDate()

window.showCalendar = (event) ->
  if !calendarIsCreated
    turnOnCalendar()
    calendarIsCreated = true

  calendarIsVisible = !calendarIsVisible
  
  switchButton = document.getElementById('switchButton');

  if calendarIsVisible
    calendar.style.display = 'block'
    switchButton.innerHTML = "Turn off calendar"
    switchButton.classList.add('btn-danger')
    switchButton.classList.remove('btn-success')
  else
    calendar.style.display = 'none'
    switchButton.innerHTML = "Turn on calendar"
    switchButton.classList.add('btn-success')
    switchButton.classList.remove('btn-danger')


  event.preventDefault()
  return

window.getDayName = (type, day) ->
  if type == 'short'
    switch day
      when 0
        return 'ВС'
      when 1
        return 'ПН'
      when 2
        return 'ВТ'
      when 3
        return 'СР'
      when 4
        return 'ЧТ'
      when 5
        return 'ПТ'
      when 6
        return 'СБ'
  if type == 'long'
    switch day
      when 0
        return 'Воскресенье'
      when 1
        return 'Понедельник'
      when 2
        return 'Вторник'
      when 3
        return 'Среда'
      when 4
        return 'Четверг'
      when 5
        return 'Пятница'
      when 6
        return 'Суббота'
  return

getMonthNameById = (i) ->
  switch i
    when 0
      return 'Январь'
    when 1
      return 'Февраль'
    when 2
      return 'Март'
    when 3
      return 'Апрель'
    when 4
      return 'Май'
    when 5
      return 'Июнь'
    when 6
      return 'Июль'
    when 7
      return 'Август'
    when 8
      return 'Сентябрь'
    when 9
      return 'Октябрь'
    when 10
      return 'Ноябрь'
    when 11
      return 'Декабрь'
  return