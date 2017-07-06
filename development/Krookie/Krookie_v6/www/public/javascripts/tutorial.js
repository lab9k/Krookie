var video = document.getElementById('bgvid');
var btn = document.getElementById('video_next');
var btnNext = document.getElementById('next_page');
var aTagNext = document.getElementById("secondButton");
var aTagRestart = document.getElementById("firstButton");

function playVideo() {
    document.getElementById('video_next').style.display = 'none';
    aTagRestart.innerHTML = "Volgende";
    var played = 0;
    var first= 0;
    var second = 0;
    var third = 0; 
    var fourth = 0;
    var fifth = 0;
    var sixth = 0;
    if(played < 1) {
        video.play();
        played++;
    }
    video.addEventListener("timeupdate", function(){
        function pauseVideo()
        {  
            video.pause();
            btn.style.display= "block";
            btn.addEventListener("click",function(){
                video.play();
                btn.style.display = "none";
            });
        }
        video.onended = function(e) {
            btn.style.display= "block";
            aTagRestart.innerHTML = "Opnieuw";
            btnNext.addEventListener("click", function(){
                first = 0;
                second = 0;
                third = 0; 
                fourth = 0;
                fifth = 0;
                sixth = 0;
                btn.style.display= "none";
                video.currentTime = 0;
            });   
        }
        if(this.currentTime >= 10 && this.currentTime <= 11 && first<1)
        {
            pauseVideo();
            first++;
        }
        if(this.currentTime >= 15 && this.currentTime <= 16 && second<1)
        {
            pauseVideo();
            second++;
        }
        if(this.currentTime >= 29 && this.currentTime <= 30 && third<1)
        {
            pauseVideo();
            third++;
        }
        if(this.currentTime >= 39 && this.currentTime <= 40 && fourth<1)
        {
            pauseVideo();
            fourth++;
        }
        if(this.currentTime >= 46 && this.currentTime <= 47 && fifth<1)
        {
            pauseVideo();
            fifth++;
        }
    });
}
window.onload = playVideo;