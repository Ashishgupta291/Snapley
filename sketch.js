let ram;
let capture;
let posenet;
let noseX,noseY;
let reyeX,reyeY;
let leyeX,leyeY;
let singlePose,skeleton;
let filterdetails = localStorage.getItem('filterdetails') || 0;
let specs;
let parts = []; parts[0] = localStorage.getItem('parts') || 'nose';
var distance, slopeAngle,sinValue;
let filterlinks  = ["nose/filter1.png","nose/filter2.png"]
let width_array  = [2.6 ,3.3  ,2.2 ,3.3 ,2.3 ,2.1 ,2.6 ,2.3 ,2.2 ,2.6 ,3.0 ,0.8 ,2.6 ,2.30 ,2.10 ,2.20 ,2.00,2.50,5.00,3.50 ,2.20 ,3.30,2.30 ,2.40 ,2.60,2.40 ,2.00 ,2.20 ,2.90 ,2.60 ,3.20,2.20,2.40 ,2.20,2.00 ,2.90,4.60,2.00,2.20 ,2.30,2.20,2.80 ,2.30,1.80,1.80 ,1.80,1.80, 1.20 ,1.80 , 1.80,2.50,3.50 ,4.60,4.90,3.50 ,4.00,4.20,2.20,8.90 ,3.60,7.20,2.40,2.60 ,2.80,2.60,2.60,3.50,2.80 ,2.30, 3.80,3.50,3.30 ,2.80,2.80,2.80,7.50,4.00,3.00,2.70,2.30,3.00,2.90 ,7.50,3.60,4.00,3.50,4.20,4.00,3.40,3.40,3.40,3.80,4.50,3.40,3.60,4.60,3.60,4.60,5.60,3.60,4.40,4.40,4.40,4.20,4.40,4.40,4.40,5.00,4.40,4.40,4.90,3.50,4.40,2.40,4.40,4.40,4.40,5.50];
let height_array = [2.4 ,1.8  ,1.8 ,3.5 ,1.9 ,2.1 ,2.5 ,2.3 ,2.2 ,2.5 ,4.5 ,0.8 ,2.5 ,1.20 ,1.20 ,1.00 ,1.40,2.50,5.00,2.70 ,2.00 ,2.70,1.20 ,2.10 ,2.50,2.00 ,2.00 ,1.80 ,2.10 ,2.00 ,3.00,1.00,1.40 ,2.30,1.40 ,3.00,3.50,1.50,1.20 ,2.10,0.90,2.90 ,2.00,1.20,1.00 ,1.20,1.20, 1.20 ,1.20 , 1.20,2.50,2.50 ,4.90,4.70,3.30 ,4.50,4.50,1.80,5.90 ,4.20,4.00,1.40,2.40 ,4.20,2.50,1.60,4.20,2.80 ,1.70, 3.80,3.50,3.30 ,2.00,1.90,2.90,2.80,3.80,1.60,2.70,3.70,3.30,2.90 ,6.00,3.60,4.00,6.90,3.70,4.20,3.90,3.40,3.40,3.90,4.90,3.40,3.60,4.60,3.60,4.60,4.60,3.60,4.40,4.40,4.40,4.20,4.40,4.40,4.40,5.00,4.40,4.40,4.90,3.50,4.40,2.20,4.40,4.40,4.40,6.50];
let y_array      = [0.31,0.05 ,0.45,0.85,0.30,0.35,0.35,0.35,0.35,0.35,0.35,-1.0,0.35,0.35 ,0.35 ,0.35 ,0.45,0.35,0.35,1.75 ,0.45 ,1.20,0.35 ,0.35 ,0.35,0.35 ,0.35 ,0.35 ,0.35 ,0.10 ,0.35,0.38,0.35 ,0.35,0.35 ,0.35,0.95,0.15,0.35 ,0.35,0.45,-0.09,0.35,-0.4,-0.45,-0.4,-0.45,-0.4 ,-0.45,-0.45,0.80,-1.10,0.30,0.30,-0.70,0.80,0.80,0.80,-0.30,0.95,1.05,0.45,0.65 ,0.50,0.45,0.65,0.45,-0.15,0.15, 1.85,1.45,0.20 ,0.80,0.80,0.50,2.20,1.85,0.75,0.85,0.70,0.30,1.40 ,0.45,0.15,0.45,1.55,-.12,0.45,0.45,0.45,0.65,0.35,0.45,0.65,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.45,0.42,0.42,0.42,0.42,0.52,0.42,0.42,-.06,0.42,0.42,0.42,0.42];
let x_array      = [0.00,-0.06,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.40,0.00,-0.04,-0.04,-0.05,0.00,0.00,0.00,-0.06,-0.04,0.00,-0.05,-0.04,0.00,-0.04,-0.05,-0.04,-0.06,-0.05,0.00,0.00,-0.05,0.00,-0.05,0.10,0.00,0.00,-0.06,0.00,0.00,0.00 ,0.00,0.00,-0.04,0.00,0.00, -0.04,-0.04,-0.04,0.00,0.00 ,0.00,0.00,-0.09,0.00,0.00,0.00,0.00 ,0.00,0.00,0.00,-0.04,0.00,0.00,0.00,0.00,0.00, 0.00, 0.00,0.00,-0.15,0.00,0.02,0.00,0.00,0.00,0.00,0.00,0.00,0.03,-0.08,0.00,0.18,0.00,0.00,-.05,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.00,0.36,0.16,0.00,0.00,0.15,0.00];
let widthfact =  localStorage.getItem('widthfact') || width_array[0];
let heighfact =  localStorage.getItem('heighfact') || height_array[0];
let y_fac     =  localStorage.getItem('y_fac') || y_array[0]; 
let x_fac     =  localStorage.getItem('x_fac') || x_array[0];
let videoX,videoY;
let ashish;
let facingMod = localStorage.getItem('facingMod') || 'user';
let videoWidth;
let videoHeight; 
let flag = 0;
let selectedopt;
let recorder;
let isRecording = false;
let chunks = [];
let dummyButton;
let captureButton;
let startime;
let currentime;

   
// it will run single time
 function setup() {                    
    videoWidth  = windowWidth  < 640 ? windowWidth  : 640;
    videoHeight = windowHeight < 480 ? windowHeight : 480;  
  
    createCanvas(videoWidth, videoHeight);            //it will create canvas block of 640px  X  480px  (default)
    background(255);
    capture = createCapture({ video: { facingMode: facingMod }, audio:false});     //it will initiate your camera to take your vdo
    capture.hide();                    //hide to show the vdo

    // posnet model loading with vdo and callback function
    posenet = ml5.poseNet(capture, modelLoaded);
    // a eventlistener with callback function
    posenet.on('pose',receivedPoses);
    specs = loadImage(filterdetails);

    // Add slide event listeners to different filter images
    
    let startX;
    let canvas = document.getElementById("defaultCanvas0")
    canvas.addEventListener('touchstart', (event) => {
      startX = event.touches[0].clientX;
    });

    canvas.addEventListener('touchend', (event) => {
      let endX = event.changedTouches[0].clientX;
      let deltaX = endX - startX;

      if (deltaX > 0) {
        console.log('Swiped right');
        filterdetails = filterdetails + 1;
      } else if (deltaX < 0) {
        console.log('Swiped left');
        filterdetails = filterdetails - 1;
      }
      localStorage.setItem('filterdetails', filterdetails);
      specs = loadImage(filterlinks[filterdetails]);
      assignWidthAndHeight(filterdetails);
      // checking where to apply
      parts = filterlinks[filterdetails].split('/');
      localStorage.setItem('parts', parts[0]);
    });

      specs = loadImage(filterlinks[filterdetails]);
      assignWidthAndHeight(filterdetails);
      // checking where to apply
      parts = filterlinks[filterdetails].split('/');
      localStorage.setItem('parts', parts[0]);
      
 // dimention listener function
function assignWidthAndHeight(index) {
  
  widthfact = width_array[index];
  heighfact = height_array[index];
  y_fac     = y_array[index];
  x_fac     = x_array[index];
  localStorage.setItem('widthfact', widthfact);
  localStorage.setItem('heighfact', heighfact);
  localStorage.setItem('y_fac', y_fac);
  localStorage.setItem('x_fac', x_fac);
}


 //choose options in a block
 let divbb = createDiv();
 divbb.class("cccc");
 let divb = createDiv();
 divb.class("ccc");

 let scroll_container = createDiv();
 scroll_container.class("scroll-container");
 let scroll_content = createDiv();
 scroll_content.class("scroll-content");
 
 // Add options to the scroll content
 const Options = ["VIDEO", "PICTURE"];
 for (let i = 0; i < Options.length; i++){
   let option = createDiv(Options[i]);
   option.class("option");
   if (i === 1) {
     option.class("option selected"); // Add the "selected" class to the third option
   }
   scroll_content.child(option);
 }

 scroll_container.child(scroll_content);
 divb.child(scroll_container);
 divbb.child(divb);

 // Get all the option elements
 var options = document.querySelectorAll('.option');

 // Add click event listeners to each option
 options.forEach(function(option) {
   option.addEventListener('click', function() {
     // Remove the 'selected' class from all options
     options.forEach(function(opt) {opt.classList.remove('selected');});
     // Add the 'selected' class to the clicked option
     this.classList.add('selected');

     // Scroll the clicked option to the middle of the scroll container
     var container = document.querySelector('.scroll-container');
     var scrollLeft = this.offsetLeft - container.offsetWidth/2 + this.offsetWidth / 2 ;
     container.scroll({left: scrollLeft, behavior: 'smooth'});
     selectedopt= this.innerText;
     console.log(selectedopt);
     if(selectedopt==="VIDEO"){dummyButton.attribute('disabled', '');   document.querySelector('.dummybutton').style.background="gray"; captureButton.html('Record'); }
     else{                     dummyButton.removeAttribute('disabled'); document.querySelector('.dummybutton').style.background="azure";captureButton.html('Capture');  }
   });
 });

 // Find the initially selected option
 var defaultSelectedOption = document.querySelector('.option.selected');
 selectedopt= defaultSelectedOption.innerText;
 console.log(selectedopt);
 // Scroll the initially selected option to the middle of the scroll container
 var container = document.querySelector('.scroll-container');
 var scrollLeft = defaultSelectedOption.offsetLeft - container.offsetWidth/2 + defaultSelectedOption.offsetWidth / 2;
 container.scroll({left: scrollLeft, behavior: 'smooth' }); 
 
// Create (two + 1  dummy) separate HTML button in a div
  let divblock = createDiv();
  divblock.class("buttonbox");
// dummy 
  dummyButton = createButton('<i class="fa fa-download" id="downloadlogo"  aria-hidden="true"></i>');
  dummyButton.class("dummybutton");
  dummyButton.mousePressed(download);
  divblock.child(dummyButton);
// to capture
  let wrapbox = createDiv();
  wrapbox.style('width','150px');
  wrapbox.style('display','flex');
  wrapbox.style('justify-content','center');
  captureButton = createButton("Capture");
  captureButton.class("clicktopic");
  captureButton.mousePressed(captureImage);
  wrapbox.child(captureButton);
  divblock.child(wrapbox);
// to flip camera
  let flipButton = createButton('<i class="fa-solid fa-camera-rotate" id="rotatecamlogo"></i>');
  flipButton.class("flip");
  flipButton.mousePressed(flipcam);
  divblock.child(flipButton);

//my details
  ashish = createElement('b', 'Developed by Ashish Gupta <a class = "linkedin" href="https://www.linkedin.com/in/ashish-gupta-57aa36278">linkedin <i class="fa fa-linkedin" id="linkedinlogo"></i></a>');
}

