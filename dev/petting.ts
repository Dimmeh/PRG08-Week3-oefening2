class OnPet implements Behavior{

    public jibby: Jibby;

    constructor(j:Jibby){
        this.jibby = j;
    }

    performBehavior(){
        this.jibby.happyness = this.jibby.happyness + 10;
        Emotion.chooseEmotionImage("petting", this.jibby);
        this.jibby.behavior = new Idle(this.jibby);
    }
}