function openReviewModal() {
  fetch('Viwe_Rating.html')
    .then(response => response.text())
    .then(data => {
      document.getElementById('reviewContainer').innerHTML = data;
      document.getElementById('reviewModal').style.display = 'block';
    })
    .catch(error => console.error('Error loading reviews:', error));
}