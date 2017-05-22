class OnWash implements Behavior{

    public jibby: Jibby;

    constructor(j:Jibby){
        this.jibby = j;
    }

    performBehavior(){
        this.jibby.hygiene = this.jibby.hygiene + 10;
        Emotion.chooseEmotionImage("washing", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    }
}