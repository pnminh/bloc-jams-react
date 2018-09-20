export var formatTime=(secondsToFormat)=>{
    try{
        secondsToFormat = Math.round(Number(secondsToFormat));
        return String(Math.floor(secondsToFormat/60)).padStart(2,'0')+":"+String(secondsToFormat%60).padStart(2,'0');
    }catch(e){
        return "-:--";
    }
}