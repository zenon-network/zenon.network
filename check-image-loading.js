// Script to check which images are actually loading (WebP vs PNG)
// Run this in the browser console

(function checkImageLoading() {
    console.log('=== CHECKING IMAGE LOADING ===\n');
    
    // Check all img elements
    const images = document.querySelectorAll('img');
    let webpCount = 0;
    let pngCount = 0;
    let otherCount = 0;
    
    console.log('IMG ELEMENTS:');
    images.forEach(img => {
        if (img.src.includes('.webp')) {
            webpCount++;
            console.log('✅ WebP:', img.src);
        } else if (img.src.includes('.png')) {
            pngCount++;
            console.log('❌ PNG:', img.src);
        } else if (img.src.includes('data:image')) {
            // Skip placeholder images
        } else {
            otherCount++;
        }
    });
    
    // Check background images
    console.log('\nBACKGROUND IMAGES:');
    const elementsWithBg = document.querySelectorAll('*');
    let bgWebpCount = 0;
    let bgPngCount = 0;
    
    elementsWithBg.forEach(el => {
        const bg = window.getComputedStyle(el).backgroundImage;
        if (bg && bg !== 'none') {
            if (bg.includes('.webp')) {
                bgWebpCount++;
                console.log('✅ WebP BG:', el.id || el.className, '-', bg);
            } else if (bg.includes('.png')) {
                bgPngCount++;
                console.log('❌ PNG BG:', el.id || el.className, '-', bg);
            }
        }
    });
    
    // Check network requests
    console.log('\nNETWORK REQUESTS:');
    const perfEntries = performance.getEntriesByType('resource');
    const imageRequests = perfEntries.filter(entry => 
        entry.name.includes('.png') || entry.name.includes('.webp')
    );
    
    const webpRequests = imageRequests.filter(r => r.name.includes('.webp'));
    const pngRequests = imageRequests.filter(r => r.name.includes('.png'));
    
    console.log('WebP requests:', webpRequests.length);
    webpRequests.forEach(r => console.log('  ✅', r.name.split('/').pop(), '-', (r.transferSize/1024).toFixed(1) + 'KB'));
    
    console.log('\nPNG requests:', pngRequests.length);
    pngRequests.forEach(r => console.log('  ❌', r.name.split('/').pop(), '-', (r.transferSize/1024).toFixed(1) + 'KB'));
    
    // Summary
    console.log('\n=== SUMMARY ===');
    console.log('IMG elements: WebP =', webpCount, ', PNG =', pngCount);
    console.log('Background images: WebP =', bgWebpCount, ', PNG =', bgPngCount);
    console.log('Network requests: WebP =', webpRequests.length, ', PNG =', pngRequests.length);
    console.log('Total bandwidth saved:', 
        ((pngRequests.reduce((a,b) => a + b.transferSize, 0) - 
          webpRequests.reduce((a,b) => a + b.transferSize, 0)) / 1024).toFixed(1), 'KB'
    );
    
    // Check if WebP is supported
    console.log('\nWebP Support:', document.documentElement.classList.contains('webp') ? '✅ YES' : '❌ NO');
})();