function receivedPoses(poses){
    console.log(poses);
    ram= poses.length;
    if(poses.length > 0){
        singlePose = poses[0].pose;
        skeleton = poses[0].skeleton;
        document.getElementById("greet").innerHTML="You are looking nice &#128525;";
        document.getElementById("greet").style.color="rgb(245, 74, 48)";
    }
    else{document.getElementById("greet").innerHTML="Finding...";
         document.getElementById("greet").style.color="azure";}
}

function modelLoaded() {
    console.log('Model has been loaded');
}
function calculateDistance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    
    const distance = Math.sqrt(dx * dx + dy * dy);
    return distance;
}
 function calculateSlopeAngle(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
  
    const slope = dy / dx;
    const angleRadians = Math.atan(slope);
    const angleDegrees = (angleRadians * 180) / Math.PI;
  
    return angleDegrees;
  }
function flipcam(){ 
    facingMod = facingMod === 'user' ? 'environment' : 'user';
    localStorage.setItem('facingMod', facingMod);
    window.location.reload();
}
function download(){if(selectedopt==="PICTURE") { saveCanvas("Funglasses", "png"); if(flag==1){captureImage();} }
else if(selectedopt==="VIDEO"){ downloadRecording();}
else if(selectedopt==="GIF"){console.log("fff");}
}
function captureImage(){ 
  if(selectedopt==="PICTURE"){ 
                  if(flag==0){capture.pause(); flag=1; document.querySelector(".clicktopic").textContent='New';     document.querySelector(".clicktopic").style.background="rgb(131, 131, 237)"; document.querySelector(".scroll-container").style.display="none"; }
                  else{       capture.play();  flag=0;document.querySelector(".clicktopic").textContent='Capture';  document.querySelector(".clicktopic").style.background="azure";              document.querySelector(".scroll-container").style.display="block";}
  }
  else if(selectedopt==="VIDEO"){
    toggleRecording();
  }
  else if(selectedopt==="GIF"){//code for gif
    //toggleGifRecording();
  }
}
//it will run infinite times continuously 
  function draw() {  
    //tint feature
    let tintval=[]; let j=0;
    let tintc = document.querySelectorAll(".tint");
    tintc.forEach((change) => { tintval[j]= change.value ; j++; });
    tint(tintval[0],tintval[1],tintval[2]);
    
     currentime = Date.now();
     if(isRecording){ let seconds = Math.floor((currentime - startime)/1000) % 60;
                      let minutes = Math.floor(Math.floor((currentime - startime)/1000) / 60);
                      captureButton.html(minutes +":"+ seconds);}

     videoWidth  = windowWidth  < 640 ? windowWidth  : 640;
     videoHeight = windowHeight < 480 ? windowHeight : 480; 
     resizeCanvas(videoWidth ,videoHeight);  // update canvas dimensions constantly  {frame problem and auto canvas together removed}
  // images and videos(webcam)
  // Calculate the position to center the video
    videoX = (width - capture.width) / 2;
    videoY = (height - capture.height) / 2;
   //tint(255, 0, 150);
// Draw the video at the calculated position
  if(windowWidth >470 || facingMod === 'user'){ // stop mirror for back camera in phones
    translate(width,0);
    scale(-1,1);}
    image(capture, videoX, videoY);      // show the vdo picture by picture in center of canvas
    fill(255,0,0);                       // WHITE COLOR FEELING IN CIRCLE
       
    if(singlePose && (ram>0)){
     // //uncomment this for skeleton
        // for(let i=0; i<singlePose.keypoints.length; i++){
        //     ellipse(singlePose.keypoints[i].position.x + videoX, singlePose.keypoints[i].position.y + videoY,20);
        // }
        // stroke(255,255,255);
        // strokeWeight(5);
        // for(let j=0; j<skeleton.length; j++){
        //     line(skeleton[j][0].position.x + videoX, skeleton[j][0].position.y + videoY, skeleton[j][1].position.x + videoX, skeleton[j][1].position.y + videoY)
        // }
        

        // for appling filter on face  
          distance = calculateDistance(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
          console.log('distance',distance);
          slopeAngle = calculateSlopeAngle(singlePose.leftEye.x, singlePose.leftEye.y, singlePose.rightEye.x, singlePose.rightEye.y);
          sinValue = sin(radians(slopeAngle));
          push();
          if(parts[0]==='nose'){translate(Math.floor(singlePose.nose.x+50*sinValue-distance*x_fac + videoX),Math.floor(singlePose.nose.y-distance*y_fac + videoY));}
          else if(parts[0]==='eyes'){
            let mid_X = (singlePose.leftEye.x + singlePose.rightEye.x)/2;
            let mid_Y = (singlePose.leftEye.y + singlePose.rightEye.y)/2;
            sinValue = sin(radians(-slopeAngle));
            cosValue = Math.sqrt(1-sinValue*sinValue); 
            translate(Math.floor( mid_X-(distance*x_fac*cosValue)+(distance*0.6-(distance*y_fac))*sinValue + videoX), Math.floor(mid_Y +  (distance*0.6- distance*y_fac)*cosValue-(distance*x_fac*sinValue)  + videoY ));
          }
          rotate(radians(slopeAngle));
          imageMode(CENTER);
          image(specs,0,0,(Math.floor(distance*widthfact)),(Math.floor(distance*heighfact)));
          pop(); 
      // image(specs,singlePose.leftEye.x-distance*1.5,singlePose.leftEye.y-distance*0.8,distance*2,distance*2);
      //image(smoke,singlePose.nose.x-distance*0.9 + videoX,singlePose.nose.y+distance*0.5 + videoY,distance*0.8,distance*0.8);    
    }
    if (isRecording) {
      // Start recording if not already started
      if (!recorder || recorder.state === 'inactive') {
        chunks = [];
        const stream = canvas.captureStream();
        recorder = new MediaRecorder(stream, { mimeType: 'video/webm' });
        recorder.ondataavailable = saveChunk;
        recorder.onstop = enabledummybutton;
        recorder.start();
      }
    } else {
      // Stop the recording if recorder is active
      if (recorder && recorder.state === 'recording') {
        recorder.stop();
      }
    }    
}


function enabledummybutton(){
  dummyButton.removeAttribute('disabled'); 
  document.querySelector('.dummybutton').style.background="azure";
}
function toggleRecording() {
  isRecording = !isRecording;
  if (isRecording) {
     startime= Date.now();
     document.querySelector(".scroll-container").style.display="none";
  } else {
    captureButton.html('Record');
    document.querySelector(".scroll-container").style.display="block";
  }
}

function saveChunk(event) {
  chunks.push(event.data);
}

function downloadRecording(){
  const blob = new Blob(chunks, { type: 'video/mp4' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  document.body.appendChild(a);
  a.href = url;
  a.download = 'Funglasses_vdo.mp4';
  a.click();
  document.body.removeChild(a);
  dummyButton.attribute('disabled', ''); 
  document.querySelector('.dummybutton').style.background="gray"; 
  captureButton.html('Record');
}

