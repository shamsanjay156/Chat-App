import React from "react";
import styled from "styled-components";
import './groupstyle.css'

export const Groups = () => {
    return (
        <Container>
            <div className="GroupContainer">
                <input className="input" />
                <div className="buttonContainer">
                <button className="create">Create</button>
                <button className="cancel">Cancel</button>
            </div>
            </div>
           
        </Container>
    )
}
const Container = styled.div`height: 100vh;
 width: 100vw;
 display: flex;
 flex-direction: column;
 justify-content: center;
 align-item : flex-start;
 gap: 1rem;
 align-items: center;
 background-color: #131324;
 .GroupContainer{
    width: 30%;
    height:70%;
    background-color: #00000076;
    border-Radius: 10px;
    padding: 20px
 }
 `