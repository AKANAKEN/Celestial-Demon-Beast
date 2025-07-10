const url = 'https://api.sheety.co/4f50258db672da74f73e09f356a9384f/introduction (jawaban)/staff';
fetch(url)
  .then(response => response.json())
  .then(data => {
    const staffList = data.staff;
    const gridContainer = document.getElementById('grid-container');
    const modal = document.getElementById('detail-modal');
    const modalBody = document.getElementById('modal-body');
    const closeModal = document.getElementById('close-modal');

    // Close modal
    closeModal.onclick = () => {
      modal.style.display = 'none';
    };

    // Close modal when clicking outside
    window.onclick = event => {
      if (event.target === modal) {
        modal.style.display = 'none';
      }
    };

    staffList.forEach(staff => {
      const card = document.createElement('div');
      card.className = 'card';

      card.innerHTML = `
        <div class="card-header">${staff.nickame || staff.username}</div>
        <div class="card-body">
          <p><strong>Position:</strong> ${staff.position}</p>
          <p><strong>Status:</strong> ${staff.status}</p>
          <button class="detail-btn" data-id="${staff.id}">View Details</button>
        </div>
      `;

      gridContainer.appendChild(card);

      // Add event listener to the detail button
      card.querySelector('.detail-btn').onclick = () => {
        const imageUrl = staff.img 
          ? staff.img.replace("file/d/", "uc?export=view&id=").replace("/view?usp=sharing", "")
          : 'https://via.placeholder.com/150';
      
        modalBody.innerHTML = `
          <img src="${imageUrl}" alt="${staff.nickame || staff.username}" class="staff-img">
          <p><strong>Timestamp:</strong> ${staff.timestamp}</p>
          <p><strong>Username:</strong> ${staff.username}</p>
          <p><strong>Nickname:</strong> ${staff.nickame}</p>
          <p><strong>Position:</strong> ${staff.position}</p>
          <p><strong>Skill:</strong> ${staff.skill}</p>
          <p><strong>Country:</strong> ${staff.country}</p>
          <p><strong>Status:</strong> ${staff.status}</p>
        `;
        modal.style.display = 'block';
      };
      
    });
  })
  .catch(error => {
    console.error('Error fetching data:', error);
  });
