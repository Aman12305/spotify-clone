import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getFirestore, doc, getDoc, getDocs, collection , onSnapshot, query,where,orderBy,limit } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-firestore.js";
import { getAuth ,signOut,onAuthStateChanged} from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";
import { getStorage,ref } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-storage.js";
import { getDatabase,onValue } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";


let masterplay = document.getElementById('masterplay');
let progressbar = document.getElementById('myprogressbar');
let currtime = document.getElementById('cur');
let fultime = document.getElementById('full');
let backward = document.getElementById('back');
let forward = document.getElementById('forward');
let repeat = document.getElementById('repeat');
let shuffle = document.getElementById('shuffle');
let songindex = 0;
let rpt = 0;
let rptk = 0;
let sfl = 0;
let volumtag = document.getElementById('myvolumclick');
let volumeprogress = document.getElementById('myvolumebar');
let leftside = document.getElementById('leftside');
let side = document.getElementById('mysidenav');
let login = document.getElementById('login');

// let rotateimg = document.getElementById('rotate');
let gifi = document.getElementById('gifi');

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

//   init firebase app
  initializeApp(firebaseConfig);

  const db = getFirestore();
  const auth = getAuth();
  const storage = getStorage();
  const colRef = collection(db, 'Music');
  const albumRef = collection(db, 'Album');
  const artistRef = ref(storage, 'Artist');
  const database = getDatabase();


let audioelement = new Audio();
let user = [];
const heading = document.getElementById('heading');
const artist = document.getElementById('artist');


let gifs = [];

// Stack class
class Stack {
  
    constructor()
    {
        this.items = [];
    }

    isEmpty()
    {
        // return true if stack is empty
        return this.items.length == 0;
    }
    
    push(element)
    {
        // push element into the items
        this.items.push(element);
    }

    pop_back()
    {
        // return top most element in the stack
        // and removes it from the stack
        // Underflow if stack is empty
        if (this.isEmpty())
            return "Underflow";
        return this.items.pop();
    }

    peek()
    {
        // return the top most element from the stack
        // but does'nt delete it.
        return this.items[this.items.length - 1];
    }
}

const logout = () => {
    signOut(auth).then(()=>{
        // console.log("logout");
        window.location.href = "./index.html";
    }).catch(err=>{
        console.log(err.message);
    })

}

export {logout};

// onAuthStateChanged(auth,(user)=>{
//     if(user)
//     {
//         const userId = user.uid;
//         // return onValue(ref(database, '/users/' + userId + '/Playlists/'), (snapshot) => {
//         // const username = (snapshot.val() && snapshot.val().username) || 'Anonymous';

//         // console.log(username);

//         // // ...
//         // });
//         console.log(user.uid);
//     }
//     else
//     {
//         console.log('no user');
//     }
// })


let gifindex=0;
function fetchgif(category)  
{
    gifindex=0;
    // https://api.giphy.com/v1/gifs/search?api_key=${process.env.API_KEY}&q=${category}&limit=1
    
    // fetch(`https://api.giphy.com/v1/gifs/trending?api_key=6fjnTIJp6tQUbj2zXy7YO3JeIS5wDsNZ&q=${category}&limit=30&rating=g&bundle=sticker_layering`)
    
    fetch(`https://g.tenor.com/v1/random?key=8DZ9S5QT3JB1&q=${category}&limit=50&media_filter=loopedmp4&content_filter=high`)
    .then(res => res.json())
    .then(data => {        
        gifs=[];
        data.results.forEach(element => {
            gifs.push(element.media[0].loopedmp4.url);
        });
        gifindex=0;
        gifi.src = gifs[gifindex];
        gifi.play();
    }).catch((error)=>{
        console.log(error.message);
    })
}


let imrpt=0;
gifi.addEventListener('ended',()=>{

    if(gifs.length===0)
    return;

    if(imrpt==1){
    gifindex++;
    imrpt=0;
    }
    else
    imrpt++;

    if(gifindex>=gifs.length){
        gifindex=0;
    }
    gifi.src = gifs[gifindex];
    gifi.play();

})

