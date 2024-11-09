import React from "react";
import "../App.css"

function Home() {
  return (
    <div className="homepage">
      <h1 className="heading p-5">Welcome to Pharmamate</h1>
      <div className="p-3 m-3 flex justify-center homepage-cards">
        <div className="card m-4" style={{ width: "18rem" }}>
          <img src="../../public/images/Reminder-med.jpeg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">
              You can set reminders to take medicine
            </p>
            <a href="#" className="btn btn-primary hover:text-black hover:bg-blue-100">
              Reminders
            </a>
          </div>
        </div>
        <div className="card m-4" style={{ width: "18rem" }}>
          <img src="../../public/images/Stock-med-image.jpeg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">
              You can maintain the stock of your medicines here
            </p>
            <a href="#" className="btn btn-primary hover:text-black hover:bg-blue-100">
              Stock of medicine
            </a>
          </div>
        </div>
        <div className="card m-4" style={{ width: "18rem" }}>
          <img src="../../public/images/chatbot.jpeg" className="card-img-top" alt="..." />
          <div className="card-body">
            <p className="card-text">
              Coming Soon...
            </p>
            <a href="#" className="btn btn-primary hover:text-black hover:bg-blue-100">
              Health-care-ChatBot
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
