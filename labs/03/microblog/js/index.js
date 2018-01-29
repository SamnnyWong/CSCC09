

(function () {
    "use strict";
    window.addEventListener('load', function () {
        var oldMessages = api.getOldMessages();
        var counter = api.getCounter();
        if (counter != 0 || oldMessages.keys === null) {
            for (var mid in oldMessages) {
                var oldMessage = oldMessages[mid];
                postMessage(oldMessage.username, oldMessage.content, oldMessage.upvoteCount, oldMessage.downvoteCount, mid);
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
            api.counterInc();
            var mid = "message" + api.getCounter();
            // i dont like this...

            api.addMessage(username, content );
            postMessage(username, content, 0, 0, mid);
        });
    });


    function postMessage(username, content, upvoteCount, downvoteCount, mid) {
        // create a new message element
        var elmt = document.createElement('div');
        elmt.className = "message";
        elmt.id = mid;
        elmt.innerHTML = `
        <div class="message_user">
            <img class="message_picture" src="media/user.png" alt="${username}">
            <div class="message_username">${username}</div>
        </div>
        <div class = "message_content">${content}</div>
        <div class = "upvote-icon icon"> ${upvoteCount}</div>
        <div class = "downvote-icon icon"> ${downvoteCount}</div>
        <div class = "delete-icon icon"></div>
        `;

        elmt.querySelector('.upvote-icon').addEventListener('click', function () {

            upvoteCount ++;
            api.upvoteMessage(mid, upvoteCount);
            this.innerHTML = upvoteCount;

        });

        elmt.querySelector('.downvote-icon').addEventListener('click', function () {
            downvoteCount ++;
            api.downvoteMessage(mid, downvoteCount);
            this.innerHTML = downvoteCount;
        });

        elmt.querySelector('.delete-icon').addEventListener('click', function () {

            this.parentNode.remove();
            api.deleteMessage(mid);
        });

        // add this element to the document
        document.getElementById("messages").prepend(elmt);
    };



}());