const qr = query(colRef,where('artistname','>=', "Aastha Gill"),limit(5));

onSnapshot(qr , (data) => {
    // console.log(data.docs);
    // albm.src = data[0].albumurl;
    
    data.docs.forEach(doc => {
        console.log(doc.data());
  })

})

let gifbut = document.getElementById('gif');
let mainc = document.getElementById('mainc');
let album = document.getElementById('album');

var stack = new Stack();
stack.push('M');

let pop=0;
let mainpop=0;

gifbut.addEventListener('click',()=>{

    if(stack.peek()=='M'){
        mainc.style.display = 'none';
        album.style.display = 'flex';
        stack.push('A');
    }
    else if(stack.peek()=='P')
    {
        popup.style.display = 'none';
        album.style.display = 'flex';
        stack.push('A');
    }
    else if(stack.peek()==="P1")
    {
        popup1.style.display = 'none';
        album.style.display = 'flex';
        stack.push('A');
    }
    else if(stack.peek()=='A'){
        album.style.display = 'none';
        stack.pop_back();
        gifs = [];
        gifindex=0;

        if(stack.peek()=='M'){
            mainc.style.display = 'block';
        }
        else if(stack.peek()=='P'){
            popup.style.display = 'block';
        }
        else if(stack.peek()=='P1'){
            popup1.style.display = 'block';
        }


    }
   
    if(audioelement.currentTime>0 && stack.peek()==='A')
    {
        fetchgif(user[songindex].gifcategory.gifcat);
    }
    
})



const songsdiv = document.getElementById('songsdiv');
const popup = document.getElementById('popup');
const albm = document.getElementById('albm');
const title = document.getElementById('title');
const despop = document.getElementById('despop');

const choose = (cat,cat1) => {

    const al =  query(albumRef, where("albumname", '==', cat1)); 

    albm.innerText = cat1;
    

    // topbar.style.backgroundColor = "#111";
    
    getDocs(al).then(data => {
        // console.log(data.docs);
        // albm.src = data[0].albumurl;
        
        data.docs.forEach(doc => {
            despop.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${doc.data().imgsrc})`;
            title.style.backgroundColor = `#${doc.data().color}`;
      })

    //   console.log(albumimg);


    }).catch((error)=>{
        console.log(error.message);
    });

    stack.pop_back();
    popup.style.display = 'block';
    stack.push('P');
    mainc.style.display = 'none';

    // if(audioelement.currentTime>0)
    // {
    //      masterplay.classList.remove('fa-pause-circle');
    //      masterplay.classList.add('fa-play-circle');
    // }
   

    const r = query(colRef, where(cat, '==', cat1) , limit(20)); 

    user = [];

    getDocs(r).then(data => {
        
              data.docs.forEach(doc => {
                    user.push({...doc.data(), id: doc.id});
              })
              
              let i=1;
              console.log(user);
              user.forEach(element => {
                        newdiv(i,element.songname,element.artistname,element.duration);
                        i++;
                    })

                    const nw = document.createElement('div');
                    nw.classList.add('bttm');
                    songsdiv.appendChild(nw);
                    songindex=0;
                    
                    // audioelement.src = user[songindex].songurl;
        
          })
          .catch(err => {
            console.log(err.message);
          });

}

export {choose};

const reset = document.getElementById("reset");
reset.addEventListener('click',()=>{

    let n = user.length;
    for(let i=0;i<=n;i++)
    {
        songsdiv.removeChild(songsdiv.lastChild);
    }
    stack.pop_back();
    popup.style.display = 'none';
    stack.push('M');
    mainc.style.display = 'block';

});



const played = (l) => {
        audioelement.src = user[l-1].songurl;
        audioelement.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        songindex = l-1;
        // console.log(user[l-1]);
    }

    export {played};



