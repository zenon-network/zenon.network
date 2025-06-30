// WebP detection and dynamic image loading
(function() {
    // Check WebP support
    function checkWebPSupport(callback) {
        var webP = new Image();
        webP.onload = webP.onerror = function() {
            callback(webP.height == 2);
        };
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    }
    
    // Apply WebP class to body if supported
    checkWebPSupport(function(supported) {
        if (supported) {
            document.documentElement.classList.add('webp');
            
            // Update all img elements with data-webp attribute
            var images = document.querySelectorAll('img[data-webp]');
            images.forEach(function(img) {
                if (!img.hasAttribute('data-lazy-src')) {
                    img.src = img.getAttribute('data-webp');
                }
            });
        } else {
            document.documentElement.classList.add('no-webp');
        }
    });
})();