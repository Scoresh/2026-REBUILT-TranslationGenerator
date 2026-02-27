// AUTHOR DANIEL SABALAKOV, https://github.com/Scoresh, 5902 Wire Clippers 

const rainbowcolors = [
    "red",
    "orange",
    "yellow",
    "green",
    "blue",
    "indigo",
    "violet"
]

// make sure everything is loaded
document.addEventListener('DOMContentLoaded', (loadedEvent) => {
    // calculate window
    var newWidth;
    var newHeight;
    window.addEventListener('resize', event => updateAndLogWindow(event));

    function updateAndLogWindow(event) {
        newWidth = window.innerWidth;
        newHeight = window.innerHeight;
        console.log(`Window Size: ${newWidth}x${newHeight}`);
        
    }
    updateAndLogWindow(null);

    // When site is first loaded, populate the FIELD div with the image and instantiate various variables
    const field = document.getElementById("FIELD");
    function drawImage() {
        const fieldimage = document.createElement("img");
        fieldimage.src = "images/field_cropped.png";
        fieldimage.alt = "Vertical image of the FRC 2026 Game Field";
        fieldimage.style.width = "100%";
        fieldimage.style.height = "100%";
        field.appendChild(fieldimage)
    }
    drawImage();

    // IMPORTANT ==> This is where the calculations based on REAL constants
    var imageWidth;
    var imageHeight;

    function updateImageData() {
        imageWidth = field.childNodes[1].width;
        imageHeight = field.childNodes[1].width * field.childNodes[1].naturalHeight / field.childNodes[1].naturalWidth;
    }
    updateImageData();
    console.log(imageWidth + "BLAH" +  imageHeight)

    // Now that we have created the field, let's define our arrays: nodes   
    var allNodes = [];
    var appendNodes = [];
    var destroyNodes = [];

    // create previous "left click node" to work with poses
    var currentNode = null;    
    // global constant variable, set to 0, to count how many objects "exist" and to be used as a path
    var translationCount = 0;


    // Constants
    var fieldXMeters = 0;
    var fieldYMeters = 0;

   
    // prevent right click window on FIELD
    field.addEventListener("contextmenu", function(e){e.preventDefault();return false;});

    // Calculate Translation and Pose
    field
        .addEventListener("mousedown", 
        (event) => {
            // create translation
            switch (event.button) {
                case 0: //LEFT
                    console.log("Left Button Pressed.");
                    var newLoggedButton = new SavedTranslation(event.clientX, event.clientY);
                    if (previous != null) {                            
                        // if the two are close together, set previous to hypothetical new. do NOT append. 
                        if (!epsilonEquals2D(previous, newLoggedButton)) {
                            allNodes.push(newLoggedButton);
                            appendNodes.push(newLoggedButton);
                        }
                    }
                    previous = newLoggedButton;
                    break;
                case 2: //RIGHT
                    var newLoggedButton = new SavedTranslation(event.clientX, event.clientY);
                    if (previous != null) {
                        console.log("Right Button Pressed.");   
                        if (!epsilonEquals2D(previous, newLoggedButton)) {
                            newLoggedButton = new SavedPose(
                                newLoggedButton,
                                SavedPose.calculateAngle() // x, y
                            );
                            allNodes.push(newLoggedButton);
                            appendNodes.push(newLoggedButton);
                        }
                    }
                    break;
                default: break;
            }
            updateButtons();
            updatePoints();
        }
        
    );

    // epsilon is large on purpose. 
    // tune to needs (how many absolute pixels should the mouse move to be considered a pose VERSUS a translation? )
    // varEpsilon, in this case, is 5 pixels. (because I am doing a pythagorean theorum but not rooting it for computation sake.)
    const varEpsilon = 25;
    function epsilonEquals2D(before, after) {
        return Math.pow(Math.abs(before.translationX - after.translationX),2)
             + Math.pow(Math.abs(before.translationY - after.translationY),2) 
                    < varEpsilon;
    } 

    function createPoint() {

    }



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
            return "new Translation2d(" + this.translationX + ", " + this.translationY + " )";
        }
        generateSemicolon() {
            return this.generate() + ";";
        }
        mirrorAllianceFlip() {
            translationX = fieldXMeters - translationX;
            translationY = fieldYMeters - translationY;
        }
        hide() {
            this.visible = false;
        }
        generateNode() {

        }
        generateString() {
            return "Translation2d: X: " + this.translationX + " Y: " + this.translationY;
        }

        getX(){
            return this.translationX;
        }
        getY() {
            return this.translationY;
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
            return "new Pose2d(" + this.translation.generate() + ", Rotation2d.fromRadians(" + this.angle + "))";
        }
        generateSemicolon() {
            return this.generate() + ";";
        }
        mirrorAllianceFlip() {
            this.translation.mirrorAllianceFlip();
            this.angle = (angle + Math.PI) % (2 * Math.PI);
        }
        hide() {
            this.visible = false;
        }
        generateNode() {
            return 
        }
        generateString() {
            return "Pose2d: " + this.translation.generateString() + ", with an angle of " + this.angle + " radians.";
        }

        getX(){
            return this.translation.translationX;
        }
        getY() {
            return this.translation.translationY;
        }

    }




    function getDataFROMField(x, y) {
        
    }

    function getDataINTOField() {

    }

});