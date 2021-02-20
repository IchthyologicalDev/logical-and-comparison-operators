/*
Welcome to the Logical and Comparison operators exercise! You'll get to practice 
writing functions that use some common logical and comparison operators. If you
get stuck, follow the tips on the webpage.

Look through this file for requirements that start with REQUIREMENT N:
Be sure to use the function name and order of parameters specified in the TODOs

As an example,
REQUIREMENT 1: I catch a fish when it's rainy or it's been more than a week since
the last time I caught a fish. Will I catch a fish today?

TODO: After this comment, create a function named 'willCatchFish' that takes two
parameters:
boolean - true means it's rainy
number - time in days since I last caught a fish

The function should return true if I will catch a fish. 

EXAMPLE CALL
willCatchFish(true, 3) returns true

//YOUR FUNCTION GOES BELOW THIS LINE
function willCatchFish(isRainy, daysSinceFish) {
    //your logic would go here
}

This function would not pass, since it clearly doesn't tell me if I will catch fish

You will occasionally see longer comments (like this one) that will include extra
instruction, helpful hints, best practices, or other content. 

IMPORTANT
You should have the index.html file open in your browser as you work through this
exercise. If you aren't sure what this means, you should watch the How to Edit Code 
video: https://youtu.be/vkWDQzl_x3s before continuing.

Have fun netting some logical and comparison knowledge!
*/

/*
REQUIREMENT 1: I catch a fish when it's rainy or it's been more than a week since
the last time I caught a fish. Will I catch a fish today?

TODO: After this comment, create a function named 'willCatchFish' that takes two
parameters:
boolean - true means it's rainy
number - time in days since I last caught a fish

The function should return true if I will catch a fish, or false otherwise. 

EXAMPLE CALL
willCatchFish(true, 3) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function willCatchFish(isRainy, daysSinceFish) {
    return isRainy || daysSinceFish > 7;
}

/*
REQUIREMENT 2: Ocean fishing can be exciting. You don't always know what you'll
catch. I think that I caught a record breaking cod, but I'm not sure if it's actually
a cod, or if it even broke the previous record of 103 pounds Is this a record breaking cod?

TODO: After this comment, create a function named 'isRecordBreakingCod' that takes
two parameters:
string - fish species
weight - fish weight in pounds

The function should return true if it's a record breaking "cod", or false otherwise.

EXAMPLE CALL
isRecordBreakingCod('cod', 200) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function isRecordBreakingCod(species, weight) {
    return species == 'cod' && weight > 103;
}

/*
REQUIREMENT 3: My boat is only safe when the wind is less or equal to 5 knots. Can my boat handle the wind? 

TODO: After this comment, create a function named 'isBoatSafe' that takes
a single parameter:
number - wind speed in knots

The function should return true if my boat is safe for the wind, or false otherwise

EXAMPLE CALL
isBoatSafe(1) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function isBoatSafe(windSpeed) {
    return windSpeed <= 5;
}

/*
REQUIREMENT 4: Some fisherman can be really competitive. Present company excluded.
Fisherman have fun if they have caught a fish, or if no one has caught a fish. Did
I have fun fishing with a friend?

TODO: After this comment, create a function named 'wasFishingFun' that takes
two parameters:
boolean - whether the first fisherman caught a fish
boolean - whether the second fisherman caught a fish

The function should return true if everyone had fun, or false otherwise

EXAMPLE CALL
wasFishingFun(true, true) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function wasFishingFun(firstCaught, secondCaught) {
    return firstCaught == secondCaught;
}

/*
REQUIREMENT 5: Sharks will occasionally bite a hook that has an equal size or
smaller fish on it. Our boat can handle any size fish except for sharks. Sharks
must be smaller than our boat. Will a shark bite, and is our boat big enough?

TODO: After this comment, create a function named 'isBoatSufficient' that takes
three parameters:
number - length of fish on hook
number - length of shark
number - boat length

The function should return true if our boat is big enough for whatever we land, or false otherwise.

EXAMPLE CALL
isBoatSufficient(5, 10, 15) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function isBoatSufficient(fishLength, sharkLength, boatLength) {
    return fishLength > sharkLength || boatLength > sharkLength
}

/*
REQUIREMENT 6: I'm willing to move fishing locations if I haven't caught a fish
in a while, and the new location is closer to shore. Should I move?

//TODO: After this comment, create a function named 'shouldMove' that takes
threeParameters:
boolean - true if I caught a fish recently
number - current distance to shore
number - new location's distance to shore

The function should return true if I should move locations, or false otherwise

EXAMPLE CALL
shouldMove(false, 50, 30) returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function shouldMove(recentCatch, currentDistance, proposedDistance) {
    return !recentCatch && currentDistance > proposedDistance
}

/*
REQUIREMENT 7: I can justify fishing when it's a weekend or when my work backlog is empty. Can I justify fishing today?

TODO: After this comment, create a function named canJustifyFishing that takes
two parameters:
boolean - true if it's a weekday
string, number, undefined, or null - Empty backlog means empty string, 0, undefined, or null

The function should return true if I can justify fishing, or false otherwise

EXAMPLE CALLS
canJustifyFishing(true, null) returns true
canJustifyFishing(true, 0) returns true
canJustifyFishing(false, 'Grade Stuff') returns true
canJustifyFishing(true, 'Grade Stuff') returns false
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function canJustifyFishing(isWeekday, backlog) {
    return !isWeekday || !backlog
}

/*
REQUIREMENT 8: I like catch and release fishing. Sometimes I wonder if I've ever caught the same fish twice. Is this the same fish? 

TODO: After this comment, create a function named isSameFish that takes two
parameters:
string - first fish
string - second fish

The function should return true if the strings are the same, or false otherwise

EXAMPLE CALL
isSameFish('Dorothy', 'Dorothy') returns true
*/
//YOUR FUNCTION GOES BELOW THIS LINE
function isSameFish(first, second) {
    return first == second;
}

/*
You've reached the end of this exercise! If you need more practice with logical and
comparison operations, go try them in your console! Logical operators and equality
checks are everywhere. 
*/