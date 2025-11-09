// Cozy Cabin Functionality

document.addEventListener('DOMContentLoaded', function() {
    // Background music setup
    const backgroundMusic = document.getElementById('backgroundMusic');
    if (backgroundMusic) {
        // Try to play audio (modern browsers require user interaction first)
        backgroundMusic.volume = 0.3; // Set volume to 30% for ambiance
        backgroundMusic.play().catch(err => {
            // Auto-play was blocked, user needs to interact first
            console.log('Audio play blocked. Click anywhere to enable audio.');
            document.addEventListener('click', function enableAudio() {
                backgroundMusic.play();
                document.removeEventListener('click', enableAudio);
            }, { once: true });
        });
    }
    
    // Quote navigation
    const quotes = [
        "Click the arrows to navigate through quotes!",
        "Stay curious, stay creative.",
        "The best way to predict the future is to create it.",
        "Simple can be harder than complex.",
        "Design is not just what it looks like, design is how it works."
    ];
    
    let currentQuoteIndex = 0;
    const quoteText = document.getElementById('quoteText');
    const prevBtn = document.getElementById('quotePrev');
    const nextBtn = document.getElementById('quoteNext');
    
    if (!quoteText || !prevBtn || !nextBtn) {
        return; // Not on homepage
    }
    
    function updateQuote() {
        quoteText.textContent = quotes[currentQuoteIndex];
        prevBtn.disabled = currentQuoteIndex === 0;
        nextBtn.disabled = currentQuoteIndex === quotes.length - 1;
    }
    
    prevBtn.addEventListener('click', function() {
        if (currentQuoteIndex > 0) {
            currentQuoteIndex--;
            updateQuote();
        }
    });
    
    nextBtn.addEventListener('click', function() {
        if (currentQuoteIndex < quotes.length - 1) {
            currentQuoteIndex++;
            updateQuote();
        }
    });
    
    // Initialize
    updateQuote();
});


