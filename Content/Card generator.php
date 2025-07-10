<!DOCTYPE html> <html lang="id"> <head> <meta charset="UTF-8"> 
    <meta name="viewport" content="width=device-width, initial-scale=1.0"> 
    <title>Generator Kartu Nama Digital</title> 
    <style> 
        body { font-family: Arial, sans-serif; background-color: #f0f0f0; 
            display: flex; flex-direction: column; align-items: center; 
            justify-content: center; height: 100vh; margin: 0; 
        } .generator { 
        background-color: #fff; padding: 20px; border-radius: 10px; 
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); margin-bottom: 20px; 
        } .generator input, .generator button { display: block; width: 100%; 
        margin: 10px 0; padding: 10px; font-size: 1em; 
        } .card { 
            width: 350px; height: 250px; background-color: #333; 
            color: #fff; padding: 20px; border-radius: 10px; 
            position: relative; display: none; flex-direction: column; 
            align-items: center; justify-content: center; 
            } .card .photo { 
                width: 100px; height: 100px; border-radius: 50%; 
                overflow: hidden; margin-bottom: 10px; 
                } .card .photo img { 
                    width: 100%; height: auto; } .card .name { 
                        font-size: 1.5em; font-weight: bold; } .card .title { 
                            font-size: 1em; color: #d4af37; } .card .contact {
                                 margin-top: 10px; } .card .contact div { margin: 5px 0; } .card .contact a { 
                                    color: #d4af37; text-decoration: none; } .card .contact a:hover { 
                                        text-decoration: underline; } .download-btn { margin-top: 20px; 
                                        background-color: #d4af37; color: #333; padding: 10px 15px; 
                                        border: none; border-radius: 5px; cursor: pointer; } 
    </style> 
    </head> 
    
<body> <div class="generator">
    <input type="text" id="name" placeholder="Nama"> 
    <input type="text" id="title" placeholder="Jabatan"> 
    <input type="text" id="phone" placeholder="Nomor Telepon"> 
    <input type="text" id="website" placeholder="Website"> 
    <input type="text" id="address" placeholder="Alamat"> 
    <input type="file" id="photo" accept="image/*"> 
    <button class="generate-btn" onclick="generateCard()">Generate Kartu Nama</button> 
</div> 

<div class="card" id="card"> 
    <div class="photo" id="card-photo"></div> 
    <div class="name" id="card-name"></div> 
    <div class="title" id="card-title"></div> 
    <div class="contact"> <div class="phone" id="card-phone"></div> 
    <div class="website"><a id="card-website" target="_blank"></a></div> 
    <div class="address" id="card-address"></div> </div> <button class="download-btn" onclick="downloadCard()">Download as PDF</button> </div>


<script src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.3.2/html2canvas.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.4.0/jspdf.umd.min.js"></script>
<script>
    function generateCard() {
        const name = document.getElementById('name').value;
        const title = document.getElementById('title').value;
        const phone = document.getElementById('phone').value;
        const website = document.getElementById('website').value;
        const address = document.getElementById('address').value;
        const photo = document.getElementById('photo').files[0];

        document.getElementById('card-name').innerText = name;
        document.getElementById('card-title').innerText = title;
        document.getElementById('card-phone').innerText = phone;
        document.getElementById('card-website').innerText = website;
        document.getElementById('card-website').href = website;
        document.getElementById('card-address').innerText = address;

        if (photo) {
            const reader = new FileReader();
            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                document.getElementById('card-photo').innerHTML = '';
                document.getElementById('card-photo').appendChild(img);
            }
            reader.readAsDataURL(photo);
        }

        document.getElementById('card').style.display = 'flex';
    }

    function downloadCard() {
        html2canvas(document.getElementById('card')).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [350, 250]
            });

            doc.addImage(imgData, 'PNG', 0, 0);
            doc.save('kartu-nama.pdf');
        });
    }
</script>