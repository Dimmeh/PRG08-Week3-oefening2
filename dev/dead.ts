class Dead implements Behavior{

    public jibby: Jibby;

    constructor(j:Jibby){
        this.jibby = j;
    }

    performBehavior(){
        let g = Game.getInstance();
        g.gameOver();
    }
}