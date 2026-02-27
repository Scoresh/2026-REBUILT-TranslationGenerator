// make sure everything is loaded
document.addEventListener('DOMContentLoaded', (loadedEvent) => {

    

    console.log("DOM IS LOADED");
    // tune to needs (how many absolute pixels should the mouse move to be considered a pose VERSUS a translation? )
    const varEpsilon = 1.0;

    
    // prevent right click window on FIELD
    document.getElementById("FIELD").addEventListener("contextmenu", function(){return false;});

    // Calculate Translation and Pose
    document.getElementById("FIELD")
        .addEventListener("mousedown", 
        (event) => {
            // create translation
            switch (event.button) {
                case 0: //LEFT
                    console.log("Left Button Pressed.");
                    break;
                case 2: //RIGHT
                    if (previous != null) {
                        console.log("Right Button Pressed AND not null");   
                    }
                    break;
                default: break;
            }
        }
        
    );


    function updateButtons() {

    }

    class SavedTranslation  {
        num = 0;
        translationX = 0;
        translationY = 0;
        visible = false;
        constructor(translationX, translationY) {
            this.translationX = translationX;
            this.translationY = translationY;
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