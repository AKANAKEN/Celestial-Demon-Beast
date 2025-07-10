<!DOCTYPE html>
<html>
  
  <head>
    <title>W3.CSS Template</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Raleway">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
    <style>


/* //btn drop */
.dropbtn {
  background-color: #04AA6D;
  color: white;
  padding: 16px;
  font-size: 16px;
  border: none;
}

.dropdown {
  position: relative;
  display: inline-block;
  display: button;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 500px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
}

.dropdown-content a {
  color: black;
  padding: 12px 26px;
  text-decoration: none;
  display: block;
}

.dropdown-content a:hover {background-color: #ddd;}

.dropdown:hover .dropdown-content {display: block;}

.dropdown:hover .dropbtn {background-color: #3e8e41;}


      /*==Page==*/
      body,h1,h2,h3,h4,h5,h6 {font-family: "Raleway", sans-serif}


    body, html {
      height: 100%;
      line-height: 1.8;
      background-color: w3-dark-grey;
    }

    /* Full height image header */
    .bgimg-1 {
      background-position: center;
      background-size: cover;
      background-image: url("https://media.discordapp.net/attachments/1006887357519253554/1320766249864790097/Futaki_Empire_Thumbnail.jpg?ex=676acaec&is=6769796c&hm=6fdedd194c1f7ff3c7fa35dc142eefe6e1987516c92a8735b0f9a820a336dace&=&format=webp&width=1193&height=671");
      min-height: 100%;
      min-width: auto;
      
    }

    .w3-bar .w3-button {
      padding: 16px;
    }

    .text1{
      color: #0a407d;
      opacity: 150%;
      }
    </style>
  </head>
<body>

  <script>
 function myFunction1() {
  alert("AkanaKen : Repair Web [coming soon]");
}
</script> 

<!-- Navbar (sit on top) -->
<div class="w3-top">
    <div class="w3-bar w3-black w3-card" id="myNavbar">
      <a href="index.html" class="w3-bar-item w3-button w3-wide">Pemberi Tau Empire</a>
      <!-- Right-sided navbar links -->
      <div class="w3-right w3-hide-small">
        <a href="index.html" class="w3-bar-item w3-button"> Pemberitahuan </a>
        <a href="staff.html" class="w3-bar-item w3-button"><i class="fa fa-user"></i> TEAM </a>
        <!-- <a href="member.html" class="w3-bar-item w3-button"><i class="fa fa-th"></i> MEMBER </a> -->
        <a href="staff.html" class="w3-bar-item w3-button"><i class="fa fa-user"></i> TEAM </a>
        <a href="downloader/src/index.html" class="w3-bar-item w3-button"><i class="fa fa-th"></i> DOWNLOADER </a>
        <a href="donation.html" class="w3-bar-item w3-button"><i class="fa fa-usd"></i> DONATION </a>
        <!-- <button onclick="myFunction1()" href="aktivity.php" class="w3-bar-item w3-button"><i class="fa fa-desktop"></i> Aktivity </button> -->
        <button href="aktivity.html" class="w3-bar-item w3-button"><i class="fa fa-desktop"></i> Aktivity </button>
        <a href="contact.html" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i> Link </a>
      </div>
      <!-- Hide right-floated links on small screens and replace them with a menu icon -->
  
      <a href="javascript:void(0)" class="w3-bar-item w3-button w3-right w3-hide-large w3-hide-medium" onclick="w3_open()">
        <i class="fa fa-bars"></i>
      </a>
    </div>
  </div>
  
  <!-- Sidebar on small screens when clicking the menu icon -->
  <nav class="w3-sidebar w3-bar-block w3-black w3-card w3-animate-left w3-hide-medium w3-hide-large" style="display:none" id="mySidebar">
        <a href="index.html" class="w3-bar-item w3-button"> Pemberitahuan </a>
        <a href="staff.html" class="w3-bar-item w3-button"><i class="fa fa-user"></i> TEAM </a>
        <a href="downloader/src/index.php" class="w3-bar-item w3-button"><i class="fa fa-th"></i> DOWNLOADER </a>
        <a href="donation.html" class="w3-bar-item w3-button"><i class="fa fa-usd"></i> DONATION </a>
        <button onclick="myFunction1()" href="aktivity.php" class="w3-bar-item w3-button"><i class="fa fa-desktop"></i> Aktivity </button>
        <a href="contact.html" class="w3-bar-item w3-button"><i class="fa fa-envelope"></i> Link </a>
  </nav>