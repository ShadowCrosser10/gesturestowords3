Webcam.set({
    height: 350,
    width: 350,
    img_format: "png",
    png_quality: 90
});

webcam = document.getElementById("webcam_div"); 

Webcam.attach(webcam);

function capture(){
    Webcam.snap(function(data_uri){
        document.getElementById("picture_div").innerHTML = '<img id="picture" src="'+data_uri+'">';  
    })
}

console.log("ml5 Version: ", ml5.version);   

model = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/gpzS4426C/model.json", modelLoaded);

function modelLoaded() {
    console.log("Model Loaded!"); 
}

prediction_1 = "";
prediction_2 = "";

function talk() {
    var synth = window.speechSynthesis; 
    speech_1 = "The first prediction is: "+prediction_1;
    speech_2 = "The second prediction is: "+prediction_2; 
    var utterThis = new SpeechSynthesisUtterance(speech_1+speech_2); 
    synth.speak(utterThis);
}

function predict() {
    img = document.getElementById("picture"); 
    model.classify(img, gotResult); 
}

function gotResult(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("name_no1").innerHTML = results[0].label;
        document.getElementById("name_no2").innerHTML = results[1].label;
        prediction_1 = results[0].label; 
        prediction_2 = results[1].label; 
        talk(); 

        
        if (results[0].label == "highfive") {
            document.getElementById("emotion_no1").innerHTML = "&#128400;";
        }
        if (results[0].label == "fistbump") {
            document.getElementById("emotion_no1").innerHTML = "&#128548;";
        }
        if (results[0].label == "handshake") {
            document.getElementById("emotion_no1").innerHTML = "&#128532;";
        }

        if (results[1].label == "highfive") {
            document.getElementById("emotion_no2").innerHTML = "&#128522;";
        }
        if (results[1].label == "fistbump") {
            document.getElementById("emotion_no2").innerHTML = "&#128548;";
        }
        if (results[1].label == "handshake") {
            document.getElementById("emotion_no2").innerHTML = "&#128532;";
        }
    }
}
