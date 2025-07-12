
    // Tanggal hari ini
    const today = new Date();
    const todayStr = today.toISOString().split('T')[0];
    
    // Format tanggal Indonesia
    function formatIndonesianDate(dateStr) {
      const date = new Date(dateStr);
      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      return date.toLocaleDateString('id-ID', options);
    }
    
    // Hitung selisih hari
    function daysUntil(dateStr) {
      const eventDate = new Date(dateStr);
      const diffTime = eventDate - today;
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    }
    
    // Render events
    function renderEvents(events) {
      const eventGrid = document.getElementById('eventGrid');
      eventGrid.innerHTML = '';
      
      events.forEach(event => {
        const daysLeft = daysUntil(event.date);
        const isToday = todayStr === event.date;
        const isPast = daysLeft < 0;
        
        const eventCard = document.createElement('div');
        eventCard.className = `event-card bg-gradient-to-br ${event.gradient} text-white p-6 rounded-xl relative overflow-hidden h-full flex flex-col`;
        eventCard.dataset.id = event.id;
        
        eventCard.innerHTML = `
          <div class="absolute top-4 right-4 text-white text-3xl">${event.emoji}</div>
          <div class="flex-grow">
            <h2 class="text-xl font-bold">${event.title}</h2>
            <p class="text-sm opacity-90 mt-2">${formatIndonesianDate(event.date)}</p>
            <div class="mt-4">
              <p class="text-sm">${event.description.substring(0, 100)}...</p>
            </div>
          </div>
          <div class="mt-6">
            ${isToday ? 
              `<span class="countdown-badge inline-block px-3 py-1 bg-white text-purple-600 text-xs font-bold rounded-full shadow">Hari Ini!</span>` : 
              isPast ? 
              `<span class="inline-block px-3 py-1 bg-black/20 text-white text-xs font-medium rounded-full">Sudah Berlalu</span>` :
              `<span class="inline-block px-3 py-1 bg-white/30 text-white text-xs font-medium rounded-full">${daysLeft} Hari Lagi</span>`
            }
            <span class="inline-block ml-2 px-3 py-1 bg-black/20 text-white text-xs font-medium rounded-full">${event.category}</span>
          </div>
        `;
        
        eventGrid.appendChild(eventCard);
      });
      
      // Add click event to cards
      document.querySelectorAll('.event-card').forEach(card => {
        card.addEventListener('click', () => {
          const id = card.dataset.id;
          const event = eventsData.find(e => e.id == id);
          showEventDetail(event);
        });
      });
    }
    
    // Show event detail overlay
    function showEventDetail(event) {
      const overlay = document.getElementById('detailOverlay');
      const daysLeft = daysUntil(event.date);
      const isToday = todayStr === event.date;
      const isPast = daysLeft < 0;
      
      // Update detail card content
      document.getElementById('detailTitle').textContent = event.title;
      document.getElementById('detailDate').textContent = formatIndonesianDate(event.date);
      document.getElementById('detailCategory').textContent = event.category;
      document.getElementById('detailDescription').textContent = event.description;
      document.getElementById('detailFact').textContent = event.fact;
      document.getElementById('detailHistory').textContent = event.history;
      document.getElementById('detailActivities').textContent = event.activities;
      document.getElementById('detailEmoji').textContent = event.emoji;
      
      // Update countdown badge
      if (isToday) {
        document.getElementById('detailCountdown').textContent = "Hari Ini!";
        document.getElementById('progressFill').style.width = "100%";
        document.getElementById('progressText').textContent = "Hari penting sedang berlangsung";
      } else if (isPast) {
        document.getElementById('detailCountdown').textContent = "Sudah Berlalu";
        document.getElementById('progressFill').style.width = "100%";
        document.getElementById('progressText').textContent = "Hari penting telah berlalu";
      } else {
        document.getElementById('detailCountdown').textContent = `${daysLeft} Hari Lagi`;
        
        // Calculate progress (max 30 days)
        const progress = Math.min(100, Math.floor((1 - daysLeft/30) * 100));
        document.getElementById('progressFill').style.width = `${progress}%`;
        document.getElementById('progressText').textContent = `Menuju ${event.title}: ${daysLeft} hari lagi`;
      }
      
      // Show overlay
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    
    // Set today event in banner
    function setTodayEvent() {
      const todayEvent = eventsData.find(event => event.date === todayStr);
      
      if (todayEvent) {
        document.getElementById('todayTitle').textContent = todayEvent.title;
        document.getElementById('todayDate').textContent = formatIndonesianDate(todayEvent.date);
        document.getElementById('todayDescription').textContent = todayEvent.description;
        document.getElementById('todayEmoji').textContent = todayEvent.emoji;
      } else {
        document.getElementById('todayTitle').textContent = "Tidak Ada Hari Penting Saat Ini";
        document.getElementById('todayDate').textContent = formatIndonesianDate(todayStr);
        document.getElementById('todayDescription').textContent = "Tidak ada hari penting nasional atau keagamaan yang dirayakan Saat ini.";
        document.getElementById('todayEmoji').textContent = "📅";
      }
    }
    
    // Filter events
    function filterEvents(category) {
      if (category === 'all') {
        renderEvents(eventsData);
      } else {
        const filteredEvents = eventsData.filter(event => event.category === category);
        renderEvents(filteredEvents);
      }
    }
    
    // Initialize
    document.addEventListener('DOMContentLoaded', () => {
      // Set today event in banner
      setTodayEvent();
      
      // Render all events
      renderEvents(eventsData);
      
      // Filter buttons
      document.querySelectorAll('.category-btn').forEach(button => {
        button.addEventListener('click', () => {
          // Remove active class from all buttons
          document.querySelectorAll('.category-btn').forEach(btn => {
            btn.classList.remove('active');
          });
          
          // Add active class to clicked button
          button.classList.add('active');
          
          // Filter events
          filterEvents(button.dataset.filter);
        });
      });
      
      // Today detail button
      document.getElementById('todayDetailBtn').addEventListener('click', () => {
        const todayEvent = eventsData.find(event => event.date === todayStr);
        if (todayEvent) {
          showEventDetail(todayEvent);
        }
      });
      
      // Close overlay button
      document.getElementById('closeOverlay').addEventListener('click', () => {
        const overlay = document.getElementById('detailOverlay');
        overlay.classList.remove('active');
        document.body.style.overflow = 'auto';
      });
    });
