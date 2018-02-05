(function () {
    "use strict";

    /**
     * Created by sam on 2018-01-25.
     */

    window.addEventListener('load', function () {
        var images = api.getAllImagesObj(); // return a list of images
        var currentId = api.getCurrentID();
        var imageObj = images[currentId];
        var image_comments = api.get_image_comments(currentId);
        for (var cid in image_comments) {
            var commentObj = image_comments[cid];
            postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid)
        }

        //out of bound issue

        // var comments = api.getAllCommentsObj();
        if (Object.keys(images).length != 0) {
            set_ui(imageObj);
            //reload the dammn thing here
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

            var imageObj = api.addImage(title, author, imageURL);
            if (Object.keys(api.getAllImagesObj()).length == 1){
                api.setCurrentID(imageObj.id);
                set_ui(imageObj);
            }
            modal.style.display = "none";
            reset_from();
        });

        document.getElementById("prev_button").addEventListener('click', function () {


            var currentId = api.getCurrentID();
            var imageObj = api.getPrevImageObj(currentId);
            if (!imageObj){
                alert("this is the 1st image")
            }
            else{
                var image_comment = api.get_image_comments(imageObj.id);
                api.setCurrentID(imageObj.id);
                set_ui(imageObj);
                reset_comment();
                for (var cid in image_comment) {
                    var commentObj = image_comment[cid];
                    postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid)
                }

            }
        });

        document.getElementById("next_button").addEventListener('click', function () {
            var currentId = api.getCurrentID();
            var imageObj = api.getNextImageObj(currentId);
            if (!imageObj){
                alert("this is the last image")
            }
            else{
                var image_comment = api.get_image_comments(imageObj.id);
                api.setCurrentID(imageObj.id);
                set_ui(imageObj);
                reset_comment();
                for (var cid in image_comment) {
                    var commentObj = image_comment[cid];
                    postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid)
                }

            }
        });


        //+ post image and + post comment, seperate from onClickListner

        document.getElementById("btn_submit_comment").addEventListener('click', function () {
            var comment_author = document.getElementById("comment_author").innerHTML;
            var comment_content = document.getElementById("comment_content").innerHTML;
            var currentId = api.getCurrentID();
            if (currentId == ""){
                alert("Please add image before posting your comment.");
            }
            else{
                var commentObj = api.addComment(currentId, comment_author, comment_content);
                postComments(commentObj.author, commentObj.content, commentObj.createDate, commentObj.cid);
            }
            reset_submit_comment();
        });




    });


    function postComments(commentAuthor, commentContent, commentCreateDate, comment_id){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML =
            `<div class = "container">
                    <div class="comment_container">
                        <div class="comment">
                            <div class="comment_item author">${commentAuthor}</div>
                            <div class="comment_item content">${commentContent}</div>
                            <div class="comment_item date">${commentCreateDate}</div>
                        </div>
                    </div>
                </div>`;
        document.getElementById("comments").prepend(elmt);



    };


// Get the modal modal control
    var modal = document.getElementById('myModal');
    var btn = document.getElementById("myBtn");
    var span = document.getElementsByClassName("close")[0];

    btn.onclick = function() {
        modal.style.display = "block";
    };

    span.onclick = function() {
        modal.style.display = "none";
        reset_from();
    };

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
            reset_from();
        }
    }


    function set_ui(imageObj){
        document.getElementById("imageContainer").src = imageObj.imageURL;
        document.getElementById("image_title").innerHTML = imageObj.title;
        document.getElementById("image_author").innerHTML = imageObj.author;
    }



    function reset_from(){
        document.getElementById("postimage_title").value = "";
        document.getElementById("postimage_author").value = "";
        document.getElementById("postimage_imgurl").value = "";
        document.getElementById("preview_image").src="";
        document.getElementById("preview_title").innerHTML = "";
        document.getElementById("preview_author").innerHTML = "";
    }


    function reset_submit_comment(){
        document.getElementById("comment_author").innerHTML = "";
        document.getElementById("comment_content").innerHTML = "";
    }



    function reset_comment(){
        document.getElementById("comments").innerHTML = "";
    }

}());






