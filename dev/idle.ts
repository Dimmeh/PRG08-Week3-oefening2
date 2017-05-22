class Idle implements Behavior{

    public jibby: Jibby;
    private timer : number;

    constructor(j:Jibby){
        this.jibby = j;
    }

    performBehavior(){
        if(this.jibby.happyness > 0 && this.jibby.hygiene > 0 && this.jibby.food > 0){
            console.log(this.jibby.hygiene);
            this.checkValues();

            this.jibby.hygiene -= 0.01;
            this.jibby.food -= 0.02;
            this.jibby.happyness -= 0.015;
        }
        else{
            console.log('Dead');
            this.jibby.behavior = new Dead(this.jibby);
        }
    }

    private checkValues(){
        if(this.jibby.food < 10){
            Emotion.chooseEmotionImage("hungry", this.jibby);
        }
        else if(this.jibby.hygiene < 10){
            Emotion.chooseEmotionImage("dirty", this.jibby);
        }
        else if(this.jibby.happyness < 10){
            Emotion.chooseEmotionImage("sad", this.jibby);
        }
        else{
            // this.delayDefaultImage();
        }
    }

    private delayDefaultImage(){
        if(this.timer > 120){
            console.log(this.timer);
            Emotion.chooseEmotionImage("default", this.jibby);
        }
        else{
            this.timer += 1;
        }
    }
}