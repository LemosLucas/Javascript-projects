// Add listener to every 'key' object in the 'transitionend' event
(() => {
    const keys = document.querySelectorAll('.key');
    keys.forEach(key => {
        // It has to be a function instead of arrow function so that 'this' properly refer to the dynamic element that called it instead of the 'window' object which is the one assigned when it is originally made.
        key.addEventListener('transitionend', function (event) {
            // Every transitioned property will trigger this event. One of them will be taken
            // to remove '.playing' class
            if (event.propertyName === 'transform') {
                this.classList.remove('playing');
            }
        })
    })
})();


// Playing sound for every valid key pressed event
document.addEventListener('keydown', event => {
    const keyPressed = event.keyCode;
    const audioElement = document.querySelector(`audio[data-key="${keyPressed}"`);

    // No audio element was found, i. e., key pressed is not mapped to any drum sound
    if (!audioElement) {
        console.error(`Key pressed ${keyPressed} is not mapped to any drum sound`);
        return;
    }

    // Highlight the pressed key
    highlightPressedKeyFromAudioElement(keyPressed);

    // Play audio
    audioElement.currentTime = 0; // Rewinding audio to zero before playing
    audioElement.play();

});

function highlightPressedKeyFromAudioElement(keyPressed) {

    const keyToHighlight = document.querySelector(`.key[data-key="${keyPressed}"]`);

    // Add class to the 'audioElement'
    keyToHighlight.classList.add('playing');

    // Remove it after an interval. Problem is that whenever the css transition time changes, this js file must also be updated. Rather than this, we can use the 'transitionend' event that is fired to remove this class
    // setTimeout(() => {
    //     keyToHighlight.classList.remove('playing');
    // }, 75)
}