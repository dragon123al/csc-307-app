// src/MyApp.jsx
import React, { useState, useEffect } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
 const [characters, setCharacters] = useState([]);

 function deleteUsers(userID) {
  const promise = fetch("Http://localhost:8000/users/" + userID, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
    });  
    return promise;
  }

  function removeOneCharacter(index) {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => {
        const userID = json["users_list"][index]._id
        deleteUsers(userID)
        .then(() => {
          const updated = characters.filter((character, i) => {
            return i !== index;
          });
          setCharacters(updated);
        })
        .catch((error) => {
          console.log(error);
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function updateList(person) {
    postUser(person)
      .then((res) => {
        return res.json(); 
      })
      .then((data) => {
        const usersList = data.users_list; 
        const lastUser = usersList[usersList.length - 1]; 

        setCharacters([...characters, lastUser]);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchUsers() {
    const promise = fetch("http://localhost:8000/users");
    return promise;
  }

  useEffect(() => {
    fetchUsers()
      .then((res) => res.json())
      .then((json) => setCharacters(json["users_list"]))
      .catch((error) => {
        console.log(error);
      });
  }, []);

  function postUser(person) {
    const { name, job } = person;    
    const userToPost = {
      name: name,
      job: job
    };

    const promise = fetch("Http://localhost:8000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userToPost)
    });
    return promise;
  }

  return (
    <div className="container">
      <Table
        characterData={characters}
        removeCharacter={removeOneCharacter}
      />
      <Form handleSubmit={updateList} />
    </div>
  );
}

export default MyApp;