import React, { useState } from "react";
import { Link,useNavigate } from "react-router-dom";

function AddNote() {

  const navigate =  useNavigate();

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted,setSubmitted] = useState(false);

  const addNote = async (e) => {
    
    e.preventDefault();
    
    try {
        const response = await fetch(baseUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({
                title,
                description
            }),
        })
    } catch (error) {
        console.log(error);   
    }

    setSubmitted(true);
    setTitle("");
    setDescription("");
    navigate('/');

  };

  return (
    <div>
      <Link style={{cursor: 'pointer'}} to="/" className="back-button">
      👈
      </Link>

      <form onSubmit={addNote}>
        <div className="single-note">
           {/*Title input  */}
          <div>
            <input
              typeof="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>

          {/* Description input */}
            <div>
                <textarea 
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                placeholder="Description"
                rows="4"
                cols="50"
                className="description"
                ></textarea>
            </div>

        </div>

        <input style={{cursor: 'pointer'}} type="submit" />

        <p>{submitted && <div className="success-message">Note has been added</div>}</p>
      </form>
    </div>
  );
}

export default AddNote;
