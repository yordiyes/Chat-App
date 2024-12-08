import React from 'react'
import styled from 'styled-components'
import Logout from './Logout';
import ChatInput from './ChatInput';
import { sendMassageRoute } from '../utils/APIRoutes';
// import Messages from './Messages';
import axios from 'axios';

export default function ChatContainer({currentChat, currentUser}) {
  if(!currentChat){
    return <div>Chat loading ... </div>
  }

  const handleSendMsg = async (msg) => {
    await axios.post(sendMassageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: { text: msg }  // Wrap `msg` inside an object with a `text` field
    });
  
  }
  return <Container>
    <div className="chat-header">
      <div className="user-details">
        <div className="avatar">
        <img
          src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
          alt="avatar"
        />
        </div>
        <div className="username">
          <h3>{currentChat.username}</h3>
        </div>
      </div>
      <Logout/>
    </div>
    {/* <Messages/> */}
    <ChatInput handleSendMsg={handleSendMsg}/>
  </Container>
}

const Container = styled.div`
  padding-top: 1rem;
  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;
    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      .avatar {
        img {
          height: 3rem;
        }
      }
      .username {
        h3 {
          color: white;
        }
      }
    }
  }
`;