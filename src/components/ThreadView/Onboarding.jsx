import React from 'react';

import './index.css';

const messages = [
  'hey 👋 you just started a private conversation between us!',
  "you clicked my link, so i guess you know who i am... but i don't know who you are! 👻",
  'go ahead and send me a secret message! 🔥 visit my link again later to see my reply',
  'also, your own link is at the top ☝️ share this on your social media if you want other people to message you too 😛',
  'finally, all messages are deleted at midnight EST for your privacy 🕵️',
];

const Onboarding = () => (
  <React.Fragment>
    {messages.map((text, i) => (
      <li key={i} className="MessageContainer">
        <div className="Message">{text}</div>
      </li>
    ))}
  </React.Fragment>
);
export default Onboarding;
