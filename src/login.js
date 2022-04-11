
import { initializeApp } from 'firebase/app';

import {

    getFirestore,onSnapshot,
    collection,query,where,
    getDocs,orderBy,
    addDoc,serverTimestamp,deleteDoc,updateDoc

} from 'firebase/firestore';

import {
    getAuth,onAuthStateChanged,
    createUserWithEmailAndPassword,
    signOut,signInWithEmailAndPassword

} from 'firebase/auth';

import { getStorage,ref,getMetadata,listAll,list, getDownloadURL } from "firebase/storage";
 
const firebaseConfig = {
    apiKey: "AIzaSyAk0N0MBNyOvMy9mcWx9PBn25FZFY_hWj4",
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

onSnapshot(colRef,(data)=>{
    let user = [];
    // user = [];

    data.docs.forEach(doc => {
        // deleteDoc(colRef,doc.id);
    
            user.push({...doc.data(), id: doc.id});
    })

    console.log(user);

})


let signform = document.querySelector('#signform');
let signbut = document.getElementById('signup');
let loginform = document.getElementById('loginform');
let forgot = document.getElementById('forgot');
let logform = document.querySelector('.hidd');

// signbut.addEventListener('click',()=>{

//     if(signform.style.display == 'none'){
//         logform.style.display = 'none';
//         signform.style.display = 'block';
//     }
//     console.log("click");
    
//     // forgot.style.display = 'none';
// })


console.log(signbut);


// exports.logout = () => {
//     signOut(auth).then(()=>{
//         console.log("logout");
//     }).catch(err=>{
//         console.log(err.message);
//     })
// }

// const logout = document.getElementById('logout');

// console.log(logout);

// logout.addEventListener('click',()=>{

//     signOut(auth)
//     .then(()=>{
//         console.log('logout');
//         window.location.href = '../dist/index.html';
//     })
//     .catch(err => {
//         console.log(err.message);
//     });

// });


onAuthStateChanged(auth,(user)=>{
    if(user)
    {
        console.log(user.email);
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
        console.log(cred);
        loginform.reset();
        window.location.href = '../dist/player.html';
    })
    .catch(err => {
        console.log(err.message);
    })

});

console.log(signform);

signform.addEventListener('submit',(e)=>{

    e.preventDefault();

    const email = signform.username.value;
    const password = signform.password.value;

    createUserWithEmailAndPassword(auth,email,password,)
    .then(cred => {
        console.log(cred.user);
        signform.reset();
    });
})

.catch(err => {
    console.log(err.message);
});



  
// list(artistRef).then(snap => 
//     {
//         console.log(snap);
//     }
//     ).catch(err => {
//         console.log(err.message);
//     });


// Create a reference under which you want to list
// const listRef = ref(storage, 'Artist/Top_Hits_Hindi');

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
//                         cat = "Top Hits Hindi";
//                         if(i%4)
//                         {
//                             cat1 = "Party Songs";
//                         }
//                         else
//                         {
//                             cat1 = "Mix";
//                         }
//                         gifcat="Bhangra";
//                         gifcat1="dance";
//                     }
//                     else
//                     {
//                         cat = "Top Hits Hindi";
                        
//                         if(i%3)
//                         {
//                             cat1 = "Daily Mix";
//                         }
//                         else
//                         {
//                             cat1 = "Bollywood";
//                         }   

//                         gifcat="Happy"; 
//                         gifcat1="Hip-Hop";
                
//                     }
//                     i++;

//                 // console.log(`${str} and song url is ${url} and duration is ${duration} and category is ${cat} and subcategory is ${cat1}`);
//                 addDoc(colRef,({
//                     songname:str,
//                     songurl:url,
//                     duration:duration,
//                     category:cat,
//                     subcategory:cat1,
//                     // artistname:'Raftar',
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
