function calculateELO(userScore, oppScore, timeTaken, baseTime, totalQuestions, userCurrentELO, isWin, gameMode) {
    let baseELO = 50;
    
    // Win/Lose bonus
    let winBonus = 0;
    if (isWin === true) winBonus = 100;
    else if (isWin === false) winBonus = 10;
    else winBonus = 30; // draw
    
    // Time bonus
    let timeBonus = 0;
    const timeRemaining = baseTime - timeTaken;
    if (timeRemaining > 0) {
        timeBonus = timeRemaining * 0.5;
    }
    
    // Correct answers bonus (each correct gives ~10 points in score)
    let correctBonus = userScore; // if score is 10 per correct answer
    
    let totalELO = baseELO + winBonus + timeBonus + correctBonus;
    
    // Mode modifiers
    if (gameMode !== "ranked") {
        totalELO = Math.floor(totalELO * 0.2); // 20% for classic/ai/friend
    } else {
        totalELO = Math.floor(totalELO);
    }
    
    return {
        gained: totalELO,
        newTotal: userCurrentELO + totalELO
    };
}

function getRankFromELO(elo) {
    if(elo <= 100) return { title: "Bronze I", tier: "Bronze" };
    if(elo <= 170) return { title: "Bronze II", tier: "Bronze" };
    if(elo <= 230) return { title: "Bronze III", tier: "Bronze" };
    if(elo <= 300) return { title: "Silver I", tier: "Silver" };
    if(elo <= 400) return { title: "Silver II", tier: "Silver" };
    if(elo <= 500) return { title: "Silver III", tier: "Silver" };
    if(elo <= 600) return { title: "Gold I", tier: "Gold" };
    if(elo <= 750) return { title: "Gold II", tier: "Gold" };
    if(elo <= 850) return { title: "Gold III", tier: "Gold" };
    if(elo <= 1000) return { title: "Epic I", tier: "Epic" };
    if(elo <= 1150) return { title: "Epic II", tier: "Epic" };
    if(elo <= 1250) return { title: "Epic III", tier: "Epic" };
    if(elo <= 1350) return { title: "Heroic I", tier: "Heroic" };
    if(elo <= 1500) return { title: "Heroic II", tier: "Heroic" };
    if(elo <= 1650) return { title: "Master", tier: "Master" };
    if(elo <= 2000) return { title: "Grandmaster", tier: "Grandmaster" };
    return { title: "Profesor", tier: "Profesor" };
}

module.exports = {
    calculateELO,
    getRankFromELO
};
