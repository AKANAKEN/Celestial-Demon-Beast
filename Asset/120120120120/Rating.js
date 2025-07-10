async function fetchData() {
    const sheetURL =
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vSNDGU3rWhw9Is_J8lSaI826RT_BTfB7DLfNNvfupyuAP5r9AdhH4PjRq-ZSq3jX5u_k2-eKCdQmsb3/pub?output=csv";
  
    try {
      const response = await fetch(sheetURL);
      const data = await response.text();
      const rows = data.split("\n").map((row) => row.split(","));
  
      generateChart(rows);
      displayData(rows);
      calculateAverageRating(rows); // 🔹 Tambahkan hitungan rata-rata rating
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  function generateChart(rows) {
    let ratingCounts = { "Star 1": 0, "Star 2": 0, "Star 3": 0, "Star 4": 0, "Star 5": 0 };
    let totalReviews = 0;
  
    for (let i = 1; i < rows.length; i++) {
      let rating = rows[i][2].trim(); // Kolom Rating
  
      if (rating in ratingCounts) {
        ratingCounts[rating]++;
        totalReviews++;
      }
    }
  
    let ratingPercentages = Object.values(ratingCounts).map(count => totalReviews ? (count / totalReviews) * 100 : 0);
  
    let ctx = document.getElementById('ratingChart').getContext('2d');
    new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ["Star 1", "Star 2", "Star 3", "Star 4", "Star 5"],
        datasets: [{
          label: 'Persentase Rating (%)',
          data: ratingPercentages,
          backgroundColor: ['#ff4d4d', '#ff944d', '#ffd24d', '#b3ff4d', '#4dff4d'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    });
  }
  
  function displayData(rows) {
    let container = document.getElementById("reviewContainer");
    container.innerHTML = "";
  
    for (let i = 1; i < rows.length; i++) {
      let [timestamp, username, rating, review] = rows[i];
  
      // Jika data tidak valid, skip
      if (!username || !rating || !review) continue;
  
      let stars = "⭐".repeat(parseInt(rating.replace("Star ", "")));
  
      let cardHTML = `
        <div class="w3-padding w3-margin-bottom w3-card w3-round">
          <h4>${username}</h4>
          <p class="rating">${stars}</p>
          <p>"${review}"</p>
        </div>
      `;
  
      container.innerHTML += cardHTML;
    }
  }
  
  function calculateAverageRating(rows) {
    let ratings = [];
    
    for (let i = 1; i < rows.length; i++) {
      let ratingText = rows[i][2]?.trim();
      if (!ratingText) continue;
  
      let ratingNumber = parseInt(ratingText.replace("Star ", ""));
      if (!isNaN(ratingNumber)) {
        ratings.push(ratingNumber);
      }
    }
  
    if (ratings.length === 0) {
      console.error("Tidak ada rating valid!");
      return;
    }
  
    let totalReviews = ratings.length;
    let averageRating = (ratings.reduce((a, b) => a + b, 0) / totalReviews).toFixed(1);
  
    // Update ke dalam HTML
    document.getElementById("averageRating").textContent = averageRating;
    document.getElementById("totalReviews").textContent = totalReviews;
  }
  
  fetchData();
  