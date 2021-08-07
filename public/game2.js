const db = firebase.firestore();
const userName = document.querySelector("#user");

const auth = firebase.auth();

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

auth.onAuthStateChanged((user) => {
  let firstName = user.displayName.split(" ")[0];
  if (user && user.photoURL) {
    userName.innerHTML =
      "Hello," +
      "  " +
      firstName +
      `<img class="photoURL" src="${user.photoURL}" alt=""/>`;
  } else {
    console.log(user.displayName.length);

    userName.innerHTML =
      "Hello," +
      "  " +
      firstName +
      `<img class="photoURL" src="logos/user.png" alt=""/>`;
  }
  startGame();
});

function arraysEqual(a, b) {
  if (a === b) return true;
  if (a == null || b == null) return false;
  if (a.length !== b.length) return false;

  for (var i = 0; i < a.length; ++i) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/* function noDuplicates(list, secondList) {
  let inputList = document.querySelector("#word-list");

  let room = db.collection("users").doc(auth.currentUser.uid);

  room.get().then((doc) => {
    console.log(`my list length`, doc.data().list_one_input.length);

    console.log(`your list two input from rooms db`, doc.data().list_one_input);

    console.log(`random list_two from db`, list);

    list_one_received = list;

    console.log(`HUH`, doc.data().list_one_received);
    console.log(`WHAT`, doc.data().list_one_received.length > 0);

    if (doc.data().list_one_received) {
      if (doc.data().list_one_received.length > 0) {
        console.log("ok");
        //set with merge overwrites the field we want
        //without merge it would override the whole document
        room.set(
          {
            list_one_received,
          },
          { merge: true }
        );

        let html = "";
        list.forEach((word) => {
          html += `<li>${word}</li>`;
        });
        inputList.innerHTML = html;
        console.log("good");

        if (arraysEqual(list, doc.data().list_one_input) == true) {
          console.log("trueeeeee");

          noDuplicates(secondList);
          secondList.forEach((word) => {
            room
              .update({
                list_one_received:
                  firebase.firestore.FieldValue.arrayUnion(word),
              })
              .then(() => {
                console.log("list two received added");
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("fetched from list_two");
          });
        } else {
          list.forEach((word) => {
            room
              .update({
                list_one_received:
                  firebase.firestore.FieldValue.arrayUnion(word),
              })
              .then(() => {
                console.log("list one received added");
              })
              .catch((err) => {
                console.log(err);
              });
            console.log("fetched from list_two");
          });
        }
      }
    } else if (!(doc.data().list_one_received.length > 0)) {
      console.log("yeah");
      //DELETE WHATS IN THE RECEIVED LIST FIRST
      //THEN ADD

      let html = "";
      list.forEach((word) => {
        html += `<li>${word}</li>`;
      });
      inputList.innerHTML = html;
      console.log("good");

      if (arraysEqual(list, doc.data().list_one_input) == true) {
        console.log("trueeeeee");

        noDuplicates(secondList);
        secondList.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list two received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      } else {
        list.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list one received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      }

      console.log(arraysEqual(list, doc.data().list_one_input));
    }
  });
} */
function noDuplicates(list, secondList) {
  let inputList = document.querySelector("#word-list");

  let room = db.collection("users").doc(auth.currentUser.uid);

  room.get().then((doc) => {
    console.log(`my list length`, doc.data().list_one_input.length);

    console.log(`your list two input from rooms db`, doc.data().list_one_input);

    console.log(`random list_two from db`, list);

    list_one_received = list;

    console.log(`HUH`, doc.data().list_one_received);
    console.log(`WHAT`, doc.data().list_one_received.length > 0);

    if (
      doc.data().list_one_received &&
      doc.data().list_one_received.length > 0
    ) {
      console.log("ok");
      //set with merge overwrites the field we want
      //without merge it would override the whole document
      room.set(
        {
          list_one_received,
        },
        { merge: true }
      );

      let html = "";
      list.forEach((word) => {
        html += `<li>${word}</li> <hr>`;
      });
      inputList.innerHTML = html;
      console.log("good");

      if (arraysEqual(list, doc.data().list_one_input) == true) {
        console.log("trueeeeee");

        noDuplicates(secondList);
        secondList.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list two received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      } else {
        list.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list one received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      }
    } else if (!(doc.data().list_one_received.length > 0)) {
      console.log("yeah");
      //DELETE WHATS IN THE RECEIVED LIST FIRST
      //THEN ADD

      let html = "";
      list.forEach((word) => {
        html += `<li>${word}</li>`;
      });
      inputList.innerHTML = html;
      console.log("good");

      if (arraysEqual(list, doc.data().list_one_input) == true) {
        console.log("trueeeeee");

        noDuplicates(secondList);
        secondList.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list two received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      } else {
        list.forEach((word) => {
          room
            .update({
              list_one_received: firebase.firestore.FieldValue.arrayUnion(word),
            })
            .then(() => {
              console.log("list one received added");
            })
            .catch((err) => {
              console.log(err);
            });
          console.log("fetched from list_two");
        });
      }

      console.log(arraysEqual(list, doc.data().list_one_input));
    }
  });
}

function getRoomCountForInput(room) {
  db.collection("rooms")
    .doc(room)
    .get()
    .then((doc) => {
      console.log(doc.data());
      let listofInp = document.querySelector("#input-list");
      let html = "";

      for (let i = 0; i < doc.data().total_count; i++) {
        html += `<li><input type="text" placeholder="enter word" class="input-cell" </input> </li>`;
      }

      html += `<a data-id="next-2"class="waves-effect waves-light btn next-2" id="${doc.id}">Continue</a>`;
      listofInp.innerHTML = html;
    });
}

function getUsers(room) {
  let inputList = document.querySelector("#user-list");
  inputList.style.display = "block";
  let html;
  //display the usernames
  //but we want to set up a listener

  room.onSnapshot((snapshot) => {
    let html = "";
    snapshot.data().users.forEach((user) => {
      //GOTTA TAKE OUT THE ZERO
      let randomInt = Math.floor(Math.random() * 19) + 1;
      console.log(randomInt);
      html += `<li class="profile-holder"> <img
      class="profilepic"
      src="logos/icons/${randomInt}.png"
      alt=""
    />${user}     </li>`;
      console.log(user);
    });
    inputList.innerHTML = html;
  });

  console.log(room);
}

document.body.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.dataset.id === "next-2") {
    let targetId = e.target.id;
    let inputList = document.querySelectorAll(".input-cell");

    console.log("here");

    let cells = [];

    let docRef = db.collection("rooms").doc(targetId);
    updateUserInputList();

    const validInputs = Array.from(inputList).filter(
      (input) => input.value !== ""
    );

    console.log(`INPUT LENGTH`, inputList.length);
    console.log(`VALID INPUT`, validInputs);

    if (validInputs.length < inputList.length) {
      console.log("need all cells");
      warningBox.style.display = "block";
      warningBox.innerHTML = "All cells must be filled before continuing";
      setTimeout(() => {
        warningBox.style.display = "none";
      }, 4000);
      return false;
    } else {
      inputList.forEach((cell) => {
        cells.push(cell.value);
        console.log(cells);
        let randomInt = Math.floor(Math.random() * 200);

        list_two = {
          [randomInt]: cells,
        };
      });

      return docRef
        .set(
          {
            list_two,
          },
          { merge: true }
        )
        .then(() => {
          window.location = "game3.html";
          inputForm.reset();
        });
    }
  }
});

