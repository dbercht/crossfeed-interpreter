  exerciseRegex = /(e|o)?(\d+[a-z\"\']{0,3})?#(([a-zA-Z\&\+]+)(\d*)?x([\d\+]*)([a-zA-Z]{1,3}#?)?|([a-zA-Z\&]+))/;
  titleRegex = /^~([a-zA-Z0-9]+)?/;
  typeRegex = /(amrap|rft|afap|emotm|emom|(\d*(-\d+)+))/;
  timeRegex = /(((\d+)(m|min|minute|minutes|s|sec|secs|secods))|((?:\d*:)?\d*:\d{1,2}))/;
  roundsRegex = /(\d+(\+\d+)?)(rounds|r)?/;

  function buildPost(post) {
    var blurbs = post.split(' ');
    //The base post
    post = newPost();

    for (var i = 0; i < blurbs.length; i++) {
      var ex = parseExercise(blurbs[i]);
       if (ex !== null) {
        post.exercises.push(ex);// = ex;
        continue;
      }
      post = appendBlurb(blurbs[i], post);
    }
    return post;
  }


  function parseExercise(blurb){
    blurb = blurb.toLowerCase();
    var exerciseAttr = runRegex(exerciseRegex, blurb);
    if (exerciseAttr === null) {
      return null;
    }
    return buildExercise(exerciseAttr);
  }
  
  function appendBlurb(blurb, post){
    blurb = blurb.toLowerCase();
    var title = runRegex(titleRegex, blurb);
    if (title !== null) {
      post.title = setOrNull(title[1]);
      blurb.replace(titleRegex, "");
    }
    
    var type = runRegex(typeRegex, blurb);
    if (type !== null) {
      post.type = type[1];
      blurb.replace(typeRegex, "");
    }

    var time = runRegex(timeRegex, blurb);
    if (time !== null) {
      post.time = buildTime(time);
      blurb.replace(timeRegex, "");
    }

    var rounds = runRegex(roundsRegex, blurb);
    if (rounds !== null) {
      post.rounds = rounds[1];
      blurb.replace(roundsRegex, "");
    }
    return post;
  }
  
  function buildTime(time) {
      if (time[3] !== null) {
        var quantity = time[3];
        var unit = time[4];
        if (unit == "min" || unit == "m") {
          time[3] = quantity + ":00";
        }
        if (unit == "sec" || unit == "s") {
          if (quantity<10) {
            quantity = "0" + quantity;
          }
          time[3] = "00:" + quantity;
        }
      }
      return time[5] || time[3];
  }
  
  //Creating an exercise model based on array attributes  
  function buildExercise (attrs) {
    var exercise = newExercise();
    //$scope.exercise.post = setOrNull(attrs[0]);
    exercise.oddEven = setOrNull(attrs[1]);
    exercise.amplitude = setOrNull(attrs[2]);
    //exercise.movementReps = setOrNull(attrs[3]);
    exercise.movement = setOrNull(attrs[4] || attrs[8]);
    exercise.sets = setOrNull(attrs[5]);
    exercise.reps = setOrNull(attrs[6]);
    exercise.repUnit = setOrNull(attrs[7]);

    return exercise;
  }
  
  function newExercise() {
    var ex = {
      //post: "", 
      oddEven: "", 
      amplitude: "",
      //movementReps: "",
      movement: "",
      sets: "",
      reps: "",
      repUnit: ""
    };
    return ex;
  }

  function newPost() {
    var post =  {
      time: "00:00",
      rounds: 0,
      reps: 0,
      title: "",
      type: "",
      exercises : []
    };
    return post
  }
  //Helper function to set an attribute or empty if it does not exist  
  function setOrNull(attr) {
    return attr;// || "";
  }

  function runRegex(regex, string) {
    var re = new RegExp(regex);
    var m = re.exec(string);
    return m;
  } 