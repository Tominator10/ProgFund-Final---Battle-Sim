// function UpdateFight(userAction, enemyAction, userHealth, aiHealth) {
//   switch (userAction) {
//     case "attack":
      
//   }
// }

function DecideAiAction(){
  var random = Math.floor(Math.random() * 2);
  switch (random) {
    case 0:
      return "attack";
    case 1:
      return "grab";
    case 2:
      return "block";
  }
}

function Main() {
  //initialise
  var userAction = "";
  var aiAction = "";

  var userHealth = 10;
  var aiHealth = 10;

  var attackDamage = 2;
  var grabDamage = 1;
  var blockDamage = 1;

  var popUp = "Welcome to the fight!";
  var promptForInput = "Choose your action! (attack, grab, or block)"
  var incorrectAction = "You didn't enter a valid action, please try again. Enter attack, grab, or block"
  var reportLog = "<strong>Battle Report:</strong><br><br>";
  var introReport = "Here is your battle report:"

  //simulate
  var round = 1
  var bothAlive = true;
  while (bothAlive && round <= 5) {
    //what happened last round
    alert(popUp + " Your HP is " + userHealth + " and your enemy's HP is " + aiHealth);
    userAction = prompt(promptForInput);
    //validate input
    while (userAction != "attack" && userAction != "grab" && userAction != "block") {
      userAction = prompt(incorrectAction);
    }
    //run simulation and add to report
    aiAction = DecideAiAction();
    if (userAction === "attack") {
      if (aiAction === "attack") {
        popUp = "You and your opponent both attacked, striking simultaneous blows!";
        userHealth -= attackDamage;
        aiHealth -= attackDamage;
      } else if (aiAction === "grab") {
        popUp = "Your opponent tried to grab you, but your attack was too fast!";
        aiHealth -= attackDamage
      } else if (aiAction === "block") {
        popUp = "You tried to attack, but your opponent blocked it, sending a shot of pain up your arm!";
        userHealth -= blockDamage
      }
    } else if (userAction === "grab") {
      if (aiAction === "attack") {
        popUp = "Your opponent saw an opening in your defenses when you attempted to grab and landed a strike!";
        userHealth -= attackDamage
      } else if (aiAction === "grab") {
        popUp = "You and your opponent were locked in a grapple, until you both scrambled free!";
      } else if (aiAction === "block") {
        popUp = "As your opponent prepares to block an attack that isn't coming, you see an opening and grapple them!";
        aiHealth -= grabDamage;
      }
    } else if (userAction === "block") {
      if (aiAction === "attack") {
        popUp = "You saw your opponent's attack coming, expertly blocking and throwing them off!";
        aiHealth -= blockDamage;
      } else if (aiAction === "grab") {
        popUp = "You tried to block an attack that never came, as your opponent quickly grappled and damaged you!";
        userHealth -= grabDamage;
      } else if (aiAction === "block") {
        popUp = "You and your opponent both prepare to block whatever the other is going to throw next!";
      }
    }
    reportLog += "Round " + round + " - " + popUp;
    reportLog += "<br><em>Your health was " + userHealth + " and your opponent's was " + aiHealth + "</em><br>";
    //check for deaths
    if (userHealth <= 0 && aiHealth <= 0) {
      bothAlive = false;
      alert("You and your opponent killed each other at the same time! Truly an even match! " + introReport);
    } else if (userHealth <= 0) {
      bothAlive = false;
      alert("You've lost the battle with your opponent at a health of " + aiHealth + "! " + introReport);
      reportLog += "<br>You died!";
    } else if (aiHealth <= 0) {
      bothAlive = false;
      alert("You've won the mighty battle with a health of " + userHealth + "! " + introReport);
      reportLog += "<br>You killed your opponent!";
    } else {
      round++;
    }
  }
  //check for no-death wins
  if (round === 6) {
    if (userHealth === aiHealth) {
      alert("You and your opponent both ended the battle with " + userHealth + " health points! It's a draw! " + introReport);
      reportLog += "<br>You tied!";
    } else if (userHealth > aiHealth) {
      alert("You ended the battle with more health than your opponent! You win! " + introReport);
      reportLog += "<br>You Won!";
    } else {
      alert("You ended the battle with less health than your opponent! You lose! " + introReport);
      reportLog += "<br>You Lost!";
    }
  }
  //outputs
  document.write(reportLog);
}

Main();