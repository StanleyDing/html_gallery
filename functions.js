var bestSlideshowWidth = 1000;
var bestSlideshowHeight = 830;
var slideshowWidth;
var slideshowHeight;
var displayWidth = 1000;
var displayHeight = 550;
var currentPhotoNum = 0;
var totalPhotoNum = 20;
var is_play = 0;
var interval;
var ratio;

function adjustBarWidth(){    
    var topBar = document.getElementById("top_bar");
    var top = document.getElementsByClassName("top");
    var bottomBar = document.getElementById("bottom_bar");
    var bottom = document.getElementsByClassName("bottom");
    topBar.style.width = top[0].style.width = window.innerWidth;
    bottomBar.style.width = bottom[0].style.width = window.innerWidth;
}

function changePhoto(photo_id){
    if(typeof(photo_id) === "undefined")
        photo_id = document.getElementById("thumb_" + currentPhotoNum);
    else if(photo_id === 1 || photo_id === -1)
        photo_id = document.getElementById("thumb_" + (currentPhotoNum + photo_id + totalPhotoNum) % totalPhotoNum);

    $("#loading").show();

    var cur_photo = document.getElementById("photo");
    
    objImage = new Image();
    cur_photo.src = objImage.src = photo_id.src.replace("thumb","");
    $(cur_photo).load(function(){
        ratio = objImage.width / objImage.height;        
        alterSize();
        $("#loading").hide();
    });
    
    var num = cur_photo.src.slice(cur_photo.src.lastIndexOf("/")+1, cur_photo.src.lastIndexOf("."));
    if(currentPhotoNum == parseInt(num))
        $("#loading").hide();
    currentPhotoNum = parseInt(num);
    
    for(i = -2, j = 0; i <= 2; i++, j++){
        var coverFlow = "cover_flow_" + j;
        var coverFlowId = document.getElementById(coverFlow);
        coverFlowId.src = "thumb" + (currentPhotoNum + i + totalPhotoNum) % totalPhotoNum + ".jpg";
    }
}

function alterSize(){
    if(displayWidth < displayHeight){
        $("#photo").attr("height", displayHeight * 0.9);
        $("#photo").attr("width", displayHeight * 0.9 * ratio);
        if($("#photo").attr("width") > displayWidth){
            $("#photo").attr("width", displayWidth * 0.9);
            $("#photo").attr("height", displayWidth * 0.9 / ratio);
        }
    }
    else if(displayWidth > displayHeight){
        $("#photo").attr("width", displayWidth * 0.9);
        $("#photo").attr("height", displayWidth * 0.9 / ratio);
        if($("#photo").attr("height") > displayHeight){
            $("#photo").attr("height", displayHeight * 0.9);
            $("#photo").attr("width", displayHeight * 0.9 * ratio);
        }
    }
}

function playPhoto(){
    if(is_play === 1){
        is_play = 0;
        clearInterval(interval);
        $("#pause").stop().show().fadeOut("slow");
    }
    else{
        interval = setInterval(function(){changePhoto(1)}, 2000);
        is_play = 1;
        $("#play").stop().show().fadeOut("slow");
    }
}