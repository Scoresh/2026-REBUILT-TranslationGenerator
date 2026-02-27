// make sure everything is loaded
document.addEventListener('DOMContentLoaded', (loadedEvent) => {
    // When site is first loaded, populate the FIELD div with the image and instantiate various variables
    const field = document.getElementById("FIELD");
    function drawImage() {
        const fieldimage = document.createElement("img");
        fieldimage.src = "images/field_cropped.png";
        fieldimage.alt = "Vertical image of the FRC 2026 Game Field";
        fieldimage.width = "500";
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
    // tune to needs (how many absolute pixels should the mouse move to be considered a pose VERSUS a translation? )
    const varEpsilon = 1.0;


    // Constants
    var fieldXMeters = 0;
    var fieldYMeters = 0;

    window.addEventListener('resize', function(event) {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;
        console.log(`New size: ${newWidth}x${newHeight}`);
        
    });
   
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
                    previous = new SavedTranslation(
                        event.clientX,
                        event.clientY
                    );
                    appendNodes.push(previous);
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



    function createPoint() {

    }



    function updatePoints() {

        for (const i of translationsAndPoses) {
            
        }
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

    }




    function getDataFROMField(x, y) {
        
    }

    function getDataINTOField() {

    }

});