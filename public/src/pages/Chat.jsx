import React, {useState, useEffect} from 'react';
import styled from 'styled-components' 
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { allUsersRoute } from "../utils/APIRoutes";
import Contacts from '../components/Contacts';

function Chat() {
  const navigate = useNavigate();
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [currentChat, setCurrentChat] = useState(undefined);


  useEffect(() => {
    const fetchData = async () => {
      if (!localStorage.getItem("chat-app-user")) {
        navigate("/login");
      } else {
        const user = await JSON.parse(localStorage.getItem("chat-app-user"));
        setCurrentUser(user); // Correctly set currentUser state
      }
    };
    fetchData();
  }, [navigate]);
  

  useEffect(() => {
    const fetchContacts = async () => {
      if (currentUser && currentUser.isAvatarImageSet) {
        try {
          const data = await axios.get(`${allUsersRoute}/${currentUser._id}`);
          setContacts(data.data);
        } catch (error) {
          console.error('Error fetching contacts:', error);
        }
      } else {
        navigate("/setAvatar");
      }
    };
  
    if (currentUser) {
      fetchContacts();
    }
  }, [currentUser, navigate]);
  

  const handleChatChange = (chat) => {
      setCurrentChat(chat);
  };
  return <Container>
      <div className="container">
        <Contacts contacts={contacts} currentUser={currentUser} changeChat={handleChatChange}/>
      </div>
  </Container>
  
}


const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .container {
    height: 85vh;
    width: 85vw;
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
      @media screen and (min-width: 360px) and (max-width: 480px) {
      grid-template-columns: 45% 55%;
    }
  }
`
export default Chat