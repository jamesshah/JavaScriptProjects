let compScore = 0;
let playerScore  = 0;
let i = 0;
var play_choice = '';
let p_score = document.getElementById('p_score')
let c_score = document.getElementById('c_score')
let p_choice = document.getElementById('p_choice')
let c_choice = document.getElementById('c_choice')
let result = document.getElementById('result')
let restart = document.getElementById('restart_button')

function computerPlay(){
    const choice = {
        0 : "Rock",
        1 : "Paper",
        2 : "Scissor"
    }
    const random = Math.floor(Math.random() * 3);    
    return choice[random]
}

function gameOver(){
    return compScore === 5 || playerScore === 5
}

function startGame(){
    gamePlay(computer_choice,play_choice);

    if (gameOver()){
        if(playerScore === 5){
            console.log("You Won")
            result.textContent = "YAY!! You Won"
        }else{
            console.log("Computer Won")
            result.textContent = "Ohhhh Noooo!! You Lose"
            result.textContent.fontcolor("Red")
        }
        restart.style.display = "block"
        restart.addEventListener("click", function(){
            playerScore = 0
            compScore = 0
            p_choice.textContent = "Your Choice: "
            c_choice.textContent = "Computer's Choice : "
            p_score.textContent = "Player : 0"
            c_score.textContent = "Computer : 0"
            result.textContent = "Click On Your Choice"
            restart.style.display = "none"     
            startGame()
        })
    }
}

function gamePlay(comp_choice,player_choice){
    p_choice.textContent = "Your Choice: " +player_choice
    c_choice.textContent = "Computer's Choice: " +comp_choice
    if (comp_choice == player_choice){
        result.textContent = "It's A Tie!!"
    }else if(comp_choice == "Rock" && player_choice == "Paper"){
        playerScore++
        p_score.textContent = "Player : " + playerScore
        result.textContent = "You Won! Paper Beats Rock"
    }else if(comp_choice == "Rock" && player_choice == "Scissor"){
        compScore++
        c_score.textContent = "Computer : " + compScore
        result.textContent = "You Lost This Round"
    }else if(comp_choice == "Paper" && player_choice == "Scissor"){
        playerScore++
        p_score.textContent = "Player : " + playerScore
        result.textContent = "You won This Round!"
    }else if(comp_choice == "Paper" && player_choice == "Rock"){
        compScore++
        c_score.textContent = "Computer : " + compScore
        result.textContent = "You Lost This Round"
    }else if(comp_choice == "Scissor" && player_choice == "Paper"){
        compScore++
        c_score.textContent = "Computer : " + compScore
        result.textContent = "You Lost This Round"
    }else if(comp_choice == "Scissor" && player_choice == "Rock"){
        playerScore++
        p_score.textContent = "Player : " + playerScore
        result.textContent = "You won This Round!"
    }else{
        console.log("Enter a valid choice")
    }    
    console.log(playerScore)
    console.log(compScore)
}
    
const button = document.querySelectorAll("button");

button.forEach((button) => {
    button.addEventListener("click", () => {
        play_choice = button.value
        computer_choice = computerPlay()
        if(!gameOver()){
            startGame();
        }
    });
});



