// Test script to verify website optimizations
// Run this in the browser console to check optimization status

(function() {
    console.log('=== Zenon Network Website Optimization Audit ===\n');
    
    // 1. Check Image Optimization
    console.log('1. IMAGE OPTIMIZATION CHECK:');
    
    // Check for WebP support
    function checkWebPSupport() {
        var elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
        return false;
    }
    
    console.log('   - WebP Support:', checkWebPSupport() ? 'YES' : 'NO');
    
    // Check all images
    const allImages = document.querySelectorAll('img');
    const lazyImages = document.querySelectorAll('img[data-lazy-src]');
    const loadedImages = document.querySelectorAll('img[src]');
    
    console.log('   - Total images:', allImages.length);
    console.log('   - Lazy-loaded images:', lazyImages.length);
    console.log('   - Already loaded images:', loadedImages.length);
    
    // Check image sizes
    let largePNGs = [];
    let webpImages = [];
    allImages.forEach(img => {
        if (img.src) {
            if (img.src.includes('.webp')) {
                webpImages.push(img.src);
            }
            if (img.src.includes('.png') && img.naturalWidth > 500) {
                largePNGs.push({
                    src: img.src,
                    dimensions: `${img.naturalWidth}x${img.naturalHeight}`
                });
            }
        }
    });
    
    console.log('   - WebP images found:', webpImages.length);
    console.log('   - Large PNG images (>500px width):', largePNGs.length);
    if (largePNGs.length > 0) {
        console.log('     Large PNGs:', largePNGs);
    }
    
    // 2. Check Lazy Loading
    console.log('\n2. LAZY LOADING CHECK:');
    
    // Check Intersection Observer support
    console.log('   - IntersectionObserver support:', 'IntersectionObserver' in window ? 'YES' : 'NO');
    
    // Check Lottie animations
    const lottieAnimations = document.querySelectorAll('lottie-player');
    const lazyLottie = document.querySelectorAll('lottie-player[data-lazy-src]');
    
    console.log('   - Total Lottie animations:', lottieAnimations.length);
    console.log('   - Lazy-loaded animations:', lazyLottie.length);
    
    lottieAnimations.forEach((player, index) => {
        console.log(`   - Animation ${index + 1}:`, {
            id: player.id,
            src: player.src || 'Not loaded',
            autoplay: player.hasAttribute('autoplay'),
            renderer: player.getAttribute('renderer')
        });
    });
    
    // 3. JavaScript Functionality Check
    console.log('\n3. JAVASCRIPT FUNCTIONALITY CHECK:');
    
    // Check jQuery
    console.log('   - jQuery loaded:', typeof jQuery !== 'undefined' ? 'YES' : 'NO');
    
    // Check smooth scrolling
    const scrollLinks = document.querySelectorAll('.scroll');
    console.log('   - Smooth scroll links:', scrollLinks.length);
    
    // Check modal functionality
    const modals = document.querySelectorAll('.modal');
    const modalTriggers = document.querySelectorAll('.modal--open');
    console.log('   - Modals:', modals.length);
    console.log('   - Modal triggers:', modalTriggers.length);
    
    // Check price fetching
    const znnPrice = document.getElementById('znn-price');
    const qsrPrice = document.getElementById('qsr-price');
    console.log('   - ZNN price element:', znnPrice ? 'Found' : 'Not found');
    console.log('   - QSR price element:', qsrPrice ? 'Found' : 'Not found');
    if (znnPrice) console.log('     ZNN price:', znnPrice.textContent || 'Not loaded');
    if (qsrPrice) console.log('     QSR price:', qsrPrice.textContent || 'Not loaded');
    
    // 4. Console Errors Check
    console.log('\n4. CONSOLE ERRORS CHECK:');
    console.log('   - Check browser console for any errors or warnings');
    
    // 5. Network Performance
    console.log('\n5. NETWORK PERFORMANCE CHECK:');
    
    // Check resource timing
    if (window.performance && window.performance.getEntriesByType) {
        const resources = window.performance.getEntriesByType('resource');
        
        // Group by type
        const resourcesByType = {};
        resources.forEach(resource => {
            const type = resource.name.split('.').pop().split('?')[0];
            if (!resourcesByType[type]) {
                resourcesByType[type] = [];
            }
            resourcesByType[type].push({
                name: resource.name.split('/').pop(),
                duration: Math.round(resource.duration),
                size: resource.transferSize || 'N/A'
            });
        });
        
        console.log('   - Resources loaded by type:');
        Object.keys(resourcesByType).forEach(type => {
            console.log(`     ${type.toUpperCase()}: ${resourcesByType[type].length} files`);
        });
        
        // Find slow resources
        const slowResources = resources
            .filter(r => r.duration > 500)
            .sort((a, b) => b.duration - a.duration)
            .slice(0, 5);
        
        if (slowResources.length > 0) {
            console.log('   - Slowest resources (>500ms):');
            slowResources.forEach(r => {
                console.log(`     - ${r.name.split('/').pop()}: ${Math.round(r.duration)}ms`);
            });
        }
    }
    
    // 6. CSS Background Images Check
    console.log('\n6. CSS BACKGROUND IMAGES CHECK:');
    
    const bgImageUrls = [
        '../img/ball.png',
        '../img/star-background.png',
        '../img/swirl.png',
        '../img/znn-bg.png',
        '../img/play.png',
        '../img/pillar-bg.png'
    ];
    
    console.log('   - CSS background images using PNGs:', bgImageUrls.length);
    console.log('   - These could be optimized to WebP format');
    
    // 7. File Size Verification
    console.log('\n7. OPTIMIZATION RECOMMENDATIONS:');
    
    const recommendations = [];
    
    if (largePNGs.length > 0) {
        recommendations.push('- Convert large PNG images to WebP format for better compression');
    }
    
    if (lazyImages.length < allImages.length * 0.5) {
        recommendations.push('- Add lazy loading to more images');
    }
    
    if (!checkWebPSupport()) {
        recommendations.push('- Browser does not support WebP, PNG fallbacks are working correctly');
    }
    
    recommendations.push('- Consider converting CSS background PNGs to WebP with fallbacks');
    recommendations.push('- Ensure all Lottie animations use canvas renderer for better performance');
    
    if (recommendations.length > 0) {
        recommendations.forEach(rec => console.log(rec));
    }
    
    console.log('\n=== Audit Complete ===');
})();