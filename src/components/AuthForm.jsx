//References https://www.npmjs.com/package/react-audio-player

import { useState, Fragment } from "react";
import firebase from 'firebase';
import "firebase/auth";
import "../firebase.js";
import "../App.css";
import ReactAudioPlayer from 'react-audio-player';
export default AuthForm;

const provider = firebase.auth().GoogleAuthProvider;


// const signInWithGoogle = () => {
//     firebase.auth().signInWithPopup(provider);
// };

async function signUpHandler (email, password) {
    await firebase.auth().createUserWithEmailAndPassword(email, password);
    document.getElementById('email').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('signup-button').style.display = 'none';
    document.getElementById('google-button').style.display = 'none';

    document.getElementById('welcome').innerHTML = "Welcome\n" + "" + document.getElementById('email').value;

    document.getElementById('signout-button').style.display = 'inline-block';
}

export function AuthForm() {
    return (
        <div className="container">
            <h1 id="welcome">Sign In</h1>
            <h3 id="artist"></h3>
            <h5 id="album"></h5>
            <ul id="file"></ul>
            <ReactAudioPlayer
                id = "reactAudioPlayer"
                src=""
                autoPlay
                controls
            />
            <div className="border">
                <form className="">
                    <input
                    type="text"
                    className="signin-field"
                    name="email"
                    placeholder="Email"
                    id="email"
                    />
                    <br></br>
                    <input
                    type="text"
                    className="signin-field"
                    name="password"
                    placeholder="Password"
                    id="password"
                    />      
                </form>
                <br></br>
                <div className="signin-signup-buttons">
                    <button id="signin-button" onClick = {() => signInHandler(document.getElementById("email").value, document.getElementById("password").value)}>
                        Sign In
                    </button>
                    <button id="signup-button" onClick = {() => signUpHandler(document.getElementById("email").value, document.getElementById("password").value)}>
                        SignUp
                    </button>
                    <button id="signout-button" onClick = {() => signOutHandler()}>Sign out</button>
                </div>
            </div>
        </div>
    );
}

function signOutHandler (){
    firebase.auth().signOut();
    document.getElementById('email').style.display = 'inline-block';
    document.getElementById('password').style.display = 'inline-block';
    document.getElementById('signin-button').style.display = 'inline-block';
    document.getElementById('signup-button').style.display = 'inline-block';
    document.getElementById('google-button').style.display = 'inline-block';
    document.getElementById('welcome').innerHTML = "Sign In";
    alert("Signed Out Successfully");
    document.getElementById('signout-button').style.display = 'none';
    document.getElementById('welcome').innerHTML = "Sign out successful!";
}

async function signInHandler (email, password) {
    await firebase.auth().signInWithEmailAndPassword(email, password);
    document.getElementById('email').style.display = 'none';
    document.getElementById('password').style.display = 'none';
    document.getElementById('signin-button').style.display = 'none';
    document.getElementById('signup-button').style.display = 'none';

    document.getElementById('welcome').innerHTML = "Welcome\n" + "" + document.getElementById('email').value;
    const Http = new XMLHttpRequest();
    const url='https://489f2xk9xd.execute-api.us-east-1.amazonaws.com/dotify';
    Http.open("GET", url);
    Http.send();

    Http.onreadystatechange = (e) => {
        if (Http.readyState == 4) {
            const obj = JSON.parse(Http.responseText);
            document.getElementById('file').style.display = 'inline-block';
            obj.forEach(function callback(item, index) {
                console.log(item);
                var song = document.createElement("LI");
                song.id = "Song: " + index;
                song.onclick = function() { setSong(item); };
                document.getElementById('file').appendChild(song);
                getSongName(item, song.id);
            });
        }
        document.getElementById('signout-button').style.display = 'inline-block';
    }

    const setSong = (address) => {
        document.getElementById('reactAudioPlayer').src = address;
    }

    const getSongName = (link, songID)  =>  {
        var path = link.split('/');
        document.getElementById(songID).innerHTML = cleanURL(path[4]) + "/" + cleanURL(path[5]).split('?')[0];
    }

    const cleanURL = (loc)  =>  {
        loc = loc.replace(/%20/g, " ");
        loc = loc.replace(/\.mp3/g, "");
        return loc;
    }
}