function newdiv(id,songname,artistname,duration){
        const newdiv = document.createElement('div');
        newdiv.classList.add('color');
        newdiv.classList.add('newdiv');
        newdiv.setAttribute('id',id);
        newdiv.setAttribute("onclick","module.played(id)");

        let du = getTime(duration);
    
        // newp.classList.add('text');
        if(artistname===undefined) artistname="";
        if(songname.length>=18)
        {
            songname=songname.substring(0,18)+"...";
        }
        // const son = document.createElement('div');
        newdiv.innerHTML = `<span class="text" style="margin: 0 10px;">${id}.</span><span class="text"  style="margin: 0 auto 0 10px;">${songname}</span><span class="text"  style="margin: 0 100px 0 auto;">${artistname}</span><span class="text"  style="margin: 0 30px 0 0;">${du}</span>`;
        // newdiv.appendChild(son);
        songsdiv.appendChild(newdiv);
        // console.log(newdiv);
    }


masterplay.addEventListener('click',()=>{
    if(audioelement.paused || audioelement.currentTime<=0)
    {
        audioelement.play();
        if(album.style.display=='flex')
        gifi.play();
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
        
    }
    else
    {
        audioelement.pause();
        if(album.style.display == 'flex')
        gifi.pause();
        masterplay.classList.remove('fa-pause-circle');
        masterplay.classList.add('fa-play-circle');
        
    }
});



forward.addEventListener('click',()=>{
    songindex++;
    if(songindex>=user.length)
    {
        songindex=0;
    }
    nexttrack();
});


backward.addEventListener('click',()=>{
    songindex--;
    if(songindex<0)
    {
        songindex=user.length-1;
    }
    nexttrack();
});

let next = 0;

function nexttrack()
{
    audioelement.src = user[songindex].songurl;
    
    audioelement.play();
    if(masterplay.classList.contains('fa-play-circle'))
    {
        masterplay.classList.remove('fa-play-circle');
        masterplay.classList.add('fa-pause-circle');
    }


    if(next==0)
    {
        fetchgif(user[songindex].gifcategory.gifcat1);
        next=1;
    }
    else
    {
        fetchgif(user[songindex].gifcategory.gifcat);
        next=0;
    }
    

}

audioelement.addEventListener('timeupdate',()=>{

    currtime.innerText = getTime(audioelement.currentTime);
    progressbar.value = (audioelement.currentTime/audioelement.duration)*100;

    if(audioelement.ended)
    {
        if(rpt==1)
        {
            if(rptk==1)
            {
                if(sfl==0)
                songindex++;
                else
                {
                    songindex = Math.floor(Math.random()*user.length);
                }
                rptk=-1;
            }
            rptk++; 
        }
        else if (rpt==0)
        {
            if(sfl==0)
            songindex++;
            else{
                songindex = Math.floor(Math.random()*user.length);
            }
        }
        
        if(songindex>user.length-1)
        {
            songindex = 0;
        }
        
        nexttrack();
    }

});


audioelement.addEventListener('loadstart',()=>{
    progressbar.value = 0;
    // console.log(audioelement.src);
    fultime.innerText = getTime(user[songindex].duration);

    let son=user[songindex].songname;

    if(user[songindex].songname.length>=15)
    {
        son  = user[songindex].songname.substring(0,15);
    }
    heading.innerText = son;

    if(user[songindex].artistname!=undefined)
    artist.innerText = user[songindex].artistname;
    else{
        artist.innerText="";
    }
});





