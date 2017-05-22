class Jibby {

    public hygiene:number;
    public food:number;
    public happyness:number;
    public isSleeping: boolean;

    public behavior: Behavior;

    public div:HTMLElement;
    public x:number;
    public y:number;

    private sleepTimer : number;

    constructor(parent:HTMLElement) {
        this.div = document.createElement("jibby");
        parent.appendChild(this.div);

        this.x = 0;
        this.y = 220;
        this.hygiene = this.food = this.happyness = 50;

        this.sleepTimer = 0;

        this.div.addEventListener("click", () => this.onPet());
        document.getElementsByTagName("foodbutton")[0].addEventListener("click", () => this.onEat());
        document.getElementsByTagName("washbutton")[0].addEventListener("click", () => this.onWash());

        this.behavior = new Idle(this);
        this.isSleeping = false;

        Emotion.chooseEmotionImage("default", this);
    }

    public update():void {
        this.behavior.performBehavior();
        this.sleepTimer += 1;
    }

    private onPet():void {
        if(!Game.gameOverCheck && !this.isSleeping) {
            this.behavior = new OnPet(this);
            this.sleepTimer = 0;
        }
    }

    private onWash():void {
        if(!Game.gameOverCheck && !this.isSleeping) {
            this.behavior = new OnWash(this);
            this.sleepTimer = 0;
        }
        else if(!Game.gameOverCheck && this.isSleeping){
            Emotion.chooseEmotionImage("angry", this);
            this.happyness -= 2;
            this.sleepTimer = 0;
        }

    }

    private onEat():void {
        if(!Game.gameOverCheck) {
            this.behavior = new OnEat(this);
            this.sleepTimer = 0;
        }
    }

    public onSleep():void{
        this.isSleeping = true;
        if(!Game.gameOverCheck){
            this.behavior = new onSleep(this);
        }
    }

    public jibbysSleepTimer ():void {
        console.log(this.sleepTimer);
        if(this.sleepTimer > 300){
            this.onSleep();
        }
        else{
            this.isSleeping = false;
            this.sleepTimer += 1;
        }
    }


}
