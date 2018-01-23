
var counter = 0;

window.onload = function(){

    document.getElementById('create_message_form').addEventListener('submit', function(e){
        // prevent from refreshing the page on submit
        e.preventDefault();
        // read form elements
        var username = document.getElementById("post_name").value;
        var content = document.getElementById("post_content").value;
        // clean form
        document.getElementById("create_message_form").reset();
        // create a new message element
        elmt = document.createElement('div');
        elmt.className = "message";
        counter = counter + 1;
        elmt.id = "message" + counter;

        var upButton = document.createElement('div');
        upButton.className="upvote-icon icon";
        upButton.innerHTML="0";

        var downButton = document.createElement('div');
        downButton.className="downvote-icon icon";
        downButton.innerHTML="0";

        var deleteButton = document.createElement('div');
        deleteButton.className="delete-icon icon";

        upButton.addEventListener("click", function(){
            increment(upButton);
        });

        downButton.addEventListener("click", function(){
            increment(downButton);
        });
        deleteButton.addEventListener("click", function(){
            document.getElementById(this.parentNode.id).remove();
        });




        elmt.innerHTML=`
        <div class="message_user">
            <img class="message_picture" src="media/user.png" alt="${username}">
            <div class="message_username">${username}</div>
        </div>
        <div class="message_content">${content}</div>
      
    `;

        elmt.appendChild(upButton);
        elmt.appendChild(downButton);
        elmt.appendChild(deleteButton);


        // add this element to the document
        document.getElementById("messages").prepend(elmt);
    });
}






function increment(e){
    e.innerHTML ++;
};