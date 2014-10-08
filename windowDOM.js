window.onload = function(){
    var cont = document.getElementById("thumbnail");

    //create rows
    for(i = 0; i < 5; i++)
        cont.innerHTML += "<div class='row'></div>";
    var row = document.getElementsByClassName("row");
    
    //create grid and thumbnail
    for(i = 0; i < 20; i++){
        row[Math.floor(i/4)].innerHTML += "<img class='thumb' id='thumb_" + i + "' src='thumb" + i + ".jpg'  onclick='changePhoto(this)'>";    
    }
    
    //thumbnail fade-in
    $(".thumb").load(function(){
        $(this).fadeTo("slow", 0.8);  
    });
    
    //set the bar width    
    adjustBarWidth();
    
    //jQuery effects start
    $("#bottom_bar").slideDown("slow").slideUp("slow", function(){
        $(".bottom").fadeTo("slow", 0);
    });
    
    $(".bottom").hover(
        function(){
            $(".bottom").stop().animate({opacity: "0.8"}, {queue: false, duration: "slow"});
            $("#bottom_bar").stop(true, true).slideDown("slow");
        },
        function(){
            $(".bottom").stop().animate({opacity: "0"}, {queue: false, duration: "slow"});
            $("#bottom_bar").stop(true, true).slideUp("slow");
        }
    );
    
    $(".top").hover(
        function(){
            $(".top").stop().animate({opacity: "0.8"}, {queue: false, duration: "slow"});
            $("#top_bar").stop(true, true).slideDown("slow");
        },
        function(){
            $(".top").stop().animate({opacity: "1"}, {queue: false, duration: "slow"});
            $("#top_bar").stop(true, true).slideUp("slow");
        }
    );
    
    $("#bottom_bar, .thumb").click(function(){
        $(".page").slideUp("slow", function(){
            $(".bottom").hide();
            $(".slideshow").fadeIn("slow", function(){
                $(".top").fadeIn("slow", function(){
                    $("#top_bar").slideDown("slow").slideUp("slow", function(){
                        $(".top").fadeTo("slow", 1);
                    });
                });
            });
        });
    });
    
    $("#top_bar").click(function(){
        resize();
        $(".slideshow").fadeOut("slow", function(){
            $(".top").hide();
            $(".page").slideDown("slow", function(){
                $(".bottom").fadeTo("slow", 0.8, function(){
                    $("#bottom_bar").slideDown("slow").slideUp("slow", function(){
                        $(".bottom").fadeTo("slow", 0);
                    });
                });
            });
        });
        
    });
    
    $(".thumb, .cover_flow > img").hover(
        function(){
            $(this).css("opacity", "1");
        },
        function(){
            $(this).css("opacity", "0.8");
        }
    )
    
    $(".cover_flow > img").click(function(){
        $(".cover_flow").stop(true, true).fadeTo("slow", 1).fadeTo("slow", 0.8);
    });
    
    $("#prevbutton, #nextbutton").hover(
        function(){
            $("img", this).attr("src", $(this).attr("id") + "on.png"); 
        },
        function(){
            $("img", this).attr("src", $(this).attr("id") + ".png"); 
        }    
    );
    

    //jQuery effects end
}

window.onresize = resize; 
function resize(){
    adjustBarWidth();
    if(window.innerWidth < bestSlideshowWidth || window.innerHeight < bestSlideshowHeight){
        $(".display").css("height", window.innerHeight * 0.7);
        displayWidth = window.innerWidth * 0.95;
        displayHeight = window.innerHeight * 0.7;
        alterSize();
    }
}