var Dead = (function () {
    function Dead(j) {
        this.jibby = j;
    }
    Dead.prototype.performBehavior = function () {
        var g = Game.getInstance();
        g.gameOver();
    };
    return Dead;
}());
var OnEat = (function () {
    function OnEat(j) {
        this.jibby = j;
    }
    OnEat.prototype.performBehavior = function () {
        this.jibby.food = this.jibby.food + 10;
        Emotion.chooseEmotionImage("eating", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    };
    return OnEat;
}());
var Emotion = (function () {
    function Emotion() {
    }
    Emotion.chooseEmotionImage = function (emotionStatus, jibby) {
        switch (emotionStatus) {
            case "petting":
                jibby.div.style.backgroundImage = "url(images/happy.png)";
                break;
            case "washing":
                jibby.div.style.backgroundImage = "url(images/washing.png)";
                break;
            case "eating":
                jibby.div.style.backgroundImage = "url(images/eating.gif)";
                break;
            case "hungry":
                jibby.div.style.backgroundImage = "url(images/hungry.png)";
                break;
            case "sad":
                jibby.div.style.backgroundImage = "url(images/sad.png)";
                break;
            case "dirty":
                jibby.div.style.backgroundImage = "url(images/dirty.png)";
                break;
            case "dead":
                jibby.div.style.backgroundImage = "url(images/dead.png)";
                break;
            case "angry":
                jibby.div.style.backgroundImage = "url(images/angry.png)";
                break;
            case "sleeping":
                jibby.div.style.backgroundImage = "url(images/sleeping.png)";
                break;
            case "default":
                jibby.div.style.backgroundImage = "url(images/idle.png)";
                break;
        }
    };
    return Emotion;
}());
var Jibby = (function () {
    function Jibby(parent) {
        var _this = this;
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);
        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 50;
        this.sleepTimer = 0;
        this.div.addEventListener("click", function () { return _this.onPet(); });
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", function () { return _this.onEat(); });
        document.getElementsByTagName("washbutton")[0].addEventListener("click", function () { return _this.onWash(); });
        this.behavior = new Idle(this);
        this.isSleeping = false;
        Emotion.chooseEmotionImage("default", this);
    }
    Jibby.prototype.update = function () {
        this.behavior.performBehavior();
        this.sleepTimer += 1;
    };
    Jibby.prototype.onPet = function () {
        if (!Game.gameOverCheck && !this.isSleeping) {
            this.behavior = new OnPet(this);
            this.sleepTimer = 0;
        }
    };
    Jibby.prototype.onWash = function () {
        if (!Game.gameOverCheck && !this.isSleeping) {
            this.behavior = new OnWash(this);
            this.sleepTimer = 0;
        }
        else if (!Game.gameOverCheck && this.isSleeping) {
            Emotion.chooseEmotionImage("angry", this);
            this.happyness -= 2;
            this.sleepTimer = 0;
        }
    };
    Jibby.prototype.onEat = function () {
        if (!Game.gameOverCheck) {
            this.behavior = new OnEat(this);
            this.sleepTimer = 0;
        }
    };
    Jibby.prototype.onSleep = function () {
        this.isSleeping = true;
        if (!Game.gameOverCheck) {
            this.behavior = new onSleep(this);
        }
    };
    Jibby.prototype.jibbysSleepTimer = function () {
        console.log(this.sleepTimer);
        if (this.sleepTimer > 300) {
            this.onSleep();
        }
        else {
            this.isSleeping = false;
            this.sleepTimer += 1;
        }
    };
    return Jibby;
}());
var Game = (function () {
    function Game() {
        var _this = this;
        var container = document.getElementById("container");
        this.jibby = new Jibby(container);
        Game.gameOverCheck = false;
        requestAnimationFrame(function () { return _this.gameLoop(); });
    }
    Game.prototype.gameLoop = function () {
        var _this = this;
        this.jibby.update();
        this.updateUI();
        requestAnimationFrame(function () { return _this.gameLoop(); });
    };
    Game.prototype.gameOver = function () {
        Emotion.chooseEmotionImage("dead", this.jibby);
        Game.gameOverCheck = true;
    };
    Game.getInstance = function () {
        if (!Game.instance) {
            Game.instance = new Game();
        }
        return Game.instance;
    };
    Game.prototype.updateUI = function () {
        document.getElementsByTagName("food")[0].innerHTML = Math.round(this.jibby.food).toString();
        document.getElementsByTagName("happyness")[0].innerHTML = Math.round(this.jibby.happyness).toString();
        document.getElementsByTagName("hygiene")[0].innerHTML = Math.round(this.jibby.hygiene).toString();
    };
    return Game;
}());
window.addEventListener("load", function () {
    var g = Game.getInstance();
});
var Idle = (function () {
    function Idle(j) {
        this.jibby = j;
    }
    Idle.prototype.performBehavior = function () {
        if (this.jibby.happyness > 0 && this.jibby.hygiene > 0 && this.jibby.food > 0) {
            console.log(this.jibby.hygiene);
            this.checkValues();
            this.jibby.hygiene -= 0.01;
            this.jibby.food -= 0.02;
            this.jibby.happyness -= 0.015;
        }
        else {
            console.log('Dead');
            this.jibby.behavior = new Dead(this.jibby);
        }
    };
    Idle.prototype.checkValues = function () {
        if (this.jibby.food < 10) {
            Emotion.chooseEmotionImage("hungry", this.jibby);
        }
        else if (this.jibby.hygiene < 10) {
            Emotion.chooseEmotionImage("dirty", this.jibby);
        }
        else if (this.jibby.happyness < 10) {
            Emotion.chooseEmotionImage("sad", this.jibby);
        }
        else {
        }
    };
    Idle.prototype.delayDefaultImage = function () {
        if (this.timer > 120) {
            console.log(this.timer);
            Emotion.chooseEmotionImage("default", this.jibby);
        }
        else {
            this.timer += 1;
        }
    };
    return Idle;
}());
var OnPet = (function () {
    function OnPet(j) {
        this.jibby = j;
    }
    OnPet.prototype.performBehavior = function () {
        this.jibby.happyness = this.jibby.happyness + 10;
        Emotion.chooseEmotionImage("petting", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    };
    return OnPet;
}());
var onSleep = (function () {
    function onSleep(j) {
        this.jibby = j;
    }
    onSleep.prototype.performBehavior = function () {
        Emotion.chooseEmotionImage("sleeping", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    };
    return onSleep;
}());
var OnWash = (function () {
    function OnWash(j) {
        this.jibby = j;
    }
    OnWash.prototype.performBehavior = function () {
        this.jibby.hygiene = this.jibby.hygiene + 10;
        Emotion.chooseEmotionImage("washing", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    };
    return OnWash;
}());
//# sourceMappingURL=main.js.map