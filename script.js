(function initTheme() {
    const THEME_KEY = 'timey-theme';
    let saved = null;
    try {
        saved = localStorage.getItem(THEME_KEY);
    } catch (_) {}
    const theme = saved === 'light' || saved === 'dark' ? saved : 'dark';
    document.documentElement.setAttribute('data-theme', theme);
})();

document.addEventListener('DOMContentLoaded', async () => {
    const THEME_KEY = 'timey-theme';
    const profileAvatar = document.querySelector('.avatar');

    function updateProfileAvatar(theme) {
        if (!profileAvatar) return;
        const background = theme === 'light' ? 'ffffff' : '1a2332';
        profileAvatar.src = `https://ui-avatars.com/api/?name=IF&background=${background}&color=2F80FF&size=128`;
    }

    function applyTheme(next) {
        const t = next === 'light' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', t);
        updateProfileAvatar(t);
        try {
            localStorage.setItem(THEME_KEY, t);
        } catch (_) {}
    }

    updateProfileAvatar(document.documentElement.getAttribute('data-theme') || 'dark');

    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const cur = document.documentElement.getAttribute('data-theme') || 'dark';
            applyTheme(cur === 'dark' ? 'light' : 'dark');
        });
    }

    let scheduleData = null;
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    let selectedDate = new Date(today);

    let searchQuery = '';
    let onlineOnly = false;
    
    const calendarGrid = document.getElementById('calendar-grid');
    const currentMonthYear = document.getElementById('current-month-year');
    const prevMonthBtn = document.getElementById('prev-month');
    const nextMonthBtn = document.getElementById('next-month');
    
    const selectedDateDisplay = document.getElementById('selected-date-display');
    const scheduleTitle = document.getElementById('schedule-title');
    const prevDayBtn = document.getElementById('prev-day');
    const nextDayBtn = document.getElementById('next-day');
    const btnToday = document.getElementById('btn-today');

    const scheduleSearchInput = document.getElementById('schedule-search');
    const scheduleClearBtn = document.getElementById('schedule-clear-btn');
    const onlineOnlyCheckbox = document.getElementById('online-only');

    const filterHitsPanel = document.getElementById('filter-hits');
    const filterHitsPills = document.getElementById('filter-hits-pills');
    
    const scheduleList = document.getElementById('schedule-list');
    const statusBanner = document.getElementById('status-banner');
    
    const pinnedList = document.getElementById('pinned-list');
    const addAgendaBtn = document.getElementById('add-agenda-btn');
    const addQuickBtn = document.querySelector('.add-quick-btn');
    const agendaModal = document.getElementById('agenda-modal');
    const closeModal = document.getElementById('close-modal');
    const agendaForm = document.getElementById('agenda-form');
    
    const colors = ['color-1', 'color-2', 'color-3', 'color-4', 'color-5'];

    function syncScheduleControls() {
        if (scheduleClearBtn) scheduleClearBtn.classList.toggle('hidden', searchQuery.length === 0);
        if (onlineOnlyCheckbox) onlineOnly = !!onlineOnlyCheckbox.checked;
    }

    if (scheduleSearchInput) {
        scheduleSearchInput.addEventListener('input', () => {
            searchQuery = scheduleSearchInput.value.trim().toLowerCase();
            syncScheduleControls();
            renderCalendar(currentMonth, currentYear);
            updateScheduleView();
        });
    }

    if (scheduleClearBtn) {
        scheduleClearBtn.addEventListener('click', () => {
            if (scheduleSearchInput) scheduleSearchInput.value = '';
            searchQuery = '';
            syncScheduleControls();
            renderCalendar(currentMonth, currentYear);
            updateScheduleView();
        });
    }

    if (onlineOnlyCheckbox) {
        onlineOnlyCheckbox.addEventListener('change', () => {
            syncScheduleControls();
            renderCalendar(currentMonth, currentYear);
            updateScheduleView();
        });
    }
    
    scheduleData = typeof staticScheduleData !== 'undefined' ? staticScheduleData : null;
    
    if (!scheduleData) {
        scheduleList.innerHTML = `<div class="no-schedule"><i class="ri-error-warning-line"></i><h3>Failed to Load Schedule</h3><p>Make sure scheduleData.js is loaded correctly.</p></div>`;
        return;
    }

    let currentMonth = selectedDate.getMonth();
    let currentYear = selectedDate.getFullYear();
    
    function formatStrDate(dateObj) {
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const day = String(dateObj.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    function isToday(dateObj) {
        return formatStrDate(dateObj) === formatStrDate(today);
    }

    function renderCalendar(month, year) {
        calendarGrid.innerHTML = '';
        const firstDay = new Date(year, month, 1).getDay(); // 0 is Sunday
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        
        const monthNamesEn = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        currentMonthYear.textContent = `${monthNamesEn[month]} ${year}`;

        const q = (searchQuery || '').trim().toLowerCase();
        const qActive = q.length > 0;
        const onlineActive = !!onlineOnly;
        const agendas = getAgendas();
        const matchedHitDates = [];
        const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const dayNamesShort = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        
        for (let i = 0; i < firstDay; i++) {
            const emptyDiv = document.createElement('div');
            emptyDiv.className = 'cal-day empty';
            calendarGrid.appendChild(emptyDiv);
        }
        
        for (let i = 1; i <= daysInMonth; i++) {
            const dayDiv = document.createElement('div');
            dayDiv.className = 'cal-day';
            dayDiv.textContent = i;
            
            const cellDate = new Date(year, month, i);
            const strDate = formatStrDate(cellDate);
            
            if (isToday(cellDate)) {
                dayDiv.classList.add('today');
            }
            if (formatStrDate(selectedDate) === strDate) {
                dayDiv.classList.add('selected');
            }

            const { status, classes } = getScheduleForDate(cellDate);
            const dayIsOnline = status === "Online";
            const dayMatchesSearch = qActive
                ? (classes || []).some(c =>
                    String(c.subject || '').toLowerCase().includes(q) ||
                    String(c.lecturer || '').toLowerCase().includes(q)
                )
                : false;

            const onlineOk = !onlineActive || dayIsOnline;
            const searchOk = !qActive || dayMatchesSearch;
            if ((onlineActive || qActive) && onlineOk && searchOk) {
                if (onlineActive && qActive) dayDiv.classList.add('hit-both');
                else if (onlineActive) dayDiv.classList.add('hit-online');
                else dayDiv.classList.add('hit-search');

                matchedHitDates.push({
                    strDate,
                    hitType: onlineActive && qActive ? 'both' : (onlineActive ? 'online' : 'search'),
                    dayText: `${dayNamesShort[cellDate.getDay()]} ${monthNamesShort[cellDate.getMonth()]} ${cellDate.getDate()}`
                });
            }

            if (agendas.some(a => a.date === strDate)) {
                dayDiv.classList.add('has-event');
            }
            
            dayDiv.addEventListener('click', () => {
                selectedDate = new Date(year, month, i);
                renderCalendar(currentMonth, currentYear);
                updateScheduleView();
                renderAgendas();
            });
            calendarGrid.appendChild(dayDiv);
        }

        if (filterHitsPanel && filterHitsPills) {
            if (onlineActive || qActive) {
                filterHitsPanel.classList.remove('hidden');
                filterHitsPills.innerHTML = '';

                if (matchedHitDates.length === 0) {
                    filterHitsPills.innerHTML = `<div class="filter-hits-empty">No matching dates in this month</div>`;
                } else {
                    const seen = new Set();
                    matchedHitDates.forEach((d) => {
                        if (seen.has(d.strDate)) return;
                        seen.add(d.strDate);

                        const btn = document.createElement('button');
                        btn.type = 'button';
                        btn.className = `filter-hits-pill is-${d.hitType}`;
                        btn.setAttribute('data-date', d.strDate);
                        btn.innerHTML = `${d.dayText}<span class="pill-sub">${d.hitType === 'both' ? 'Online + Match' : d.hitType === 'online' ? 'Online' : 'Matched'}</span>`;
                        btn.addEventListener('click', () => {
                            const [yy, mm, dd] = d.strDate.split('-').map((x) => parseInt(x, 10));
                            selectedDate = new Date(yy, mm - 1, dd);
                            currentMonth = selectedDate.getMonth();
                            currentYear = selectedDate.getFullYear();
                            renderCalendar(currentMonth, currentYear);
                            updateScheduleView();
                            renderAgendas();
                        });

                        filterHitsPills.appendChild(btn);
                    });
                }
            } else {
                filterHitsPanel.classList.add('hidden');
            }
        }
    }
    
    function getScheduleForDate(dateObj) {
        const strDate = formatStrDate(dateObj);
        let status = "Offline"; 
        let classes = [];

        const start = new Date(scheduleData.startDate + 'T00:00:00');
        const end = new Date(scheduleData.endDate + 'T00:00:00');
        if (dateObj < start || dateObj > end) {
            return { status: "No Semester", classes: [] };
        }
        
        if (scheduleData.overrides && scheduleData.overrides[strDate]) {
            const override = scheduleData.overrides[strDate];
            status = override.status;
            classes = override.classes || [];
            return { status, classes };
        }
        
        const engDays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayName = engDays[dateObj.getDay()];
        
        if (scheduleData.defaultWeekly && scheduleData.defaultWeekly[dayName]) {
            classes = scheduleData.defaultWeekly[dayName];
        }
        
        return { status, classes };
    }
    
    function updateScheduleView() {
        const strDate = formatStrDate(selectedDate);
        const dayEnNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const dayEn = dayEnNames[selectedDate.getDay()];
        const dateNum = selectedDate.getDate();
        const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        
        selectedDateDisplay.textContent = `${dayEn}, ${monthNames[selectedDate.getMonth()]} ${dateNum}`;
        
        if (isToday(selectedDate)) {
            scheduleTitle.textContent = "Today's Schedule";
            btnToday.classList.add('hidden');
        } else {
            scheduleTitle.textContent = "Lecture Schedule";
            btnToday.classList.remove('hidden');
        }
        
        const { status, classes } = getScheduleForDate(selectedDate);
        
        if (status === "No Semester") {
            statusBanner.className = 'status-banner status-minggu-tenang';
            statusBanner.innerHTML = `<i class="ri-calendar-close-line"></i> Outside semester period. No classes scheduled.`;
            statusBanner.classList.remove('hidden');
        } else if (status === "Libur") {
            statusBanner.className = 'status-banner status-libur';
            statusBanner.innerHTML = `<i class="ri-calendar-event-line"></i> It's a Holiday!`;
            statusBanner.classList.remove('hidden');
        } else if (status === "UTS" || status === "UAS") {
            statusBanner.className = 'status-banner status-ujian';
            const examText = status === "UTS" ? "Midterms" : "Finals";
            statusBanner.innerHTML = `<i class="ri-article-line"></i> Today is ${examText}, Good Luck!`;
            statusBanner.classList.remove('hidden');
        } else if (status === "Minggu Tenang") {
            statusBanner.className = 'status-banner status-minggu-tenang';
            statusBanner.innerHTML = `<i class="ri-cup-line"></i> Study Week. Prepare for your exams!`;
            statusBanner.classList.remove('hidden');
        } else {
            statusBanner.classList.add('hidden');
        }
        
        scheduleList.innerHTML = '';
        
        let mergedItems = [];
        
        classes.forEach(c => mergedItems.push({ ...c, itemType: 'class' }));
        
        const dateAgendas = getAgendas().filter(a => a.date === formatStrDate(selectedDate));
        dateAgendas.forEach(a => mergedItems.push({ ...a, itemType: 'event' }));

        const originalItemsCount = mergedItems.length;
        
        mergedItems.sort((a, b) => {
            const timeA = (a.time) ? a.time.split(' ')[0] : '00:00';
            const timeB = (b.time) ? b.time.split(' ')[0] : '00:00';
            return timeA.localeCompare(timeB);
        });

        const q = (searchQuery || '').trim();
        if (q.length > 0) {
            mergedItems = mergedItems.filter((item) => {
                if (item.itemType !== 'class') return false;
                const subject = String(item.subject || '').toLowerCase();
                const lecturer = String(item.lecturer || '').toLowerCase();
                return subject.includes(q) || lecturer.includes(q);
            });
        }

        if (onlineOnly) {
            mergedItems = mergedItems.filter((item) => {
                if (item.itemType === 'event') return true;
                const isOnline = status === "Online";
                return isOnline;
            });
        }

        if (mergedItems.length === 0) {
            if (originalItemsCount > 0) {
                scheduleList.innerHTML = `
                    <div class="no-schedule">
                        <i class="ri-filter-off-line"></i>
                        <h3>No results</h3>
                        <p>Try clearing your search or disabling "Online only".</p>
                    </div>
                `;
            } else if (status !== 'Libur' && status !== 'Minggu Tenang') {
                scheduleList.innerHTML = `
                    <div class="no-schedule">
                        <i class="ri-coffee-line"></i>
                        <h3>No classes or events today</h3>
                        <p>Free time! Time to rest or do assignments.</p>
                    </div>
                `;
            }
        } else {
            mergedItems.forEach((item, idx) => {
                const randColorStr = colors[idx % colors.length];
                const card = document.createElement('div');
                card.className = `class-card ${randColorStr}`;
                
                if (item.itemType === 'class') {
                    const isOnline = status === "Online";
                    const statClass = isOnline ? 'status-online' : 'status-offline';
                    const statText = isOnline ? 'Online Class' : 'Offline Class';
                    const icon = isOnline ? 'ri-macbook-line' : 'ri-book-2-line';
                    
                    card.innerHTML = `
                        <div class="class-info">
                            <div class="class-icon"><i class="${icon}"></i></div>
                            <div class="class-body">
                                <span class="class-subject">${item.subject}</span>
                                <div class="class-time"><span class="time">${item.time}</span></div>
                                <div class="class-lecturer"><i class="ri-user-smile-line"></i><span>${item.lecturer}</span></div>
                                <div class="class-room"><i class="ri-map-pin-line"></i>${item.room}</div>
                                <span class="class-status ${statClass}">${statText}</span>
                            </div>
                        </div>
                    `;
                } else if (item.itemType === 'event') {
                    const timeText = item.time ? item.time : "All Day";
                    card.innerHTML = `
                        <div class="class-info">
                            <div class="class-icon"><i class="ri-calendar-todo-line"></i></div>
                            <div class="class-body">
                                <span class="class-subject">${item.title}</span>
                                <div class="class-time"><span class="time">${timeText}</span></div>
                                <div class="class-lecturer"><i class="ri-pushpin-2-line"></i><span>Custom Event</span></div>
                                <div class="class-room"></div>
                                <span class="class-status status-event">Event</span>
                            </div>
                        </div>
                        <button class="delete-event-btn" data-id="${item.id}" title="Delete event"><i class="ri-close-line"></i></button>
                    `;
                    
                    card.querySelector('.delete-event-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        const id = parseInt(e.currentTarget.getAttribute('data-id'));
                        const filtered = getAgendas().filter(a => a.id !== id);
                        saveAgendas(filtered);
                        updateScheduleView();
                    });
                }
                
                scheduleList.appendChild(card);
            });
        }
    }
    
    function getAgendas() {
        return JSON.parse(localStorage.getItem('jadwal_agenda') || '[]');
    }
    
    function saveAgendas(agendas) {
        localStorage.setItem('jadwal_agenda', JSON.stringify(agendas));
        renderAgendas();
        renderCalendar(currentMonth, currentYear);
    }
    
    function renderAgendas() {
        const rawAgendas = getAgendas();
        const selectedDateStr = formatStrDate(selectedDate);
        
        const agendas = rawAgendas.filter(a => !a.date || a.date === selectedDateStr);
        
        pinnedList.innerHTML = '';
        
        if(agendas.length === 0) {
            pinnedList.innerHTML = '<p style="font-size:0.8rem; color:var(--text-muted); text-align:center; margin:15px auto;">No agenda yet</p>';
            return;
        }
        
        agendas.sort((a,b) => {
            const isASelected = a.date === formatStrDate(selectedDate);
            const isBSelected = b.date === formatStrDate(selectedDate);
            if(isASelected && !isBSelected) return -1;
            if(!isASelected && isBSelected) return 1;
            return b.id - a.id;
        });

        agendas.forEach((agenda, index) => {
            let dateText = "Permanent Pin";
            if (agenda.date) {
                const d = new Date(agenda.date);
                dateText = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()}`;
            }
            
            const isSelectedDate = agenda.date === formatStrDate(selectedDate);
            
            const card = document.createElement('div');
            card.className = 'agenda-card';
            card.innerHTML = `
                <div class="agenda-icon" style="${isSelectedDate ? 'color:var(--text-on-accent); background:var(--accent-peach);' : ''}"><i class="ri-pushpin-2-fill"></i></div>
                <div class="agenda-content" style="flex-grow:1;">
                    <h4>${agenda.title}</h4>
                    <p>${dateText}</p>
                    ${isSelectedDate ? '<span class="badge">Today\'s Date</span>' : ''}
                </div>
                <button class="delete-btn" data-id="${agenda.id}" style="background:none; border:none; color:var(--text-muted); cursor:pointer;" title="Delete"><i class="ri-delete-bin-line"></i></button>
            `;
            
            card.querySelector('.delete-btn').addEventListener('click', (e) => {
                const id = parseInt(e.currentTarget.getAttribute('data-id'));
                const filtered = getAgendas().filter(a => a.id !== id);
                saveAgendas(filtered);
            });
            
            pinnedList.appendChild(card);
        });
    }

    function openModal() {
        agendaModal.classList.remove('hidden');
        document.getElementById('agenda-date').value = formatStrDate(selectedDate);
    }
    
    function closeModalFunc() {
        agendaModal.classList.add('hidden');
        agendaForm.reset();
    }

    addAgendaBtn.addEventListener('click', openModal);
    
    const addEventBtn = document.getElementById('add-event-btn');
    if (addEventBtn) {
        addEventBtn.addEventListener('click', openModal);
    }

    closeModal.addEventListener('click', closeModalFunc);
    
    agendaForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('agenda-title').value;
        const date = document.getElementById('agenda-date').value;
        const time = document.getElementById('agenda-time').value;
        
        const agendas = getAgendas();
        agendas.push({ title, date, time, id: Date.now() });
        saveAgendas(agendas);
        closeModalFunc();
        updateScheduleView();
    });

    prevMonthBtn.addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    nextMonthBtn.addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        renderCalendar(currentMonth, currentYear);
    });
    
    prevDayBtn.addEventListener('click', () => {
        selectedDate.setDate(selectedDate.getDate() - 1);
        currentMonth = selectedDate.getMonth();
        currentYear = selectedDate.getFullYear();
        renderCalendar(currentMonth, currentYear);
        updateScheduleView();
        renderAgendas();
    });
    
    nextDayBtn.addEventListener('click', () => {
        selectedDate.setDate(selectedDate.getDate() + 1);
        currentMonth = selectedDate.getMonth();
        currentYear = selectedDate.getFullYear();
        renderCalendar(currentMonth, currentYear);
        updateScheduleView();
        renderAgendas();
    });
    
    btnToday.addEventListener('click', () => {
        selectedDate = new Date(today);
        currentMonth = selectedDate.getMonth();
        currentYear = selectedDate.getFullYear();
        renderCalendar(currentMonth, currentYear);
        updateScheduleView();
        renderAgendas();
    });

    setInterval(() => {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        document.getElementById('current-time').textContent = `${hours}:${minutes}:${seconds}`;
    }, 1000);

    renderCalendar(currentMonth, currentYear);
    syncScheduleControls();
    updateScheduleView();
    renderAgendas();
});
