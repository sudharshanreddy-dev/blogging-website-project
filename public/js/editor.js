const bannerUploadInput = document.getElementById('banner-upload');
const bannerImageDiv = document.getElementById('banner');

bannerUploadInput.addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            bannerImageDiv.style.backgroundImage = `url(${e.target.result})`;
            bannerImageDiv.style.backgroundSize = 'cover';
            bannerImageDiv.style.backgroundPosition = 'center';
        }
        reader.readAsDataURL(file);
    }
});