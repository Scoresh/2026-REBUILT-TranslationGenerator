// AUTHOR DANIEL SABALAKOV, https://github.com/Scoresh, 5902 Wire Clippers 

// begin rainbow indice at negative one because logic adds one then takes the modulo.
let rainbowIndice = -1;
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
    // IMPORTANT ==> This is where the calculations based on REAL constants
    let imageWidth;
    let imageHeight;




    // When site is first loaded, populate the FIELD div with the image and instantiate various variables
    const field = document.getElementById("FIELD");
    function drawImage() {
        const fieldimage = document.createElement("img");
        fieldimage.src = "images/field_cropped.png";
        fieldimage.alt = "Vertical image of the FRC 2026 Game Field";
        fieldimage.style.width = "100%";
        fieldimage.style.border = "5px solid red";
        fieldimage.style.position = "absolute"
        field.appendChild(fieldimage)
    }
    drawImage();


    // calculate window
    let newWidth;
    let newHeight;
    window.addEventListener('resize', event => updateAndLogWindow(event));

    function updateAndLogWindow(event) {
        newWidth = window.innerWidth;
        newHeight = window.innerHeight;
        console.log(`Window Size: ${newWidth}x${newHeight}`);

        deleteAllPoints();
        drawImage();
        updateImageData();
    }
    updateAndLogWindow(null);



    

    function updateImageData() {
        imageWidth = field.firstChild.width;
        console.log(field.firstChild.naturalHeight)
        console.log(field.firstChild.naturalWidth)
        imageHeight = field.firstChild.width * field.firstChild.naturalHeight / field.firstChild.naturalWidth;
    }
    updateImageData();

    // Now that we have created the field, let's define our arrays: nodes   
    let allNodes = [];
    let appendNodes = [];
    let destroyNodes = [];
    let hideNodes = [];
    // global constant variable, set to 0, to count how many objects "exist" and to be used as a path
    let translationCount = 0;


    // Constants 
    let fieldXMeters = 651.22; // https://firstfrc.blob.core.windows.net/frc2026/FieldAssets/2026-field-dimension-dwgs.pdf
    let fieldYMeters = 317.69; // https://firstfrc.blob.core.windows.net/frc2026/FieldAssets/2026-field-dimension-dwgs.pdf

   
    // prevent right click window on FIELD
    field.addEventListener("contextmenu", function(e){e.preventDefault();return false;});
    
    let previous = null;
    let newLoggedButton;
    // Calculate Translation and Pose
    field
        .addEventListener("mousedown", 
        (event) => {
            // create translation
            switch (event.button) {
                case 0: //LEFT
                    newLoggedButton = new SavedTranslation(event.offsetX, event.offsetY);
                    if (previous != null) {                            
                        // if the two are close together, set previous to hypothetical new. do NOT append. 
                        if (!epsilonEquals2D(previous, newLoggedButton)) {
                            newLoggedButton.updateCounter();
                            allNodes.push(newLoggedButton);
                            appendNodes.push(newLoggedButton);
                        }
                    } else if (previous == null) {
                        // n'th case to begin 
                        console.log("Previous is Null.")
                        newLoggedButton.updateCounter();
                        allNodes.push(newLoggedButton);
                        appendNodes.push(newLoggedButton);
                    }
                    previous = newLoggedButton;
                    break;
                case 2: //RIGHT
                    newLoggedButton = new SavedTranslation(event.offsetX, event.offsetY);
                    if (previous != null) {
                        let tempx = newLoggedButton.getX();
                        let tempy = newLoggedButton.getY();
                        if (!epsilonEquals2D(previous, newLoggedButton)) {
                            newLoggedButton.updateCounter();
                            // saving data for previous
                            newLoggedButton = new SavedPose(
                                previous.getX(),
                                previous.getY(),
                                SavedPose.calculateAngle(tempx - previous.getX(), previous.getY() - tempy) // x, y
                            );
                            // pop out the last one
                            allNodes.pop();
                            appendNodes.pop();
                            translationCount--;
                            allNodes.push(newLoggedButton);
                            appendNodes.push(newLoggedButton);
                        }                            
                        previous = new SavedTranslation(tempx, tempy);

                    }
                    break;
                default: return;
            }
            // post 
            updateButtons();
            updatePoints();
            clearAppendix();
        }
        
    );

    // epsilon is large on purpose. 
    // tune to needs (how many absolute pixels should the mouse move to be considered a pose VERSUS a translation? )
    // varEpsilon, in this case, is 5 pixels. (because I am doing a pythagorean theorum but not rooting it for computation sake.)
    const varianceEpsilonSquared = 25;
    function epsilonEquals2D(before, after) {
        return Math.pow(Math.abs(before.getX() - after.getX()),2)
             + Math.pow(Math.abs(before.getY() - after.getY()),2) 
                    < varianceEpsilonSquared;
    } 



    let zindice = 1;
    function updatePoints() {
        // calculate based on input parameters
        for (const i of appendNodes) {
            if (appendNodes.length != 0) {
                // create box
                let boxxed_div = document.createElement('div');
                console.log("updating points");
                boxxed_div.style.backgroundColor = rainbowcolors[rainbowIndice++] % rainbowcolors.length;
                boxxed_div.style.left = i.getX() + "px";
                boxxed_div.style.top =  i.getY() + "px";
                boxxed_div.innerHTML = "BKAH ASDJKHASDHKJASHDKJHASKJDH"
                boxxed_div.style.position = "absolute"
                boxxed_div.style.zIndex = zindice++;
                boxxed_div.style.alignContent = "center";
                boxxed_div.style.color = rainbowcolors[rainbowIndice] % rainbowcolors.length;
                document.getElementById("FIELD").appendChild(boxxed_div);
            }
            
        }
    }


    function deleteAllPoints() {
        while (field.firstChild) {
            if (field.firstChild == field.lastChild){
                return;
            }
            field.removeChild(field.lastChild);
        }
    }

    function updateAllPoints() {
        deleteAllPoints();
    }

    function updateButtons() {

    }

    function clearAppendix() {
        appendNodes = [];
    }

    class SavedTranslation  {
        translationX = 0;
        translationY = 0;
        visible = true;
        constructor(translationX, translationY) {
            this.translationX = translationX;
            this.translationY = translationY;

        }
        updateCounter() {
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
        generateString() {
            return "Translation2d: X: " + this.translationX + " Y: " + this.translationY;
        }

        getX(){
            return this.translationX;
        }
        getY() {
            return this.translationY;
        }
        getTranslation() {
            return this;
        }
    }

    class SavedPose extends SavedTranslation {
        angle = 0;
        constructor(translationX, translationY, angle) {
            super(translationX, translationY);
            this.angle = angle;
        }
        updateCounter() {
            translationCount++;
        }
        static calculateAngle(x, y){
            return Math.atan2(y,x);
        }
        generate() {
            return "new Pose2d(" + super.generate() + ", Rotation2d.fromRadians(" + this.angle + "))";
        }
        generateSemicolon() {
            return this.generate() + ";";
        }
        mirrorAllianceFlip() {
            super.mirrorAllianceFlip();
            this.angle = (angle + Math.PI) % (2 * Math.PI);
        }
        generateString() {
            return "Pose2d: " + super.generateString() + ", with an angle of " + this.angle + " radians.";
        }
    }




    function getDataFROMField(x, y) {
        
    }

    function getDataINTOField() {

    }

});