test( "hello test", function() {
  ok( 1 == "1", "Passed!" );
});

test("test title", function() {
  var post = buildPost("~fran");
  ok( post.title == "fran", "Passed!" );
});

test("test type", function() {
  var types = ["amrap", 'rft', 'emom', 'emotm', '21-15-9', '21-18-15-12-9', 'afap'];
  for (var i = 0; i < types.length; i++) {
    var post = buildPost("~fran " + types[i]);
    ok( post.type == types[i], "Passed type " + types[i]);
  }
});

test("test rounds", function() {
  var rounds = new Array();
  rounds["3"] = "3";
  rounds["3r"] = "3";
  rounds["3rounds"] = "3";
  rounds["3+2r"] = "3+2";
  rounds["3+2rounds"] = "3+2";

  for (round in rounds) {
    var post = buildPost("~fran " + round);
    ok( post.rounds == rounds[round], "Passed type " + round + " found " + post.rounds);
  }
});

test("test time", function() {
  var times = new Array();
  times["3mins"] = "3:00";
  times["3min"] = "3:00";
  times["3m"] = "3:00";
  times["3:00"] = "3:00";
  times["7secs"] = "00:07";
  times["7sec"] = "00:07";
  times["7s"] = "00:07";

  for (time in times) {
    var post = buildPost("~fran " + time);
    ok( post.time == times[time], "Passed type " + time + " as " + times[time]);
  }
});

test("test exercise name only", function() {
  var blurb = "#pullups";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "pullups", "Passed " + blurb + " got " + exercise.movement);
});

test("test exercise name with reps", function() {
  var blurb = "#pullupsx20";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "pullups", "Passed type " + blurb);
  ok( exercise.reps == 20, "Passed type " + blurb);
});

test("test exercise name with sets and reps", function() {
  var blurb = "#pullups3x20";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "pullups", "Passed type " + blurb);
  ok( exercise.reps == 20, "Passed type " + blurb);
  ok( exercise.sets == 3, "Passed type " + blurb);
});

test("test exercise with reps units", function() {
  var blurb = "#row5x400m";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "row", "Passed type " + blurb);
  ok( exercise.reps == 400, "Passed type " + blurb);
  ok( exercise.sets == 5, "Passed type " + blurb);
  ok( exercise.repUnit == "m", "Missed repUnits " + blurb);
});

test("test exercise with reps units", function() {
  var blurb = "#row5x400mi";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "row", "Passed type " + blurb);
  ok( exercise.reps == 400, "Passed type " + blurb);
  ok( exercise.sets == 5, "Passed type " + blurb);
  ok( exercise.repUnit == "mi", "Missed repUnits " + blurb);
});

test("test exercise with reps units", function() {
  var blurb = "#row5x400yds";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "row", "Passed type " + blurb);
  ok( exercise.reps == 400, "Passed type " + blurb);
  ok( exercise.sets == 5, "Passed type " + blurb);
  ok( exercise.repUnit == "yds", "Missed repUnits " + blurb);
});

test("test exercise with weight", function() {
  var blurb = "135#cleanandjerk";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "cleanandjerk", "Passed type " + blurb);
  ok( exercise.amplitude == "135", "Passed type " + blurb);
});

test("test exercise with amplitude and unit", function() {
  var blurb = "200yd#run";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "run", "Passed type " + blurb);
  ok( exercise.amplitude == "200yd", "Passed type " + blurb);
});

test("test exercise name with dash and symbol", function() {
  var blurb = "#clean&jerk";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "clean&jerk", "Passed type " + blurb);

  var blurb = "#clean-jerk";
  var exercise = parseExercise(blurb);
  ok( exercise.movement == "clean-jerk", "Passed type " + blurb +  " got " + exercise.movement);
});