function getTime(time) {
    return (
      ("0" + Math.floor(time / 60)).slice (-2) + ":" + ("0" + Math.floor(time % 60)).slice(-2)
    );
  }

  progressbar.addEventListener('change',()=>{
        audioelement.currentTime = (progressbar.value/100)*audioelement.duration;
  })

  volumeprogress.addEventListener('change',()=>{
    audioelement.volume = (volumeprogress.value/10);
    // vf = audioelement.volume;
    if(audioelement.volume==0)
    {
        volumtag.classList.remove('fa-volume-up');
        volumtag.classList.add('fa-volume-off');
    }
    else{
        volumtag.classList.remove('fa-volume-off');
        volumtag.classList.add('fa-volume-up');
    }
  });


  shuffle.addEventListener('click',()=>{
    if(sfl != 1)
    {
        sfl=1;
        shuffle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21.548 7.837l-2.673 2.673a1 1 0 0 1-1.415-1.414L18.556 8H17.1a5.22 5.22 0 0 0-5.089 4.058A5.264 5.264 0 0 0 17.105 16h1.502l-1.147-1.147a1 1 0 0 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562a1.006 1.006 0 0 1-.437 1.008l-2.673 2.673a1 1 0 0 1-1.415-1.414L18.556 18h-1.451a7.264 7.264 0 0 1-6.114-3.34A7.22 7.22 0 0 1 4.901 18H3a1 1 0 0 1 0-2h1.901a5.22 5.22 0 0 0 5.06-3.936A5.263 5.263 0 0 0 4.836 8H3a1 1 0 1 1 0-2h1.836a7.264 7.264 0 0 1 6.143 3.387A7.22 7.22 0 0 1 17.1 6h1.508L17.46 4.853a1 1 0 1 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562a1.006 1.006 0 0 1-.437 1.008z" fill="white"/></svg>`
    }
    else
    {
        sfl=0;
        shuffle.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path d="M21.548 7.837l-2.673 2.673a1 1 0 0 1-1.415-1.414L18.556 8H17.1a5.22 5.22 0 0 0-5.089 4.058A5.264 5.264 0 0 0 17.105 16h1.502l-1.147-1.147a1 1 0 0 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562a1.006 1.006 0 0 1-.437 1.008l-2.673 2.673a1 1 0 0 1-1.415-1.414L18.556 18h-1.451a7.264 7.264 0 0 1-6.114-3.34A7.22 7.22 0 0 1 4.901 18H3a1 1 0 0 1 0-2h1.901a5.22 5.22 0 0 0 5.06-3.936A5.263 5.263 0 0 0 4.836 8H3a1 1 0 1 1 0-2h1.836a7.264 7.264 0 0 1 6.143 3.387A7.22 7.22 0 0 1 17.1 6h1.508L17.46 4.853a1 1 0 1 1 1.415-1.414l2.828 2.828a.996.996 0 0 1 .282.562a1.006 1.006 0 0 1-.437 1.008z" fill="#c1c1c1"/></svg>`
    }
});

repeat.addEventListener('click',()=> {
    rpt++;
    if(rpt>2)
    {
        rpt=0;
        repeat.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.2em" height="1.2em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16"><g fill="none"><path d="M2.784 2.088l.07.058l11 11a.5.5 0 0 1-.638.765l-.07-.058l-2.016-2.015a3.989 3.989 0 0 1-.896.155L10 12l-3.293-.001l1.148 1.149a.5.5 0 0 1 .058.638l-.058.069a.5.5 0 0 1-.638.058l-.069-.058l-2.002-2.002a.5.5 0 0 1-.057-.638l.057-.069l2.002-2.002a.5.5 0 0 1 .765.638l-.058.07l-1.148 1.147H10c.094 0 .187-.004.279-.012L4.626 5.332a3 3 0 0 0-.765 4.772a.5.5 0 0 1-.714.698a3.997 3.997 0 0 1 .746-6.203L2.146 2.853a.5.5 0 0 1 .638-.765zm9.716 2.96c.123 0 .235.045.322.118l.072.072A3.987 3.987 0 0 1 14 8a3.987 3.987 0 0 1-1.12 2.775l-.706-.708A2.99 2.99 0 0 0 13 8a2.99 2.99 0 0 0-.866-2.109a.5.5 0 0 1 .366-.843zM8.146 2.145a.5.5 0 0 1 .638-.057l.07.057l2.001 2.002l.058.07a.5.5 0 0 1 0 .568l-.058.07L8.907 6.8L8.2 6.093l1.094-1.094H7.105l-1-1h3.189L8.146 2.852l-.057-.07a.5.5 0 0 1 .057-.638z" fill="#c1c1c1"/></g></svg>`
    }
    
    else if(rpt===2)
    {
        repeat.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><g fill-rule="evenodd"><path d="M109.533 197.602a1.887 1.887 0 0 1-.034 2.76l-7.583 7.066a4.095 4.095 0 0 1-5.714-.152l-32.918-34.095c-1.537-1.592-1.54-4.162-.002-5.746l33.1-34.092c1.536-1.581 4.11-1.658 5.74-.18l7.655 6.94c.82.743.833 1.952.02 2.708l-21.11 19.659s53.036.129 71.708.064c18.672-.064 33.437-16.973 33.437-34.7c0-7.214-5.578-17.64-5.578-17.64c-.498-.99-.273-2.444.483-3.229l8.61-8.94c.764-.794 1.772-.632 2.242.364c0 0 9.212 18.651 9.212 28.562c0 28.035-21.765 50.882-48.533 50.882c-26.769 0-70.921.201-70.921.201l20.186 19.568z" fill="#c1c1c1"/><path d="M144.398 58.435a1.887 1.887 0 0 1 .034-2.76l7.583-7.066a4.095 4.095 0 0 1 5.714.152l32.918 34.095c1.537 1.592 1.54 4.162.002 5.746l-33.1 34.092c-1.536 1.581-4.11 1.658-5.74.18l-7.656-6.94c-.819-.743-.832-1.952-.02-2.708l21.111-19.659s-53.036-.129-71.708-.064c-18.672.064-33.437 16.973-33.437 34.7c0 7.214 5.578 17.64 5.578 17.64c.498.99.273 2.444-.483 3.229l-8.61 8.94c-.764.794-1.772.632-2.242-.364c0 0-9.212-18.65-9.212-28.562c0-28.035 21.765-50.882 48.533-50.882c26.769 0 70.921-.201 70.921-.201l-20.186-19.568z" fill="#c1c1c1"/></g></svg>`
    }
    else{

        repeat.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="1.5em" height="1.5em" preserveAspectRatio="xMidYMid meet" viewBox="0 0 256 256"><g fill-rule="evenodd"><path d="M109.533 197.602a1.887 1.887 0 0 1-.034 2.76l-7.583 7.066a4.095 4.095 0 0 1-5.714-.152l-32.918-34.095c-1.537-1.592-1.54-4.162-.002-5.746l33.1-34.092c1.536-1.581 4.11-1.658 5.74-.18l7.655 6.94c.82.743.833 1.952.02 2.708l-21.11 19.659s53.036.129 71.708.064c18.672-.064 33.437-16.973 33.437-34.7c0-7.214-5.578-17.64-5.578-17.64c-.498-.99-.273-2.444.483-3.229l8.61-8.94c.764-.794 1.772-.632 2.242.364c0 0 9.212 18.651 9.212 28.562c0 28.035-21.765 50.882-48.533 50.882c-26.769 0-70.921.201-70.921.201l20.186 19.568z" fill="#c1c1c1"/><path d="M144.398 58.435a1.887 1.887 0 0 1 .034-2.76l7.583-7.066a4.095 4.095 0 0 1 5.714.152l32.918 34.095c1.537 1.592 1.54 4.162.002 5.746l-33.1 34.092c-1.536 1.581-4.11 1.658-5.74.18l-7.656-6.94c-.819-.743-.832-1.952-.02-2.708l21.111-19.659s-53.036-.129-71.708-.064c-18.672.064-33.437 16.973-33.437 34.7c0 7.214 5.578 17.64 5.578 17.64c.498.99.273 2.444-.483 3.229l-8.61 8.94c-.764.794-1.772.632-2.242-.364c0 0-9.212-18.65-9.212-28.562c0-28.035 21.765-50.882 48.533-50.882c26.769 0 70.921-.201 70.921-.201l-20.186-19.568z" fill="#c1c1c1"/><path d="M127.992 104.543l6.53.146c1.105.025 2.013.945 2.027 2.037l.398 30.313a1.97 1.97 0 0 0 2.032 1.94l4.104-.103a1.951 1.951 0 0 1 2.01 1.958l.01 4.838a2.015 2.015 0 0 1-1.99 2.024l-21.14.147a1.982 1.982 0 0 1-1.994-1.983l-.002-4.71c0-1.103.897-1.997 1.996-1.997h4.254a2.018 2.018 0 0 0 2.016-1.994l.169-16.966l-6.047 5.912l-6.118-7.501l11.745-14.061z" stroke="#c1c1c1" fill="#c1c1c1"/></g></svg>`
    }
});



