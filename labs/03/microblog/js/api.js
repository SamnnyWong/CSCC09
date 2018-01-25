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
    module.addMessage = function(author, content){

        // store data here
        return {author: author, content: content}
    }

    // delete a message given its messageId
    // return a message object
    module.deleteMessage = function(messageId){

    }



    //#################################################3
    // upvote a message given its messageId
    // return a message object
    module.upvoteMessage = function(messageId){
        var oldMessages = JSON.parse(localStorage.getItem("messages"));
        oldMessages[messageId].upvoteCount ++;

        localStorage.setItem("messages", JSON.stringify(messages));
        return oldMessages[messageId];
    }
    //#################################################3

    // downvote a message given its messageId
    // return a message object
    module.downvoteMessage = function(messageId){

    }

    // get 5 latest messages given an offset
    // return an array of message objects
    module.getMessages = function(offset=0){

    }

    return module;
})();