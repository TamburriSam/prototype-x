const db = firebase.firestore();
const userName = document.querySelector('#userNameContainer')

const auth = firebase.auth();

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


auth.onAuthStateChanged((user) => {

    if(user){
      console.log(user.email)
      userName.innerHTML = `Hello ` + user.displayName
      startGame()
    }
})

function startGame(room){
  room = db.collection('users').doc(auth.currentUser.uid)
  let docRef = ''
  let id=''
  let wantedList=''
  let myCode = ''
  var usersReference = db.collection("users");
  let user_name = '';
  let myIndex = ''
  let recipients = ''

  return db.runTransaction((transaction) => {
    return transaction.get(room).then((doc) => {
      myCode = doc.data().rooms_joined
      user_name = doc.data().user_name
      myIndex = doc.data().index
      recipients = doc.data().recipients

      console.log(`REC`,doc.data().recipients[0])

      docRef = doc.data().rooms_joined
      id = doc.id



    })
    }).then(() => {
        //get words first
        //get words from this class' list_one only


        db.collection('rooms').doc(docRef).get().then((doc) => {



          let usersRef = db.collection('rooms').doc(docRef)
          getUsers(usersRef)
            let data = doc.data().list_three
              let inputList = document.querySelector('#word-list3')
            const propertyValues = Object.values(data);
            let randomInt = getRandomInt(0, propertyValues.length-1)


            console.log(`property values`, propertyValues[randomInt])


            console.log(`random int`,randomInt)

            //why cant this be the second list??? 
            //its better bc its recursive so itll keep calling it 
            //ugh
            //like properttyvalue[randomINt] as the second list 


            //HAS TO BE CHANGED

             wantedList = propertyValues[randomInt]

         

            console.log(`wanted list`,wantedList)


       
    
        }).then(() => {
          let yourRoomList = []
          let secondList = [];

          console.log('HERE')
db.collection('users').get().then((querySnapshot) => {
           querySnapshot.forEach((doc) => {
            if(doc.data().rooms_joined === myCode && doc.data().user_name !== user_name){
              yourRoomList.push(doc.data())
              
            } 
           })

           
           console.log(`ROOM LIST`,yourRoomList[recipients[3]])
           console.log(`THE THING YOU WANT`, yourRoomList[0].list_three_input)
           console.log('I DONT GET IT', yourRoomList)

  noDuplicates(wantedList, yourRoomList[2].list_three_input)
  getReceivedListOne()
  getReceivedListTwo()
 getRoomCountForInput(docRef) 

          })
        }).then(() => {
        })
      })
}





  function getUsers(room) {
    let inputList = document.querySelector("#user-list");
     let html;
     console.log("HAR");
     //display the usernames
     //but we want to set up a listener
   
     room.onSnapshot((snapshot) => {
       //IF THERE IS NOW A LISTENER HERE FOR USERS
       //CAN WE SET UP A LISTETNER FOR THE COUNT AS WELL
       //ANOTHER PARAMETER FOR THE DOCREF WITH A TWEAK FOR USERS FIELD INSTEAD
       let html = "";
       snapshot.data().users.forEach((user) => {
         html += `<li> ${user} </li>`;
         console.log(user);
       });
       inputList.innerHTML = html;
     }); 
 
     console.log(room)
   }  

  function getReceivedListOne(){
    let wordList2 = document.querySelector('#word-list')
  let userRef = db.collection('users').doc(auth.currentUser.uid)
  userRef.get().then((doc) => {
let list_one_received = doc.data().list_one_received
let html = ''
list_one_received.forEach((word) => {
html += `<li>${word}</li>`
})
wordList2.innerHTML = html
  }).catch((err) => {
    console.log(err)
  })
}

function getReceivedListTwo(){
    let wordList2 = document.querySelector('#word-list2')
    let userRef = db.collection('users').doc(auth.currentUser.uid)
    userRef.get().then((doc) => {
  let list_two_received = doc.data().list_two_received
  let html = ''
  list_two_received.forEach((word) => {
  html += `<li>${word}</li>`
  })
  wordList2.innerHTML = html
    })
}

