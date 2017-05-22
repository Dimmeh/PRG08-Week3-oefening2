class Emotion{
    public static chooseEmotionImage(emotionStatus:string, jibby:Jibby):void{
        switch (emotionStatus){
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
    }
}