// Gallery data - organize designs by category
const galleryData = {
    logo: {
        title: 'Logo Design',
        images: [
            'HOOD5.png'
        ]
    },
    flyer: {
        title: 'Flyer Design',
        images: []
    },
    brand: {
        title: 'Brand Identity',
        images: []
    },
    social: {
        title: 'Social Media Design',
        images: []
    }
};

let currentCategory = '';
let currentImageIndex = 0;

function openGallery(category) {
    const data = galleryData[category];
    
    if (!data || data.images.length === 0) {
        alert(`No designs available for ${data.title} yet.`);
        return;
    }

    currentCategory = category;
    currentImageIndex = 0;
    
    const modal = document.getElementById('galleryModal');
    const title = document.getElementById('galleryTitle');
    const imagesContainer = document.getElementById('galleryImages');
    
    title.textContent = data.title;
    imagesContainer.innerHTML = '';
    
    // Load first image
    loadImage(0);
    
    modal.classList.add('show');
}

function loadImage(index) {
    const data = galleryData[currentCategory];
    if (index < 0 || index >= data.images.length) return;
    
    currentImageIndex = index;
    const imagesContainer = document.getElementById('galleryImages');
    imagesContainer.innerHTML = `<img src="${data.images[index]}" alt="Design ${index + 1}">`;
    
    // Update counter
    document.getElementById('imageCounter').textContent = `${index + 1} / ${data.images.length}`;
}

function nextImage() {
    const data = galleryData[currentCategory];
    if (currentImageIndex < data.images.length - 1) {
        loadImage(currentImageIndex + 1);
    } else {
        loadImage(0); // Loop back to first image
    }
}

function prevImage() {
    const data = galleryData[currentCategory];
    if (currentImageIndex > 0) {
        loadImage(currentImageIndex - 1);
    } else {
        loadImage(data.images.length - 1); // Loop to last image
    }
}

function closeGallery() {
    const modal = document.getElementById('galleryModal');
    modal.classList.remove('show');
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('galleryModal');
    if (event.target === modal) {
        closeGallery();
    }
}

// Keyboard navigation
document.addEventListener('keydown', function(event) {
    const modal = document.getElementById('galleryModal');
    if (!modal.classList.contains('show')) return;
    
    if (event.key === 'ArrowRight') nextImage();
    if (event.key === 'ArrowLeft') prevImage();
    if (event.key === 'Escape') closeGallery();
});