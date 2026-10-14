/*:
 * @target MZ
 * @plugindesc WARNING screen
 * @help Hey john. you motherfucker
 */

(() => {
    const warningImage = 'warning';
    const logoImage = 'logo';
    const warningDuration = 10 * 60; 
    const shakeDuration = 60; 
    const shakeMagnitude = 5;
    const logoDuration = 6 * 60; 
    const fadeInDuration = 60; 

    class Scene_Warning extends Scene_Base {
        constructor() {
            super();
            this._timeOnScreen = warningDuration;
            this._shakeTime = shakeDuration;
            this._shakeCount = 0;
            this._logoShown = false;
            this._fadeInStarted = false;
        }

        create() {
            super.create();
            this.createWarningImage();
        }

        createWarningImage() {
            this._warningImage = new Sprite(ImageManager.loadPicture(warningImage));
            const imageWidth = 776;
            const imageHeight = 617;
            this._warningImage.x = (Graphics.width - imageWidth) / 2;
            this._warningImage.y = (Graphics.height - imageHeight) / 2;
            this.addChild(this._warningImage);
        }

        createLogoImage() {
            this._logoImage = new Sprite(ImageManager.loadPicture(logoImage));
            const imageWidth = 572;
            const imageHeight = 639;
            this._logoImage.x = (Graphics.width - imageWidth) / 2;
            this._logoImage.y = (Graphics.height - imageHeight) / 2;
            this.addChild(this._logoImage);
        }

        update() {
            super.update();
            this._timeOnScreen--;

            if (this._shakeTime > 0) {
                this.shakeScreen();
                this._shakeTime--;
            }

            if (this._timeOnScreen <= 0 && !this._logoShown) {
                this.removeChild(this._warningImage);
                this.createLogoImage();
                this._logoShown = true;
                this._timeOnScreen = logoDuration; 
            }

            if (this._logoShown) {
                if (this._timeOnScreen <= 0 && !this._fadeInStarted) {
                    this.startFadeIn();
                }

                if (this._fadeInStarted) {
                    this.fadeInMenu();
                }
            }
        }

        shakeScreen() {
            const xOffset = Math.randomInt(shakeMagnitude) - shakeMagnitude / 2;
            const yOffset = Math.randomInt(shakeMagnitude) - shakeMagnitude / 2;
            this._warningImage.x += xOffset;
            this._warningImage.y += yOffset;

            if (this._shakeCount < 10) {
                this._shakeCount++;
            } else {
                this._shakeCount = 0;
                this._warningImage.x = (Graphics.width - 776) / 2;
                this._warningImage.y = (Graphics.height - 617) / 2;
            }
        }

        startFadeIn() {
            this._fadeInStarted = true;
            this._fadeInProgress = 0;
        }

        fadeInMenu() {
            this._fadeInProgress++;
            if (this._fadeInProgress < fadeInDuration) {
                const alpha = this._fadeInProgress / fadeInDuration;
                SceneManager._scene.opacity = alpha * 255;
            } else {
                SceneManager.goto(Scene_Title);
            }
        }
    }

    const _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        _Scene_Boot_start.call(this);
        SceneManager.goto(Scene_Warning);
    };
})();