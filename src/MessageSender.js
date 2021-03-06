import React, { useState } from 'react';
import "./MessageSender.css";
import { Avatar } from "@material-ui/core";
import VideocamIcon from "@material-ui/icons/Videocam";
import PhotoLibraryIcon from "@material-ui/icons/PhotoLibrary";
import InsertEmotionIcon from "@material-ui/icons/InsertEmoticon";
import db from "./firebase";
import firebase from "firebase";
import {useUserContext} from "./UserContextProvider";

function MessageSender() {
    const {user} = useUserContext();
	const [input, setInput] = useState('');
	const [imageUrl, setImageUrl] = useState('');
	const PIC = "https://lh3.googleusercontent.com/-LoShyN9XEB8/AAAAAAAAAAI/AAAAAAAAAAA/AMZuucll28HSux8fLYUiUFzBJATRHStt4w/photo.jpg";
	const NAME = "tester";

const handleSubmit = (e) => {
	e.preventDefault();

	db.collection('posts').add({
		message: input,
		timestamp: firebase.firestore.FieldValue.serverTimestamp(),
		profilePic: (user.phtoURL === undefined) ? PIC : user.photoURL,
		username: (user.displayName === undefined) ? NAME : user.displayName,
		image: imageUrl
	});

	setInput("");
	setImageUrl("");
}

return (
	<div className='messageSender'>
		<div className="messageSender__top">
			<Avatar src={user.photoURL}/>
			<form>
				<input value={input}
                                    onChange={(e) => setInput(e.target.value)}
				    className="messageSender__input" 
                                    placeholder=
                                        {`whats on your mind, ${user.displayName}?`}
                                />
				<input value={imageUrl} 
                                    onChange={(e) => setImageUrl(e.target.value)}
                                    placeholder="image URL (Optional)" 
                                />
				<button onClick={handleSubmit} type="submit">
					Hidden submit	
				</button>
			</form>
		</div>

		<div className="messageSender__bottom">
			<div className="messageSender__option">
				<VideocamIcon style={{ color: "red" }} />
				<h3>Live Video</h3>
			</div>
			<div className="messageSender__option">
				<PhotoLibraryIcon style={{ color: "green" }} />
				<h3>Photo/Video</h3>
			</div>
			<div className="messageSender__option">
				<InsertEmotionIcon style={{ color: "orange" }} />
				<h3>Feeling/Activity</h3>
			</div>
		</div>
	</div>
)
}

export default MessageSender;
