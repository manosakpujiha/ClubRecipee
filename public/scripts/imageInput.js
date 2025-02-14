    // Select the file input and preview container
    const imageInput = document.getElementById("image-input");
    const previewContainer = document.getElementById("preview");
    
    // Listen for file input changes
    imageInput.addEventListener("change", function () {
      // Clear any existing previews
      previewContainer.innerHTML = "";
    
      // Get the selected files
      const files = imageInput.files;
      
      if (!files || files.length === 0) {
        return;
      }
    
      // Loop through the FileList
      Array.from(files).forEach((file) => {
        // Make sure we only process image files
        if (!file.type.startsWith("image/")) return;
    
        const reader = new FileReader();
        reader.onload = function (e) {
          // Create an image element
          const img = document.createElement("img");
          img.src = e.target.result;
          previewContainer.appendChild(img);
        };
        reader.readAsDataURL(file);
      });
    });