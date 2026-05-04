class ResultService{
    grade(problemSet,work){
        problemSet.forEach(element => {
            this.checkQuestion(element,work.find)
        });
    }

    checkQuestion(problem,answer){

    }
}