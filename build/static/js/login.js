
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import {  getFirestore,onSnapshot,
    collection,query,where,
    getDocs,orderBy,
    addDoc,serverTimestamp,deleteDoc,updateDoc } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth,onAuthStateChanged,
    createUserWithEmailAndPassword,sendPasswordResetEmail,
    signOut,signInWithEmailAndPassword,sendEmailVerification} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getStorage,ref,getMetadata,listAll,list, getDownloadURL  } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
// import { getDatabase,onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
 
const firebaseConfig = {
    apiKey: "AIzaSyAk0N0MBNyOvMy9mcWx9PBn25FZFY_hWj4",
    databaseURL: "https://musix-c3842-default-rtdb.asia-southeast1.firebasedatabase.app",
    authDomain: "musix-c3842.firebaseapp.com",
    projectId: "musix-c3842",
    storageBucket: "musix-c3842.appspot.com",
    messagingSenderId: "435576250386",
    appId: "1:435576250386:web:44ed9e78f1bbaa7ef478cb"
  };

//   var jsmediatags = require("jsmediatags");
//   var jsmediatags = window.jsmediatags;

  //init firebase app
  initializeApp(firebaseConfig);

  // init services
  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  const artistRef = ref(storage, 'Artist');

  //collection ref

  const colRef = collection(db, 'Music');

 


  //get collection data

//   getDocs(colRef).then(data => {
      
//       let user = [];

//       data.docs.forEach(doc => {
//             user.push({...doc.data(), id: doc.id});
//       })

//       console.log(user);

//   })
//   .catch(err => {
//     console.log(err.message);
//   });


const q = query(colRef, where('category', '==', 'Top Hits Hindi'));




//real time data collection

// onSnapshot(colRef,(data)=>{
//     let user = [];
//     // user = [];

//     data.docs.forEach(doc => {
//         // deleteDoc(colRef,doc.id);
    
//             user.push({...doc.data(), id: doc.id});
//     })

//     console.log(user);

// })

let signform = document.getElementById('signform');
let signup = document.getElementById('signup');
let loginform = document.getElementById('loginform');
let forgot = document.getElementById('forgot');
let logform = document.querySelector('.hidd');
let forgotform = document.getElementById('forgotform');



//forgot password


forgot.addEventListener('click',()=>{
    loginform.style.display = 'none';
    forgotform.style.display = 'block';
});

forgotform.addEventListener('submit',(e)=>{
    e.preventDefault();
    let email = forgotform.email.value;
    sendPasswordResetEmail(auth, email).then(()=>{
        alert('Password reset email sent');
        forgotform.style.display = 'none';
        loginform.style.display = 'block';
    }).catch(err=>{
        alert(err.message);
    })

});


signup.addEventListener('click',()=>{

        logform.style.display = 'none';
        signform.style.display = 'block';
})


onAuthStateChanged(auth,(user)=>{
    if(user)
    {
        console.log(user.email,user.uid);
    }
    else
    {
        console.log('no user');
    }
})


loginform.addEventListener('submit',(e)=>{

    e.preventDefault();

    const email = loginform.email.value;
    const pass = loginform.password.value;

    signInWithEmailAndPassword(auth, email, pass)
    .then(cred => {
        loginform.reset();
        console.log(cred.user.email);

        // if(cred.user.emailVerified)
        window.location.href = './player.html';
    })
    .catch(err => {
        // console.log(err.message);
        loginform.reset();
        alert(`${err.message}`);
        
    })

});

// console.log(signform);

// signform.addEventListener('submit',(e)=>{

//     e.preventDefault();

//     const email = signform.username.value;
//     const password = signform.password.value;

//     createUserWithEmailAndPassword(auth,email,password,)
//     .then(cred => {
//         alert(` Welcome to Spotify You have to login to continue`);
//         //  //send verification email
//         // sendEmailVerification(auth.currentUser)
//         // .then(() => {
//         //     console.log('email sent'); 
//         // });
//         signform.reset();
//         signform.style.display = 'none';
//         logform.style.display = 'block';
//     })
// })
// .catch(err => {
//     alert(`${err.message}`);
//     signform.reset();
// });



  
// list(artistRef).then(snap => 
//     {
//         console.log(snap);
//     }
//     ).catch(err => {
//         console.log(err.message);
//     });


// Create a reference under which you want to list
// const listRef = ref(storage, 'Artist/Sonu Nigam');

// console.log(listRef);

// Find all the prefixes and items.
// listAll(listRef)
//   .then((res) => {
//       console.log(res);
//     let i=0;
//     res.items.forEach((itemRef) => {
//         // console.log(itemRef.name);
    

//         getDownloadURL(itemRef).then(url => {
        
//             // console.log(url);

//             var au = new Audio();
//             au.src = url;
//             au.src = url;
//             // console.log(`this is link for ${itemRef.name} and song url is ${url}`);
//             au.addEventListener('loadedmetadata' , ()=>
//             {
//                 let duration  = (au.duration).toString(10);

//                 // console.log(duration);
//                 let str = itemRef.name;
//                 let leng = str.length;
//                 str = str.slice(-leng, -4);
            
//                     let cat,cat1,gifcat,gifcat1;
//                     if(i%2)
//                     {
//                         cat = "Sonu Nigam Hits";
//                         if(i%4)
//                         {
//                             cat1 = "Stolen Heart";
//                         }
//                         else
//                         {
//                             cat1 = "Mix";
//                         }
//                         gifcat="stolen Heart";
//                         gifcat1="emotional";
//                     }
//                     else
//                     {
//                         cat = "Romantic Hits";
                        
//                         if(i%3)
//                         {
//                             cat1 = "Daily Mix";
//                         }
//                         else
//                         {
//                             cat1 = "Bollywood";
//                         }   

//                         gifcat="Happy"; 
//                         gifcat1="Heart";
                
//                     }
//                     i++;

//                 // console.log(`${str} and song url is ${url} and duration is ${duration} and category is ${cat} and subcategory is ${cat1}`);
//                 addDoc(colRef,({
//                     songname:str,
//                     songurl:url,
//                     duration:duration,
//                     category:cat,
//                     subcategory:cat1,
//                     artistname:'Sonu Nigam',
//                     gifcategory:{
//                         gifcat,
//                         gifcat1
//                     }
//                 }))
//                 .then((console.log("sucess")))
//                 .catch(err => {
//                     console.log(err.message);
//                 })

                
//             }).catch(err => {
//                 console.log(err.message);
//             });
//         });
//     });
//   }).catch((error) => {
//     console.log(error.message);
//   });
