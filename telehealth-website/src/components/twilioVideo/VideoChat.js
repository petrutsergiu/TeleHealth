import React, { useState, useCallback, useEffect } from 'react';
import Lobby from './Lobby';
import Room from './Room';
import { useLoggedUserState } from '../LoggedUser';

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Used when generating any kind of tokens
const twilioAccountSid = 'AC2e4c3906aa86d5d7c89ca3aaacbb459e';
const twilioApiKey = 'SKe70b32a68e3f369fdcae518a2f27c764';
const twilioApiSecret = 'dvmLH7HjjSh62s0GHu8bgnmrmenRogLp';

const VideoChat = (props) => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);
  const { user, setUser } = useLoggedUserState();
  console.log(props.location);
  const { doctorId } = props.location.state;

  const getToken = () => {

    const identity = user.id;

    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: roomName,
    });

    // Create an access token which we will sign and return to the client,
    // containing the grant we just created
    const token = new AccessToken(
      twilioAccountSid,
      twilioApiKey,
      twilioApiSecret,
      { identity: identity }
    );
    token.addGrant(videoGrant);
    return token.toJwt();
  }

  useEffect(() => {
    if (doctorId && user.id && user.firstName) {
      setRoomName(doctorId + '_' + user.id);
      setUsername(user.firstName);
    }
  }, [doctorId, user.id, user.firstName])

  useEffect(() => {
    setToken(getToken);
  }, [roomName])

  // const handleUsernameChange = useCallback(event => {
  //   setUsername(event.target.value);
  // }, []);

  // const handleRoomNameChange = useCallback(event => {
  //   setRoomName(event.target.value);
  // }, []);



  // const handleSubmit = useCallback(
  //   async event => {
  //     event.preventDefault();
  //     setToken(getToken);
  //   },
  //   [roomName, username]
  // );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  // let render;
  // if (token) {
  //   render = (
  //     <Room roomName={roomName} token={token} handleLogout={handleLogout} />
  //   );
  // } else {
  //   render = (
  //     <Lobby
  //       username={username}
  //       roomName={roomName}
  //       handleUsernameChange={handleUsernameChange}
  //       handleRoomNameChange={handleRoomNameChange}
  //       handleSubmit={handleSubmit}
  //     />
  //   );
  // }
  console.log('tokekeeen', token);

  if (!token)
    return null;

  return (<Room roomName={roomName} token={token} handleLogout={handleLogout} />)
};

export default VideoChat;