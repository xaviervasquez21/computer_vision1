// Classifier Variable
let classifier;
// Model URL
let imageModelURL = "https://teachablemachine.withgoogle.com/models/1UnhNVxQV/";

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";
let confiaza = 0;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + "model.json");
}

function setup() {
  createCanvas(320, 260);
  // Create the video
  video = createCapture(VIDEO);
  video.size(320, 240);
  video.hide();

  //flippedVideo = ml5.flipImage(video);
  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(video, 0, 0);

  // Draw the label
  fill(255);
  textSize(16);
  textAlign(CENTER);
  text(label, width / 2, height - 4);

  textSize(8);
  textAlign(LEFT);
  text(confiaza, 10, height - 4);

  // Si la etiqueta es "Audifonos", cambia los colores del fondo aleatoriamente
  if (label == "Audifonos" && confiaza > 0.7) {
    background(random(255), random(255), random(255));

    fill(0);
    textSize(50);
    textAlign(CENTER);
    text("¡Vive la Música!", width / 2, height / 2);
  }

  // Condicional para cambiar el fondo a turquesa
  if (label == "Celular" && confiaza > 0.7) {
    filter(INVERT);
    filter(GRAY);

    fill(255);
    textSize(80);
    textAlign(CENTER);
    text(label, width / 2, height / 2);
  }
}

// Get a prediction for the current video frame
function classifyVideo() {
  classifier.classify(video, gotResult);
}

// When we get a result
function gotResult(results, error) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }

  // The results are in an array ordered by confidence.
  label = results[0].label;
  confiaza = results[0].confidence;
  // Classifiy again!
  classifyVideo();
}