/*                                   PLAYER FUNCTION  START                         */

//this is for what we have to do when we click volume icon in dom
let vf=0;
volumtag.addEventListener('click',()=>{
    if(vf===0)
    {
        audioelement.volume=0;
        volumeprogress.value = 0;
        volumtag.classList.remove('fa-volume-up');
        volumtag.classList.add('fa-volume-off');
        vf++;
    }
    else{
        audioelement.volume = 1;
        volumeprogress.value = 1;
        volumtag.classList.remove('fa-volume-off');
        volumtag.classList.add('fa-volume-up');
        vf=0;
        
    }
});

let k = 0;

    leftside.addEventListener('click',()=>{

        if(k!=0){
            side.style.left="-260px";
            leftside.style.left = 0;
            leftside.innerHTML = `<i class="fas fa-chevron-right"></i>`;
            k=0;
        }
        else
        {
            side.style.left="0";
            leftside.style.left = "240px";
            leftside.innerHTML = `<i class="fas fa-chevron-left"></i>`
            k=1;
    
        }
    
    });

// forward.addEventListener('ondblclick',()=>{
//     audioelement.currentTime += 10;

//     if(audioelement.currentTime >= audioelement.duration)
//     {
//         songindex++;
//         if(songindex > songs.length-1)
//         {
//             songindex = 0;
//         }
//         nexttrack();
//     }
// });

