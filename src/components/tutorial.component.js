import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import TutorialDataService from "../services/tutorial.service";

const Tutorial = (props) => {
  const [currentTutorial, setCurrentTutorial] = useState({
    id: null,
    title: "",
    description: "",
    published: false
  });
  const [message, setMessage] = useState("");
  // Get the id param from the URL.
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("id...", id);
    getTutorial(id);
  }, []);

  function onChangeTitle(e) {
    const title = e.target.value;
    const tutorial = {
      ...currentTutorial,
      title: title
    }
    setCurrentTutorial(tutorial);
  }

  function onChangeDescription(e) {
    const description = e.target.value;
    const tutorial = {
      ...currentTutorial,
      description: description
    }
    setCurrentTutorial(tutorial);
  }

  function getTutorial(id) {
    TutorialDataService.get(id)
      .then(response => {
        setCurrentTutorial(response.data);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updatePublished(status) {
    var data = {
      id: currentTutorial.id,
      title: currentTutorial.title,
      description: currentTutorial.description,
      published: status
    };
    TutorialDataService.update(currentTutorial.id, data)
      .then(response => {
        const tutorial = {
          ...currentTutorial,
          published: status
        }
        setCurrentTutorial(tutorial);
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  function updateTutorial() {
    TutorialDataService.update(
      currentTutorial.id,
      currentTutorial
    )
      .then(response => {
        console.log(response.data);
        setMessage("The tutorial was updated successfully!");
      })
      .catch(e => {
        console.log(e);
      });
  }

  function deleteTutorial() {
    TutorialDataService.delete(currentTutorial.id)
      .then(response => {
        console.log(response.data);
        navigate("../tutorials", { replace: true });
      })
      .catch(e => {
        console.log(e);
      });
  }

  return (
    <div>
      {currentTutorial ? (
        <div className="edit-form">
          <h4>Tutorial</h4>
          <form>
            <div className="form-group">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={currentTutorial.title}
                onChange={onChangeTitle}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={currentTutorial.description}
                onChange={onChangeDescription}
              />
            </div>
            <div className="form-group">
              <label>
                <strong>Status:</strong>
              </label>
              {currentTutorial.published ? "Published" : "Pending"}
            </div>
          </form>
          {currentTutorial.published ? (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updatePublished(false)}
            >
              UnPublish
            </button>
          ) : (
            <button
              className="badge bg-primary mr-2"
              onClick={() => updatePublished(true)}
            >
              Publish
            </button>
          )}
          <button
            className="badge bg-danger mr-2"
            onClick={deleteTutorial}
          >
            Delete
          </button>
          <button
            type="submit"
            className="badge bg-success"
            onClick={updateTutorial}
          >
            Update
          </button>
          <p>{message}</p>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Tutorial...</p>
        </div>
      )}
    </div>
  );
}

export default Tutorial;