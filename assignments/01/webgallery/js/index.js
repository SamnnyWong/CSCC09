(function () {
    "use strict";

    console.log("this is index.js");

    /**
     * Created by sam on 2018-01-25.
     */

    window.addEventListener('load', function () {
        var images = api.getAllImagesObj(); // return a list of imgae id
        var comments = api.getAllCommentsObj();
        if (images == null) {
            for (var imageId in images) {
                //do load all old images and its comments
            }
        }


        document.getElementById("btn_preview").addEventListener('click', function () {
            var url = document.getElementById("postimage_imgurl").value;
            var title = document.getElementById("postimage_title").value;
            var author = document.getElementById("postimage_author").value;
            document.getElementById("preview_image").src=url;
            document.getElementById("preview_title").innerHTML = title;
            document.getElementById("preview_author").innerHTML = author;
        });


        document.getElementById("btn_upload_image").addEventListener('click', function () {
            var title = document.getElementById("postimage_title").value;
            var author = document.getElementById("postimage_author").value;
            var imageURL = document.getElementById("postimage_imgurl").value;
            addImage(title, author, imageURL);
        });

        document.getElementById("prev_button").addEventListener('click', function () {
            var url1= "https://i.ytimg.com/vi/uRXmA10PYM0/maxresdefault.jpg";
            document.getElementById("imageContainer").src=url1;
        });



        document.getElementById("next_button").addEventListener('click', function () {
            var url2 = "https://i.ytimg.com/vi/Io1p9GupFh4/hqdefault.jpg";
            document.getElementById("imageContainer").src=url2;
        });


    });


    function addImage(title, author, imageURL){
        var temp = api.addImage(title, author, imageURL);
        console.log(temp.imageURL);
        document.getElementById("imageContainer").src = temp[imageURL]; //?async problem
        document.getElementById("image_title").innerHTML = temp[title];
        document.getElementById("image_author").innerHTML = temp[author];
    }







// Get the modal
    var modal = document.getElementById('myModal');

// Get the button that opens the modal
    var btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    };

// When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
        document.getElementById("postimage_title").value = "";
        document.getElementById("postimage_author").value = "";
        document.getElementById("postimage_imgurl").value = "";
        document.getElementById("preview_image").src="";
        document.getElementById("preview_title").innerHTML = "";
        document.getElementById("preview_author").innerHTML = "";
    };

// When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            document.getElementById("postimage_title").value = "";
            document.getElementById("postimage_author").value = "";
            document.getElementById("postimage_imgurl").value = "";
            document.getElementById("preview_image").src="";
            document.getElementById("preview_title").innerHTML = "";
            document.getElementById("preview_author").innerHTML = "";

        }
    }

}());