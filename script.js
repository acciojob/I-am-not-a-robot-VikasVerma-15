//your code here
const images = ["img1", "img2", "img3", "img4", "img5"];
let selected = []; // To store clicked images
const container = document.getElementById("image-container");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");

// Function to shuffle an array
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Initialize the images
function initImages() {
  container.innerHTML = "";
  message.innerText = "";
  selected = [];
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";

  // Pick a random image to duplicate
  const duplicateIndex = Math.floor(Math.random() * images.length);
  const imagesWithDuplicate = [...images, images[duplicateIndex]];

  // Shuffle the images
  shuffle(imagesWithDuplicate);

  // Create img elements
  imagesWithDuplicate.forEach((imgClass, index) => {
    const img = document.createElement("img");
    img.classList.add(imgClass);
    img.dataset.name = imgClass; // store name for comparison
    container.appendChild(img);

    // Add click event
    img.addEventListener("click", () => handleClick(img));
  });
}

// Handle image click
function handleClick(img) {
  if (selected.includes(img)) return; // prevent double click on same image
  if (selected.length >= 2) return; // prevent more than 2 clicks

  img.classList.add("selected");
  selected.push(img);

  if (selected.length >= 1) {
    resetBtn.style.display = "inline-block";
  }
  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

// Reset button
resetBtn.addEventListener("click", () => {
  selected.forEach(img => img.classList.remove("selected"));
  selected = [];
  message.innerText = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
});

// Verify button
verifyBtn.addEventListener("click", () => {
  if (selected.length !== 2) return;

  const [img1, img2] = selected;
  if (img1.dataset.name === img2.dataset.name) {
    message.innerText = "You are a human. Congratulations!";
  } else {
    message.innerText = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

// Initialize on page load
initImages();
