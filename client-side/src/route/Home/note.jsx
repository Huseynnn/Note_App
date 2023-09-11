import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

function UpdateNote() {
  const { id } = useParams();
  const navigate = useNavigate();

  const baseUrl = `${import.meta.env.VITE_SERVER_URL}/api/notes/${id}`;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch");
          console.log("errror");
        }

        const data = await response.json();
        setTitle(data.title);
        setDescription(data.description);
        setIsLoading(false);
      } catch (error) {
        setError("Error during fetching");
        setIsLoading(false);
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });
    } catch (error) {
      console.log(error);
    }

    setSubmitted(true);
  };

  const removeNote = async(e) => {
    e.preventDefault();

    try {
        const response = await fetch(baseUrl, {
            method: "DELETE"
        })

        if(response.ok){
            navigate('/');
        }
    } catch (error) {
        
    }
  }

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
        👈
        </Link>

        <button style={{cursor: 'pointer'}} onClick={removeNote} className="delete">
            ❌
        </button>
      </div>

      <form onSubmit={updateNote}>
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
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>

        <input style={{cursor: 'pointer'}} type="submit" />

        <p>
          {submitted && (
            <div className="success-message">
              Note has been successfully updated
            </div>
          )}
        </p>
      </form>
    </div>
  );
}

export default UpdateNote;
