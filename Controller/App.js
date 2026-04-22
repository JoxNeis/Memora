import Work from '../Model/Work.js';

class App{
    //#region CONSTRUCTOR
    constructor(){
        this.work = new Work();
    }
    //#endregion

    //#region UTILS
    saveAnswer(problem_id,answer_id){
        this.work.addAnswer(new Answer(problem_id,answer_id));
    }

    getResult(){

    }

    getQuizFromJSON(){

    }

    getJSONTemplate(){

    }

    getRemainingTime(){
        
    }
    //#endregion

}