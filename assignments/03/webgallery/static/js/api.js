var api = (function(){
    var module = {};
    
    /*  ******* Data types *******
        image objects must have at least the following attributes:
            - (String) _id 
            - (String) title
            - (String) author
            - (Date) date
    
        comment objects must have the following attributes
            - (String) _id
            - (String) imageId
            - (String) author
            - (String) content
            - (Date) date






     -Non authenticated cannot read any picture nor comment
     -Non-authenticated can sign-up and sign-in into the application
     -Authenticated users can sign-out of the application
     -Authenticated users can browse any gallery
     -Gallery owners can upload and delete pictures to their own gallery only
     -Authenticated users can post comments on any picture of any gallery
     -Authenticated users can delete any one of their own comments but not others
     -Gallery owners can delete any comment on any picture from their own gallery
    
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
    
    module.signup = function(username, password, callback){
        
    }
    
    module.signin = function(username, password, callback){
        
    }
    
    // get all usernames (no pagination)
    module.getUsernames = function(callback){
        
    }
    
    // add an image to the gallery
    module.addImage = function(title, file, callback){
        
    }
    
    // delete an image from the gallery given its imageId
    module.deleteImage = function(imageId, callback){
        
    }
    
    // get an image from the gallery given its imageId
    module.getImage = function(imageId, callback){
        
    }
    
    // get all imageIds for a given username's gallery (no pagination)
    module.getAllImageIds = function(username, callback){

    }
    
    // add a comment to an image
    module.addComment = function(imageId, content, callback){
        
    }
    
    // delete a comment to an image
    module.deleteComment = function(commentId, callback){
        
    }
    
    // get comments (with pagination)
    module.getComments = function(imageId, page, callback){
        
    }
    
    return module;
})();




















// below is from a1


/*
*
* var api = (function(){
 var module = {};

 /*  ******* Data types *******
 image objects must have at least the following attributes:
 - (String) imageId
 - (String) title
 - (String) author
 - (String) url
 - (Date) date

 59            - (String) commentId
 - (String) imageId
 - (String) author
 - (String) content
 - (Date) date



if (!localStorage.getItem('images')){
    localStorage.setItem('images', JSON.stringify({}));
}

if (localStorage.getItem('images_guid') == null){
    localStorage.setItem('images_guid', JSON.stringify([]));
}


if (!localStorage.getItem('comments')){
    localStorage.setItem('comments', JSON.stringify({}));
}

if (!localStorage.getItem('current_Id')){
    localStorage.setItem('current_Id', JSON.stringify(""));
}

//guid generator

function guid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}

module.getNextImageObj = function(curr_imageId){
    // somehitn is wrong in this fuction
    var images =  JSON.parse(localStorage.getItem("images"));
    var images_guid = JSON.parse(localStorage.getItem("images_guid"));
    var index = images_guid.indexOf(curr_imageId);
    //out of bound issue
    return images[images_guid[index +1]];
}

module.getPrevImageObj = function(curr_imageId){
    var images =  JSON.parse(localStorage.getItem("images"));
    var images_guid = JSON.parse(localStorage.getItem("images_guid"));
    var index = images_guid.indexOf(curr_imageId);
    return images[images_guid[index -1]];
}

module.setCurrentID = function(imageId){
    localStorage.setItem("current_Id", JSON.stringify(imageId));
}

module.getCurrentID = function(){
    return JSON.parse(localStorage.getItem("current_Id"));
}



// return a readable date
function returnCreateDate(){

    var monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"];
    // var month = monthNames[date.getMonth()];
    return new Date().toISOString().split('T')[0];
}


// add an image to the gallery
// return an image object


module.addImage  = function(title, author, imageURL){
    var images = JSON.parse(localStorage.getItem("images"));
    var images_guid = JSON.parse(localStorage.getItem("images_guid"));
    var id = guid();
    var imageJasonObject = {};
    imageJasonObject.title = title;
    imageJasonObject.author = author;
    imageJasonObject.imageURL = imageURL;
    imageJasonObject.id=id;
    images_guid.push(id);
    images[id] = imageJasonObject;

    localStorage.setItem("images_guid", JSON.stringify(images_guid));
    localStorage.setItem("images", JSON.stringify(images));
    return imageJasonObject;

}

// delete an image from the gallery given its imageId
// return an image object
module.deleteImage = function(imageId){
    var images_guid = localStorage.getItem('images_guid');
    var images = JSON.parse(localStorage.getItem("images"));
    deletedImage = images[imageId];
    delete images[imageId];
    localStorage.setItem("images", JSON.stringify(images));
    delete images_guid[id.indexOf(imageId)];
    return deletedImage;





}

// get an image from the gallery given its imageId
// return an image object
module.getImage = function(imageId){
    var images = JSON.parse(localStorage.getItem("images"));
    return images[imageId];

}


module.getAllImagesObj = function(){
    return images = JSON.parse(localStorage.getItem("images"));

}

// get all imageIds from the gallery
// return an array of (String) imageId
module.getAllImageIds = function(){
    return JSON.parse(localStorage.getItem("images")).keys();
}

// add a comment to an image
// return a comment object
module.addComment = function(imageId, author, content){
    var comments = JSON.parse(localStorage.getItem("comments"));
    var comment_Id = guid();
    var commentJasonObj = {};
    commentJasonObj.author = author;
    commentJasonObj.content = content;
    commentJasonObj.createDate = returnCreateDate();
    commentJasonObj.cid = comment_Id;
    if (comments[imageId] == null){

        comments[imageId] = {};
    }
    comments[imageId][comment_Id] = commentJasonObj;
    localStorage.setItem("comments", JSON.stringify(comments));
    return commentJasonObj
}

// delete a comment to an image
// return a comment object
module.deleteComment = function(imageId, commentId){
    var comments = JSON.parse(localStorage.getItem("comments"));
    temp = comments[imageId][commentId];
    delete comments[imageId][commentId];
    localStorage.setItem("comments", JSON.stringify(comments));
    return temp
}


module.getComments = function(){
    return JSON.parse(localStorage.getItem("comments")).keys();
}




module.get_image_comments = function(imageId){
    var comments = JSON.parse(localStorage.getItem("comments"));
    return comments[imageId];

}

return module;


})();



// var images = JSON.parse(localStorage.getItem("images"));
// localStorage.setItem("images", JSON.stringify(images));
*
*
* */