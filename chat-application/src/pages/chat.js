import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../utils/APIRoutes";
import ChatContainer from "../components/ChatContainer";
import { Contacts } from "../components/Contacts";
import { Welcome } from "../components/Welcome";
import { Groups } from '../components/Groups'

export const Chats = () => {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState(undefined);
  const [currentUser, setCurrentUser] = useState(undefined);
  const [showGroup, setShowGroup] = useState(false)
  const getUser = () => {
    if (!localStorage.getItem('chat-app')) {
      navigate("/login");
    } else {
      setCurrentUser(
        JSON.parse(
          localStorage.getItem('chat-app')
        )
      );
    }
  }
  useEffect(() => {
    getUser()
  }, []);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}?id=${currentUser._id}`).then((res) => {
          console.log("all users", res.data)
          setContacts(res.data.users);
        })
      } else {
        navigate("/setAvatar");
      }
      socket.current = io(host)
      socket.current.emit('add-user', currentUser._id)

    }
  }, [currentUser]);
  const handleChatChange = (chat) => {
    console.log("currenct chat", chat)
    setCurrentChat(chat);
  };
  const handleGroups = () => {
    setShowGroup(true)
  }
  return (
    <>
      {showGroup ? <Groups /> :
        <Container>
          {!contacts.length ? <></> :
            <div className="container">
              <Contacts contacts={contacts} changeChat={handleChatChange} handleGroups={handleGroups} />
              {currentChat === undefined ? (
                <Welcome />
              ) : (
                <ChatContainer currentChat={currentChat} socket={socket} />
              )}
            </div>}
        </Container>}
    </>
  );
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
  }
`;