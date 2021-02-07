import React, { useState, useCallback } from 'react';
import Lobby from './Lobby';
import Room from './Room';

const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

// Used when generating any kind of tokens
const twilioAccountSid = 'AC2e4c3906aa86d5d7c89ca3aaacbb459e';
const twilioApiKey = 'SKe70b32a68e3f369fdcae518a2f27c764';
const twilioApiSecret = 'dvmLH7HjjSh62s0GHu8bgnmrmenRogLp';

const VideoChat = () => {
  const [username, setUsername] = useState('');
  const [roomName, setRoomName] = useState('');
  const [token, setToken] = useState(null);

  const handleUsernameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const getToken = () => {

    const identity = 'user';

    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: 'cool room',
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

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();
      setToken(getToken);
    },
    [roomName, username]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  let render;
  if (token) {
    render = (
      <Room roomName={roomName} token={token} handleLogout={handleLogout} />
    );
  } else {
    render = (
      <Lobby
        username={username}
        roomName={roomName}
        handleUsernameChange={handleUsernameChange}
        handleRoomNameChange={handleRoomNameChange}
        handleSubmit={handleSubmit}
      />
    );
  }
  return render;
};

export default VideoChat;