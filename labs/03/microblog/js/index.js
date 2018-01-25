/**
 * Created by sam on 2018-01-24.
 */


(function () {
    "use strict";




    window.addEventListener('load', function () {
        var counter = 0;
        var messages = {};

        if (localStorage.getItem('messages') != null) {
            console.log("hereeeeeeeeeeeeeeeeeeeeeeeeeee");
            var oldMessages = JSON.parse(localStorage.getItem("messages"));
            var counter = localStorage.getItem("counter");
            for (var mid in oldMessages) {

                var oldMessage = oldMessages[mid];
                messageGenerator(oldMessage.username, oldMessage.content, oldMessage.upvoteCount, oldMessage.downvoteCount, mid);

            }
        }

        document.querySelector('#create_message_form').addEventListener('submit', function (e) {
            // prevent from refreshing the page on submit
            e.preventDefault();

            // read form elements
            var username = document.querySelector("#post_name").value;
            var content = document.querySelector("#post_content").value;

            // clean form
            document.getElementById("create_message_form").reset();

            counter++;

            localStorage.setItem("counter", JSON.stringify(counter));
            var mid = "message" + counter;
            messageGenerator(username, content, 0, 0, mid);
        });
    });


    function messageGenerator(username, content, upvoteCount, downvoteCount, mid) {
        // create a new message element
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.id = mid;


        //create json object
        var object = createJsonObj(username, content, upvoteCount, downvoteCount);
        messages[elmt.id] = object;
        localStorage.setItem("messages", JSON.stringify(messages));

        // delete function
        var deleteButton = document.createElement('div');
        deleteButton.className = "delete-icon icon";
        deleteButton.addEventListener("click", function () {
            deleteId = this.parentNode.id;

            delete messages[deleteId];
            document.getElementById(deleteId).remove();
            localStorage.setItem("messages", JSON.stringify(messages));
        });

        //upvote function
        var upButton = document.createElement('div');
        upButton.className = "upvote-icon icon";
        upButton.innerHTML = upvoteCount;
        upButton.addEventListener("click", function () {
            upButton.innerHTML++;
            var Id = this.parentNode.id;
            messages[Id].upvoteCount = this.innerHTML;
            localStorage.setItem("messages", JSON.stringify(messages));
        });


        // downvote function
        var downButton = document.createElement('div');
        downButton.className = "downvote-icon icon";
        downButton.innerHTML = downvoteCount;
        downButton.addEventListener("click", function () {
            downButton.innerHTML ++;
            var Id = this.parentNode.id;
            messages[Id].downvoteCount = this.innerHTML;
            localStorage.setItem("messages", JSON.stringify(messages));
        });


        elmt.innerHTML = `
        <div class="message_user">
            <img class="message_picture" src="media/user.png" alt="${username}">
            <div class="message_username">${username}</div>
        </div>
        <div class="message_content">${content}</div>`;


        elmt.appendChild(upButton);
        elmt.appendChild(downButton);
        elmt.appendChild(deleteButton);
        // add this element to the document
        document.getElementById("messages").prepend(elmt);
    };




    function createJsonObj(userName, mContent, upvoteCount, downvoteCount) {
        var myJasonObj = {};
        myJasonObj.username = userName;
        myJasonObj.content = mContent;
        myJasonObj.upvoteCount = upvoteCount;
        myJasonObj.downvoteCount = downvoteCount;
        return myJasonObj;
    };


}());

