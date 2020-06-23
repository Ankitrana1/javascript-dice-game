
( function(){
    var question = function(ques, option, ans){
        this.ques = ques; 
        this.option = option;
        this.ans = ans;
    }

    question.prototype.display = function(){
        console.log(this.ques);
        for(var i=0; i< this.option.length; i++){
            console.log(this.option[i]);
        }
    };

    question.prototype.checkAnswer = function(choice){
        if(parseInt(choice) === this.ans){
            console.log('Correct Answer!!!');
        }else{
            console.log('Try Next Time');
        }
    }

    var options = [
        ["1. 28","2. 29", "3. 26", "4. 27"],
        ["1. China", "2. Germany", "3. Australia", "4. Russia"],
        ["1. India", "2. France", "3. Sri Lanka", "4. Japan"]
    ];
    var questions = [];
    questions.push(new question("How many states are there in INDIA?", options[0], 2));
    questions.push(new question("Ozone layer depleted from which country atmosphere?", options[1], 3));
    questions.push(new question("Andaman Islands is part of which country?", options[2], 1));

    var rand = Math.floor(Math.random()*3);
    questions[rand].display();
    questions[rand].checkAnswer(prompt("Enter your Choice"));
})();