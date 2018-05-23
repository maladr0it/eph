import React from 'react';

import './index.css';

const Onboarding = () => (
  <div className="Onboarding">
    <h1>24 chat</h1>
    <p>Message this user here; they won't know who it's from!</p>
    <p>
      Visit the link again later to check for replies, or{' '}
      <a href="#">
        <u>download the app</u>
      </a>{' '}
      for notifications and more.
    </p>
    <br />
    <p>All messages are cleared at 12am PST.</p>
  </div>
);
export default Onboarding;