// backward.addEventListener('ondblclick',()=>{
//     audioelement.currentTime -= 10;

//     if(audioelement.currentTime <= 0)
//     {
//         audioelement.currentTime = 0;
//     }
// });





/*                      PLAYER FUNCTION ENDED        */ 




//for login button
const logn = document.getElementById("logn");
let lo = 0;
login.addEventListener('click',()=>{

        if(lo===0)
        {
            logn.style.display="block";
            lo=1;
        }
        else
        {
            logn.style.display="none";
            lo=0;
        }
    
});

//for search button
const search = document.getElementById('searchbut');
const Div = document.getElementById("Search");
let se=0;
search.addEventListener('click',()=>{
    
    if(se===0)
    {
        Div.style.display="flex";
        se=1;
    }
    else
    {
        Div.style.display="none";
        se=0;
    }

});



// function searchsngdiv(i,songname,artistname)
// {
//     const newdiv = document.createElement('div');
//     newdiv.setAttribute('id',i);
//     newdiv.setAttribute("onclick","module.choose1(id)");

//     if(songname.length>=15)
//     {
//         songname = songname.substring(0,15)+"...";
//     }

//     newdiv.classList.add('searchsong');
//     newdiv.innerHTML = `<h2 style="margin:0 4px;">${songname}</h2><br><p style="margin:0 4px;">${artistname}</p>`;
//     searchview.appendChild(newdiv);
// }

const searchicon = document.getElementById('searchicon');
const searchview = document.getElementById('searchview');



searchicon.addEventListener('click',()=>{

    searchsng();

});

function searchsng(){
    if(searchtext.value.length===0)
    {
        alert("Please enter a song name/artist name");
        return;
    }
    searchview.style.display = "none";
    choose1("artistname",searchtext.value);
}




const searchtext = document.getElementById('searchtext');
const Search = document.getElementById('Search');

const popup1 = document.getElementById('popup1');
const albm1 = document.getElementById('albm1');
const despop1 = document.getElementById('despop1');
const title1 = document.getElementById('title1');
const artist1 = document.getElementById('artist1');
const songsdiv1 = document.getElementById('songsdiv1');
const reset1 = document.getElementById('reset1');
const albm2 = document.getElementById('albm2');


