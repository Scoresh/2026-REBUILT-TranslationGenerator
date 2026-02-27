// make sure everything is loaded
document.addEventListener('DOMContentLoaded', (loadedEvent) => {
    // create previous "left click node" to work with poses
    var previous = null;    
    // global constant variable, set to 0, to count how many objects "exist" and to be used as a path
    var translationCount = 0;
    // tune to needs (how many absolute pixels should the mouse move to be considered a pose VERSUS a translation? )
    const varEpsilon = 1.0;

    // IMPORTANT ==> This is where the calculations based on REAL constants
    var imageWidth;
    var imageLength;

    // Constants
    var fieldWidthMeters = 0;
    var fieldLengthMeters = 0;

    window.addEventListener('resize', debounce(function(event) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        console.log(`New size: ${newWidth}x${newHeight}`);
        
    }),100);
    
    // Debounce function
    function debounce(func, delay) {
        let timeout;
        return function (...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func.apply(this, args);
            }, delay);
        };
    }
    // prevent right click window on FIELD
    document.getElementById("FIELD").addEventListener("contextmenu", function(e){e.preventDefault();return false;});

    // Calculate Translation and Pose
    document.getElementById("FIELD")
        .addEventListener("mousedown", 
        (event) => {
            // create translation
            switch (event.button) {
                case 0: //LEFT
                    console.log("Left Button Pressed.");
                    previous = new SavedTranslation(
                        event.clientX,
                        event.clientY
                    );
                    break;
                case 2: //RIGHT
                    if (previous != null) {
                        console.log("Right Button Pressed AND not null");   
                    }
                    break;
                default: break;
            }
            updateButtons();
            updatePoints();
        }
        
    );







    function updatePoints() {

    }

    function updateButtons() {
        console.log("Translation Count: ", translationCount);
    }

    class SavedTranslation  {
        translationX = 0;
        translationY = 0;
        visible = false;
        constructor(translationX, translationY) {
            this.translationX = translationX;
            this.translationY = translationY;
            translationCount++;
        }
        generate() {

        }
        mirror () {

        }
        destroy() {
            this.visible = false;
        }
        generateHtml() {

        }

    }

    class SavedPose {
        translation;
        angle = 0;
        constructor(translation, angle) {
            this.translation = translation;
            this.angle = angle;
        }

        static calculateAngle(x, y){
            return Math.atan2(y,x);
        }
        generate() {

        }
        mirror () {

        }
        destroy() {
            this.visible = false;
        }
        generateHtml() {

        }
    }
});