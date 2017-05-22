class OnEat implements Behavior{

    public jibby: Jibby;

    constructor(j:Jibby){
        this.jibby = j;
    }

    performBehavior(){
        this.jibby.food = this.jibby.food + 10;
        Emotion.chooseEmotionImage("eating", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    }
}