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
            if (xhr.status !== 200) return callback("[" + xhr.status + "]" + xhr.responseText, null);
            return callback(null, JSON.parse(xhr.responseText));
        };
        xhr.open(method, url, true);
        if (!data) xhr.send();
        else{
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(data));
        }
    }
    
    module.addMessage = function(author, content, callback){
        var message = {id: data.next++, author: author, content: content, upvote: 0, downvote: 0};
        send("post", "/api/messages/", message, callback);
        return message;
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
        var data = JSON.parse(localStorage.getItem('microblog'));
        var message = data.messages.find(function(message){
            return message.id == messageId;
        });
        message.downvote+=1;
        localStorage.setItem('microblog', JSON.stringify(data));
        return message;
    }
    
    module.getMessages = function(offset=0){
        var data = JSON.parse(localStorage.getItem('microblog'));
        return data.messages.slice(offset, offset+5);
    }
    
    return module;
})();