var api = (function(){
    var module = {};

    /*  ******* Data types *******
     message objects must have at least the following attributes:
     - (String) messageId
     - (String) author
     - (String) content
     - (Int) upvote
     - (Int) downvote

     ****************************** */

    // add a message
    // return a message object


    if (!localStorage.getItem('counter')){
        localStorage.setItem('counter', JSON.stringify(0));
    }

    if (!localStorage.getItem('messages')){
        localStorage.setItem('messages', JSON.stringify({}));
    }

    module.addMessage = function(username, content, upvoteCount, downvoteCount, mid){
        /////////////////////////////////////////////////////////////
        var messages = JSON.parse(localStorage.getItem("messages"));
        /////////////////////////////////////////////////////////////
        var myJasonObj = {};
        myJasonObj.username = username;
        myJasonObj.content = content;
        myJasonObj.upvoteCount = upvoteCount;
        myJasonObj.downvoteCount = downvoteCount;
        messages[mid] = myJasonObj;
        localStorage.setItem("messages", JSON.stringify(messages));

        // store data here
        return {author: username, content: content}
    }

    // delete a message given its messageId
    // return a message object
    module.deleteMessage = function(messageId){
        var oldMessages = JSON.parse(localStorage.getItem("messages"));
        delete oldMessages[messageId];
        localStorage.setItem("messages", JSON.stringify(oldMessages));
        return oldMessages;

    }
    // upvote a message given its messageId
    // return a message object
    module.upvoteMessage = function(messageId, upvoteCount){
        var oldMessages = JSON.parse(localStorage.getItem("messages"));
        oldMessages[messageId].upvoteCount =  upvoteCount;

        localStorage.setItem("messages", JSON.stringify(oldMessages));
        return oldMessages[messageId];
    }



    // downvote a message given its messageId
    // return a message object
    module.downvoteMessage = function(messageId, downvoteCount){
        var oldMessages = JSON.parse(localStorage.getItem("messages"));
        oldMessages[messageId].downvoteCount =  downvoteCount;

        localStorage.setItem("messages", JSON.stringify(oldMessages));
        return oldMessages[messageId];

    }

    // get 5 latest messages given an offset
    // return an array of message objects
    module.getOldMessages = function(){
        //for loop
        return JSON.parse(localStorage.getItem("messages"));
    }




    module.getCounter = function(){
        return JSON.parse(localStorage.getItem("counter"));
    }



    module.counterInc = function(){
        var count = JSON.parse(localStorage.getItem("counter"));

        localStorage.setItem('counter', JSON.stringify(count+1));
    }

    return module;
})();














