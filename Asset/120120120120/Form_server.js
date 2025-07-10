function submitReview() {
    var username = document.getElementById("username").value;
    var review = document.getElementById("review").value;
    var email = document.getElementById("email").value;
  
    // Ambil nilai rating yang dipilih
    var rating = document.querySelector('input[name="rating"]:checked');
    if (!rating) {
      Swal.fire({
        icon: 'warning',
        title: 'Oops...',
        text: 'Harap pilih rating!',
        confirmButtonColor: '#4a69bd'
      });
      return;
    }
  
    var data = {
      username: username,
      rating: rating.value,
      review: review,
      email: email
    };
  
    var scriptURL = "https://script.google.com/macros/s/AKfycbz-GYGTYq1D-8XQDldHwg_2fZyKDW6FCQjbxvIDsaAaZ3CGmj4J4tEi7lRrvBxNp_IVlA/exec";
  
    fetch(scriptURL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      mode: 'no-cors'
    })
    .then(() => {
      Swal.fire({
        icon: 'success',
        title: 'Berhasil!',
        text: 'Review berhasil dikirim!',
        confirmButtonColor: '#4a69bd'
      }).then(() => {
        document.getElementById("reviewForm").reset();
        window.history.back();
      });
    })
    .catch(error => {
      Swal.fire({
        icon: 'error',
        title: 'Terjadi Kesalahan!',
        text: 'Error: ' + error.message,
        confirmButtonColor: '#4a69bd'
      });
    });
  }