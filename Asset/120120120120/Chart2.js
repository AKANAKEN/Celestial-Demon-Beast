
        async function fetchData() {
            const url = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQP009kLKFGCFqr8rPOTwKqfmualqylhZmgD8x2uvPjzCuuhcFYTXmc6oiK1KBWZ9Sw3TrLsD0B_Jgq/pub?output=csv";
            const response = await fetch(url);
            const data = await response.text();
            return parseCSV(data);
        }

        function parseCSV(data) {
            const rows = data.split("\n").slice(1);
            let ratings = { "Star 1": 0, "Star 2": 0, "Star 3": 0, "Star 4": 0, "Star 5": 0 };
            let totalStars = 0;
            let totalCount = 0;
            
            rows.forEach(row => {
                const columns = row.split(",");
                const rating = columns[1]?.trim();
                if (ratings.hasOwnProperty(rating)) {
                    ratings[rating]++;
                    totalStars += parseInt(rating.split(" ")[1]);
                    totalCount++;
                }
            });
            
            const avgRating = totalCount ? (totalStars / totalCount).toFixed(2) : "N/A";
            document.getElementById("average-rating").innerText = ` ${avgRating}`;
            document.getElementById("count-rating").innerText = ` ${totalCount}`;  //untuk rata rata rating
            drawChart(ratings);
        }

        function drawChart(ratings) {
            const ctx = document.getElementById("ratingChart").getContext("2d");
            new Chart(ctx, {
                type: "doughnut",
                data: {
                    labels: Object.keys(ratings),
                    datasets: [{
                        data: Object.values(ratings),
                        backgroundColor: ['#ff4d4d', '#ff944d', '#ffd24d', '#b3ff4d', '#4dff4d'],
                    }]
                },
                // options: {
                //     responsive: true,
                //     plugins: {
                //         legend: { position: "bottom" }
                //     }
                // }
                options: {
                    responsive: true,
                    maintainAspectRatio: false, // Pastikan chart fleksibel terhadap container
                    plugins: {
                      legend: {
                        position: 'bottom'
                      }
                    }
                  }
            });
        }

        fetchData();
  