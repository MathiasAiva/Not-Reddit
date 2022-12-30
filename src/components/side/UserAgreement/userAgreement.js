import { React } from "react";
import "./UserAgreementStyle.css";
import '../side.css'

export const UserAgreement = () => {
  return (
    <div className="userAgreement">
      <div className="Policies">
        <h3 className="Policy">User Agreement</h3>
        <h3 className="Policy">Privacy Policy</h3>
        <h3 className="Policy">Content Policy</h3>
        <h3 className="Policy">Moderator Code Of Conduct</h3>
      </div>
      <div className="Languages">
        <h3 className="Language">English</h3>
        <h3 className="Language">Francais</h3>
        <h3 className="Language">Italiano</h3>
        <h3 className="Language">Deustch</h3>
        <h3 className="Language">Español</h3>
        <h3 className="Language">Portugues</h3>
      </div>
      <footer className="ua-footer">
        <h3 className="ua-footer-text">
          Not-Reddit © 2022. Created w {" "}
          <a href="https://reddit.com" className="reddit-link">
            Reddit
          </a>{" "}
        </h3>
      </footer>
    </div>
  );
};
