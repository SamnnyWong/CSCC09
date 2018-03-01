(function(){
    "use strict";


    function insertUsername(username){
        var elmt = document.createElement('option');
        elmt.value = username._id;
        elmt.innerHTML= username._id;
        document.querySelector("#post_username").prepend(elmt);
    }

    function refreshUsers(){
        document.querySelector("#post_username").innerHTML = ``;
        api.getUsernames(function(err, usernames){
            if (err) document.querySelector('.alert').innerHTML = err;
            usernames.reverse().forEach(insertUsername);
        });
    }



    function insertMessage(message){
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.innerHTML=`
            <div class="message_user">
                <img class="message_picture" src="media/user.png" alt="${message.username}">
                <div class="message_username">${message.username}</div>
            </div>
            <div class="message_content">${message.content}</div>
        `;
        var username = api.getCurrentUser();
        if (username){
            elmt.innerHTML += `<div class="upvote-icon icon">${message.upvote}</div>
                               <div class="downvote-icon icon">${message.downvote}</div>`;
            if (username == message.username){
                elmt.innerHTML += `<div class="delete-icon icon"></div>`;
                elmt.querySelector(".delete-icon").addEventListener('click', function(){
                    api.deleteMessage(message._id, function(err, res){
                        if (err) console.log(err);
                        else refreshMessages();
                    });
                });
            }
            elmt.querySelector(".upvote-icon").addEventListener('click', function(){
                api.upvoteMessage(message._id, function(err, res){
                    if (err) console.log(err);
                    else refreshMessages();
                });
            });
            elmt.querySelector(".downvote-icon").addEventListener('click', function(){
                api.downvoteMessage(message._id, function(err, res){
                    if (err) console.log(err);
                    else refreshMessages();
                });
            });
        }
        document.querySelector("#messages").prepend(elmt);
    }
    
    function refreshMessages(){
        document.querySelector("#messages").innerHTML = "";
        api.getMessages(0, function(err, messages){
            if (err) console.log(err);
            else messages.forEach(insertMessage);
        });
    }

    // comment form injection


        window.addEventListener('load', function(){
        if (!api.getCurrentUser()){
            document.querySelector('#signin_button').classList.remove('hidden');
            var elmt = document.createElement('h1');
            elmt.innerHTML=`Please sign in to view content`;
            document.querySelector('#status').prepend(elmt);
        }else{
            var status = document.createElement('div');
            status.innerHTML=`
                <h2 class="form_select">Select Gallery
                <select id="post_username" class="form_select"></select>
                </h2>
                <h3>your are currently viewing X's gallery</h3>`;
            document.querySelector('#status').prepend(status);

            refreshUsers();
            document.querySelector('#signout_button').classList.remove('hidden');

            var gallery = document.createElement('div');
            gallery.innerHTML=`
                            <form>
                            <input type="text" id="post_title" class="form_element" placeholder="Enter the title" name="title" />
                            <input type="file" name="picture" class="form_element" />
                            <button type="submit" class="button" id="upload_button">Upload</button>
                            </form>
                            </br>
                            <button id="prev_button"><</button>
                            <image id="imageContainer" width="180px" border="1" src="https://upload.wikimedia.org/wikipedia/commons/9/9e/Plus_symbol.svg"></image>
                            <button id="next_button">></button>`;
            document.querySelector('#gallery').prepend(gallery);
            gallery.querySelector("#upload_button").addEventListener('click', function(){
                alert("clicker!!");
            });


            var commentbox = document.createElement('div');
            commentbox.innerHTML=`
                               <form class="complex_form" id="message_form">
                                <textarea rows="5" name="content" class="form_element" placeholder="Enter your message" required></textarea>
                                <button type="submit" class="btn">Post your message</button>
                                </form>`;
            document.querySelector('#comment_box').prepend(commentbox);

            // document.querySelector('form').classList.remove('hidden');
            // document.querySelector('form').addEventListener('submit', function(e){
            //     e.preventDefault();
            //     var content = document.querySelector("form [name=content]").value;
            //     document.querySelector("form").reset();
            //     api.addMessage(content, function(err, message){
            //         if (err) console.log(err);
            //         else refreshMessages();
            //     });
            // });
        }



    });
}());