function updateUserInputList() {
  let userRef = db.collection("users").doc(auth.currentUser.uid);

  let inputList = document.querySelectorAll(".input-cell");
  let completedWords = [];

  inputList.forEach((cell) => {
    if (cell.value === "") {
      console.log("must enter all cells");
      return false;
    } else {
      completedWords.push(cell.value);
    }
  });

  if (completedWords.length === inputList.length) {
    completedWords.forEach((word) => {
      userRef
        .update({
          list_two_input: firebase.firestore.FieldValue.arrayUnion(word),
        })
        .then(() => {
          console.log("User updated");
        })
        .catch((error) => {
          console.log(`Error ${error}`);
        });
    });

    userRef
      .update({
        list_two_input: completedWords,
      })
      .then(() => {
        console.log("User successfully updated!");
      })
      .catch((error) => {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
      });
  }
}

function startGame(room) {
  room = db.collection("users").doc(auth.currentUser.uid);
  let docRef = "";
  let id = "";
  let wantedList = "";
  let secondList = "";
  let myCode = "";
  var usersReference = db.collection("users");
  let user_name = "";
  let myIndex = "";
  let recipients = "";

  return db
    .runTransaction((transaction) => {
      return transaction.get(room).then((doc) => {
        myCode = doc.data().rooms_joined;
        user_name = doc.data().user_name;
        myIndex = doc.data().index;
        recipients = doc.data().recipients;
        docRef = doc.data().rooms_joined;
        id = doc.id;
      });
    })
    .then(() => {
      //get words first
      //get words from this class' list_one only
      db.collection("rooms")
        .doc(docRef)
        .get()
        .then((doc) => {
          let usersRef = db.collection("rooms").doc(docRef);
          getUsers(usersRef);
          let data = doc.data().list_one;
          let inputList = document.querySelector("#input-list");
          const propertyValues = Object.values(data);
          let randomInt = getRandomInt(0, propertyValues.length - 1);

          console.log(`property values`, propertyValues[randomInt]);

          //HAS TO BE CHANGED

          console.log(`PROP VAL 0`, propertyValues[0]);

          wantedList = propertyValues[randomInt];
          secondList = propertyValues[0];

          console.log(`wanted list`, wantedList);
        })
        .then(() => {
          noDuplicates(wantedList, secondList);
          getRoomCountForInput(docRef);
          console.log("HERE");
        })
        .then(() => {});
    });
}

