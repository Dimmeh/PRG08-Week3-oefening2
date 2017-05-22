class onSleep implements Behavior {

    public jibby: Jibby;

    constructor(j:Jibby) {
        this.jibby = j;
    }

    performBehavior() {
        Emotion.chooseEmotionImage("sleeping", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    }
}