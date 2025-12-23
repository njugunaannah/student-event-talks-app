document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule');
    const searchInput = document.getElementById('searchInput');

    let talksData = window.talksData || [];

    const generateSchedule = (filter = '') => {
        scheduleContainer.innerHTML = '';
        let currentTime = new Date('2025-12-23T10:00:00');
        let talkCount = 0;

        const formatTime = (date) => {
            return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        };

        const filteredTalks = talksData.filter(talk => 
            filter ? talk.categories.some(cat => cat.toLowerCase().includes(filter.toLowerCase())) : true
        );

        filteredTalks.forEach((talk, index) => {
            if (talkCount === 3) {
                const lunchBreakElement = document.createElement('div');
                lunchBreakElement.className = 'break';
                const lunchStartTime = new Date(currentTime);
                const lunchEndTime = new Date(currentTime.getTime() + 60 * 60 * 1000);
                lunchBreakElement.innerHTML = `
                    <div class="talk-time">${formatTime(lunchStartTime)} - ${formatTime(lunchEndTime)}</div>
                    <div>Lunch Break</div>
                `;
                scheduleContainer.appendChild(lunchBreakElement);
                currentTime.setTime(lunchEndTime.getTime() + 10 * 60 * 1000); // 10 min break after lunch
            }
            
            const talkElement = document.createElement('div');
            talkElement.className = 'talk';

            const startTime = new Date(currentTime);
            const endTime = new Date(currentTime.getTime() + talk.duration * 60 * 1000);

            talkElement.innerHTML = `
                <div class="talk-time">${formatTime(startTime)} - ${formatTime(endTime)}</div>
                <h2 class="talk-title">${talk.title}</h2>
                <div class="talk-speakers">${talk.speakers.join(', ')}</div>
                <p>${talk.description}</p>
                <div class="talk-categories">
                    ${talk.categories.map(cat => `<span>${cat}</span>`).join('')}
                </div>
            `;
            scheduleContainer.appendChild(talkElement);

            currentTime.setTime(endTime.getTime() + 10 * 60 * 1000); // 10 min break
            talkCount++;
        });
    };

    searchInput.addEventListener('input', (e) => {
        generateSchedule(e.target.value);
    });

    generateSchedule();
});
