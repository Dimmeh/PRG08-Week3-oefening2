/// <reference path="jibby.ts"/>

class Game {

    private jibby : Jibby;
    private static instance:Game;
    public static gameOverCheck:boolean;

    constructor() {
        let container = document.getElementById("container");
        this.jibby = new Jibby(container);
        Game.gameOverCheck = false;
        requestAnimationFrame(() => this.gameLoop());
    }

    private gameLoop(){
        this.jibby.update();
        this.updateUI();
        requestAnimationFrame(() => this.gameLoop());
    }

    public gameOver(){
        Emotion.chooseEmotionImage("dead", this.jibby);
        Game.gameOverCheck = true;
    }

    public static getInstance(){
        if(!Game.instance){
            Game.instance = new Game();
        }
        return Game.instance;
    }

    private updateUI():void{
        document.getElementsByTagName("food")[0].innerHTML = Math.round(this.jibby.food).toString();
        document.getElementsByTagName("happyness")[0].innerHTML = Math.round(this.jibby.happyness).toString();
        document.getElementsByTagName("hygiene")[0].innerHTML = Math.round(this.jibby.hygiene).toString();
    }
}


// load
window.addEventListener("load", function() {
    let g:Game = Game.getInstance();
});