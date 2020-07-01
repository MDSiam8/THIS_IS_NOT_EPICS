const modelParams = {
  flipHorizontal: false,   // flip e.g for video 
  imageScaleFactor: 0.7,  // reduce input image size for gains in speed.
  maxNumBoxes: 1,        // maximum number of boxes to detect
  iouThreshold: 0.5,      // ioU threshold for non-max suppression
  scoreThreshold: 0.79,    // confidence threshold for predictions.
}

                                 
navigator.getUserMedia = 
navigator.getUserMedia || 
navigator.webkitGetUserMedia || 
navigator.mozGetUserMedia || 
navigator.msGetUserMedia;

//select everything from html

const video = document.querySelector('#video');
let model;
handTrack.startVideo(video)
    .then(status => {
    if(status){
        navigator.getUserMedia({video: {}}, stream => {
            video.srcObject = stream;
            //run our detection
            setInterval(runDetection, 100);
        },
        err => console.log(err)
        );
    }
});


function runDetection(){
    model.detect(video).then(predictions => {
        console.log(predictions);
    })
    
}

function runDetection(){
    model.detect(video).then(predictions => {
        if(predictions.length !== 0){
            let hand1 = predictions[0].bbox;
            let x = hand1[0];
            let y = hand1[1];
            console.log(x);

            document.addEventListener("keydown", keyDownHandler, false);
            document.addEventListener("keyup", keyUpHandler, false);
            function keyDownHandler(e) {
                if(x > 150) {
                    rightPressed = true;
                }
                else if(x < 50) {
                    leftPressed = true;
                }
            }
            
            function keyUpHandler(e) {
                if(x > 150) {
                    rightPressed = false;
                }
                else if(x < 50) {
                    leftPressed = false;
                }
            }
                
            }
    })
}

handTrack.load(modelParams).then(lmodel => {
    model = lmodel;
});
