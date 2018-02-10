var api = (function(){
    "use strict";
    
    var module = {};
    
    if (!localStorage.getItem('microblog')){
        localStorage.setItem('microblog', JSON.stringify({next: 0, messages: []}));
    }
    
    /*  ******* Data types *******
        message objects must have at least the following attributes:
            - (String) messageId 
            - (String) author
            - (String) content
            - (Int) upvote
            - (Int) downvote 
    
    ****************************** */

    function send(method, url, data, callback){
        var xhr = new XMLHttpRequest();
        xhr.onload = function() {
            if (xhr.status !== 200) callback("[" + xhr.status + "]" + xhr.responseText, null);
            else callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
    
    module.addMessage = function(author, content, callback){
        send("POST", "/api/messages/", {username: author, content: content}, callback);
    }
    
    module.deleteMessage = function(messageId){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var index = data.messages.findIndex(function(message){
            return message.id == messageId;
        });
        if (index == -1) return null;
        var message = data.messages[index];
        data.messages.splice(index, 1);
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.upvoteMessage = function(messageId){
        var data = JSON.parse(localStorage.getItem('microblog'));
        var message = data.messages.find(function(message){
            return message.id == messageId;
        });
        message.upvote+=1;
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.downvoteMessage = function(messageId){
        // var data = JSON.parse(localStorage.getItem('microblog'));
        // var message = data.messages.find(function(message){
        //     return message.id == messageId;
        // });
        // message.downvote+=1;
        // localStorage.setItem('microblog', JSON.stringify(data));
        // return message;
        send("PATCH", "");
    }

    module.getMessages = function(offset, callback){
        send("GET", "/api/messages/?offset=" + offset, null, callback);
    }
    
    return module;
})();