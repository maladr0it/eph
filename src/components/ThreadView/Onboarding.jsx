import React from 'react';

import './index.css';

const Onboarding = () => (
  <div className="Onboarding">
    <h1>24 chat</h1>
    <p>
      Message this user here; <b>they won't know</b> who it's from!
    </p>
    <p>Visit this link later to check for replies.</p>
    <p>We delete all messages every night at 12 AM EST.</p>
    <br />
    <p>
      <a href="#">
        <u>Download the app</u>
      </a>{' '}
      for notifications and more
    </p>
  </div>
);
export default Onboarding;