function newdiv1(id,songname,artistname,duration){
    const newdiv = document.createElement('div');
    newdiv.classList.add('color');
    newdiv.classList.add('newdiv');
    newdiv.setAttribute('id',id);
    newdiv.setAttribute("onclick","module.played(id)");

    let du = getTime(duration);

    // newp.classList.add('text');
    if(artistname===undefined) artistname="";
    if(songname.length>=18)
    {
        songname=songname.substring(0,18)+"...";
    }
    // const son = document.createElement('div');
    newdiv.innerHTML = `<span class="text" style="margin: 0 10px;">${id}.</span><span class="text"  style="margin: 0 auto 0 10px;">${songname}</span><span class="text"  style="margin: 0 100px 0 auto;">${artistname}</span><span class="text"  style="margin: 0 30px 0 0;">${du}</span>`;
    // newdiv.appendChild(son);
    songsdiv1.appendChild(newdiv);
    // console.log(newdiv);
}



function choose1(cat,cat1){

    const al =  query(albumRef, where("albumname", '==', cat1)); 

    

    albm1.innerText = cat1;
    
    if(stack.peek()==='A')
    {
        album.style.display = 'none';
    }
    else if(stack.peek()==='P')
    {
        popup.style.display = 'none';
    }
    else if(stack.peek()==='M')
    {
        mainc.style.display = 'none';
    }
    else if(stack.peek()==='P1'){
        
        let n = songsdiv1.childNodes.length;

        for(let i=0;i<n;i++){
            songsdiv1.removeChild(songsdiv1.lastChild);
        }
    }

    popup1.style.display = 'block';
    stack.push('P1');
    console.log(stack.peek());



    getDocs(al).then(data => {   
        
            data.docs.forEach(doc => {
                despop1.style.backgroundImage = `linear-gradient(rgb(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),url(${doc.data().imgsrc})`;
                title1.style.backgroundColor = `#${doc.data().color}`;
            })
       
    }).catch((error)=>{
        console.log(error.message);
    });

    const r = query(colRef, where(cat, '==', cat1) , limit(20)); 

    user = [];

    getDocs(r).then(data => {

              data.docs.forEach(doc => {
                    user.push({...doc.data(), id: doc.id});
              })
              
              let i=1;
              user.forEach(element => {
                        newdiv1(i,element.songname,element.artistname,element.duration);
                        i++;
                    })

                    const nw = document.createElement('div');
                    nw.classList.add('bttm');
                    songsdiv.appendChild(nw);
                    songindex=0;
                    
        
          })
          .catch(err => {
            console.log(err.message);
            alert("No songs found");
          });


    
}


reset1.addEventListener('click',()=>{

    let n = songsdiv1.childNodes;
    for(let i=0;i<=n;i++)
    {
        songsdiv1.removeChild(songsdiv1.lastChild);
    }
    stack.pop_back();
    popup1.style.display = 'none';
    stack.push('M');
    mainc.style.display = 'block';

});


searchtext.onkeyup = (e)=>{
    
    let searchvalue = e.target.value;

    if(e.keyCode === 13){
        searchsng();
        return;
    }

    let emptyarray = [];

    if(searchvalue){
        emptyarray = suggestion.filter((data)=>{
            //here this below function is used to the array and user entered value which startswith the value
            return data.toLocaleLowerCase().includes(searchvalue.toLocaleLowerCase());
        });

        let i=-1;
        // let n = emptyarray.length;

        // emptyarray.forEach((data)=>{
        //     emptyarray[i] = `<li id="${i}" onclick="outputclicked(id)">${data}</li>`;
        //     i++;
        // })

        emptyarray = emptyarray.map((data)=>{
            i++;
            if(i>10)
            return;
            return data = `<li id="${i}" onclick="module.outputclicked(id)">${data}</li>`;
        })
    }
    else{

    }

    showsuggestion(emptyarray);

}

function showsuggestion(list){

    let listdata;
    if(!list.length){
        searchview.style.display = "none";
    }
    else
    {
        searchview.style.display = "block";
        listdata = list.join('');
    }

    searchview.innerHTML = listdata;
}

const outputclicked = (id)=>{

    searchtext.value = document.getElementById(id).innerText;
    searchview.style.display = "none";
    searchsng();

}

export {outputclicked};

