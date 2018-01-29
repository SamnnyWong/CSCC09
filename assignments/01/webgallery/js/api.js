var api = (function(){
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
    
    ****************************** */

    if (!localStorage.getItem('images')){
        localStorage.setItem('images', JSON.stringify({}));
    }

    if (localStorage.getItem('images_guid') == null){
        localStorage.setItem('images_guid', JSON.stringify([]));
    }


    if (!localStorage.getItem('comments')){
        localStorage.setItem('comments', JSON.stringify({}));
    }

    //guid generator

    function guid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
        });
    }

    
    // return a readable date
    function retrunDate() {
        var date = new Date();
        var components = [
            date.getYear(),
            date.getMonth(),
            date.getDate(),
            date.getHours(),
            date.getMinutes(),
            date.getSeconds(),
            date.getMilliseconds()
        ];

        var id = components.join("");
        return id;
        
    }


    // add an image to the gallery
    // return an image object


    module.addImage = function(title, author, imageURL){
        var images = JSON.parse(localStorage.getItem("images"));
        var imageJasonObject = {};
        imageJasonObject.title = title;
        imageJasonObject.author = author;
        imageJasonObject.imageURL = imageURL;
        var id = guid();
        images[id] = imageJasonObject;
        localStorage.setItem("images", JSON.stringify(images));
        var images_guid = JSON.parse(localStorage.getItem("images_guid"));
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        console.log(localStorage.getItem("images_guid"));
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
        images_guid.unshift(id);

        localStorage.setItem("images_guid", JSON.stringify(images_guid));
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
    module.getImages = function(imageId){
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

        var commentJasonObj = {};
        commentJasonObj.author = author;
        commentJasonObj.content = content;
        commentJasonObj.createDate = retrunDate();
        comments[imageId][guid()] = commentJasonObj;
        localStorage.setItem("comments", JSON.stringify(comments));
        return {author: username, content: content} //???
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


    module.getNextImageId = function(imageId){
        var images = JSON.parse(localStorage.getItem("images"));

    }


    module.getPrevImageId = function(imageId){
        return JSON.parse(localStorage.getItem("images"));
    }


    module.getAllCommentsObj = function(imageId, offset=0){
        return JSON.parse(localStorage.getItem("images"));
    }
    
    // get 10 latest comments given an offset 
    // return an array of comment objects
    module.getComments = function(imageId, offset=0){

        return JSON.parse(localStorage.getItem("images")).keys();
        //???
    }
    
    return module;
})();



// var images = JSON.parse(localStorage.getItem("images"));
// localStorage.setItem("images", JSON.stringify(images));