function getRoomCountForInput(room){
    db.collection('rooms').doc(room).get().then((doc) => {
        console.log(doc.data())
        let listofInp = document.querySelector("#input-list");
        let html = "";
    
        for (let i = 0; i < doc.data().total_count; i++) {
          html += `<li><input type="text" placeholder="enter word" class="word-cell" </input> </li>`;
        }

        html += `<button data-id="next-4"class="next-4"id='${doc.id}'>Next</button>`;
        listofInp.innerHTML = html;
    })
  }

  function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
  
    for (var i = 0; i < a.length; ++i) {
      if (a[i] !== b[i]) return false;
    }
    return true;
  }
  

  function noDuplicates(list, secondList){
    let inputList = document.querySelector('#word-list3')
  
  
    let room = db.collection('users').doc(auth.currentUser.uid)
  
    room.get().then((doc) => {
      console.log(`general list length`, list.length)
      console.log(`my list length`, doc.data().list_three_input.length)
  
  
      console.log(`your list two input from rooms db`,doc.data().list_three_input)
  
      console.log(`random list_two from db`,list)
  
  
  
      let html = ''
                list.forEach((word) => {
                  html += `<li>${word}</li>`
                })
                inputList.innerHTML = html  
                console.log('good')
  
                if(arraysEqual(list, doc.data().list_three_input) == true){
                  console.log('trueeeeee')
  
                  noDuplicates(secondList)
                  secondList.forEach((word) => {
                    room.update({
                        list_three_received: firebase.firestore.FieldValue.arrayUnion(word)
                    }).then(() => {
                        console.log('list 3 received added')
                    }).catch((err) => {
                        console.log(err)
                    }) 
                    console.log('fetched from 3')
                }) 
                }else{
                  list.forEach((word) => {
                    room.update({
                        list_three_received: firebase.firestore.FieldValue.arrayUnion(word)
                    }).then(() => {
                        console.log('list 3 received added')
                    }).catch((err) => {
                        console.log(err)
                    }) 
                    console.log('fetched from list_three')
                }) 
                }
  
                console.log(arraysEqual(list, doc.data().list_three_input))
    })
  }
  

  document.body.addEventListener('click', function(e){
    e.preventDefault()
    if(e.target.dataset.id === 'next-4'){
        let targetId = e.target.id
        let inputList = document.querySelectorAll('.word-cell')

        console.log('here')

        let cells = [];

      let docRef = db.collection('rooms').doc(targetId)
      updateUserInputList()
   
      const validInputs = Array.from(inputList).filter( input => input.value !== "");

      console.log(`INPUT LENGTH`, inputList.length)
      console.log(`VALID INPUT`,validInputs)

      if(validInputs.length < inputList.length){
        let list_four = {}
        console.log('need all cells')
          warningBox.innerHTML = 'Need All Cells'
          return false
      }else{
        //here is the problem
        //the return was getting included in the for each
        inputList.forEach((cell) => {
          cells.push(cell.value)
          console.log(cells)
          let randomInt = Math.floor(Math.random() * 200);
  
           list_four = {
              [randomInt]: cells
          }
        })
        
      return docRef.set({
        list_four
    }, {merge: true}).then(() => {
          window.location='finalPage.html'
          inputForm.reset()
    })
      }    


    }
})


function updateUserInputList(){
  let userRef = db.collection('users').doc(auth.currentUser.uid)

  let inputList = document.querySelectorAll('.word-cell')
  inputList.forEach((cell) => {
    if(cell.value === ''){
      console.log('must enter all cells')
      return false
    }else{



      userRef.update({
          list_four_input: firebase.firestore.FieldValue.arrayUnion(cell.value)
      }).then(() => {
          console.log("User successfully updated!");
      })
      .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
      });
    }
  })

}



window.onbeforeunload = function() {
  return "Data will be lost if you leave the page, are you sure?";
};