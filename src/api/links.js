// import firebase from './firebase';

// const links = firebase.links();

// const dynamicLink = new firebase.links.DynamicLink(url, dynamicLinkDomain)

const apiKey = 'AIzaSyDcU15IueRv1HgZbWJt9jYBUdWRD81-zeQ';
const dynamicLinkDomain = 'xg9d6.app.goo.gl';
const url = `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`;

const app_code = 'xg9d6';
const apn = 'com.twentyfour';

const demo = 'https://xg9d6.app.goo.gl/?link=your_deep_link&apn=package_name[&amv=minimum_version][&afl=fallback_link]';

const a = async () => {
  const resp = await fetch(url, {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/json',
    }),
    // mode: 'no-cors',
    body: {
      dynamicLinkInfo: {
        dynamicLinkDomain,
        link: '24.chat',
      },
    },
  });
  const data = await resp.json();
  console.log(data);
};

// a();