document.getElementById("timer").innerHTML = 01 + ":" + 59;
startTimer();

function startTimer() {
  var presentTime = document.getElementById("timer").innerHTML;
  var timeArray = presentTime.split(/[:]+/);
  var m = timeArray[0];
  var s = checkSecond(timeArray[1] - 1);
  if (s == 59) {
    m = m - 1;
  }
  if (m == 0 && s == 0) {
    checkToSeeIfAllHasBeenEntered();
  }
  if (m < 0) {
    return;
  }

  document.getElementById("timer").innerHTML = m + ":" + s;
  setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
  if (sec < 10 && sec >= 0) {
    sec = "0" + sec;
  } // add zero in front of numbers < 10
  if (sec < 0) {
    sec = "59";
  }
  return sec;
}

function checkToSeeIfAllHasBeenEntered() {
  let inputList = document.querySelectorAll(".input-cell");
  let emptywords = [];
  inputList.forEach((word) => {
    let randomInt = Math.floor(Math.random() * 90);

    console.log(`word count`, inputList.length);
    if (word.value === "") {
      word.value = words[randomInt];
      emptywords.push(word.value);
    }

    let userRef = db.collection("users").doc(auth.currentUser.uid);

    userRef
      .update({
        list_two_input: firebase.firestore.FieldValue.arrayUnion(word.value),
      })
      .then(() => {
        window.location = "game3.html";
      });
  });
}

let words = [
  "trouble",
  "straight",
  "improve",
  "red",
  "tide",
  "dish",
  "dried",
  "police",
  "prize",
  "addition",
  "tonight",
  "quick",
  "child",
  "apartment",
  "sister",
  "could",
  "feet",
  "passage",
  "tobacco",
  "thou",
  "leg",
  "lady",
  "excellent",
  "fifth",
  "lake",
  "plural",
  "influence",
  "hurry",
  "river",
  "treated",
  "slightly",
  "else",
  "create",
  "live",
  "cool",
  "ought",
  "observe",
  "pass",
  "attack",
  "angle",
  "battle",
  "touch",
  "goes",
  "steady",
  "discussion",
  "cloth",
  "corner",
  "ordinary",
  "dozen",
  "soldier",
  "pride",
  "shells",
  "remarkable",
  "prevent",
  "nearly",
  "movie",
  "usual",
  "circle",
  "cover",
  "bottle",
  "machinery",
  "planet",
  "product",
  "nose",
  "as",
  "stopped",
  "hang",
  "time",
  "fight",
  "garden",
  "bar",
  "rapidly",
  "none",
  "question",
  "paint",
  "seven",
  "language",
  "dropped",
  "excellent",
  "porch",
  "club",
  "slip",
  "powder",
  "steam",
  "which",
  "before",
  "island",
  "deeply",
  "board",
  "notice",
  "his",
  "railroad",
  "slabs",
  "particular",
  "bee",
  "rule",
  "sheet",
  "determine",
  "afraid",
  "planned",
];
