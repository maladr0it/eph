const apiKey = 'AIzaSyDcU15IueRv1HgZbWJt9jYBUdWRD81-zeQ';
const dynamicLinkDomain = 'xg9d6.app.goo.gl';
const baseLink = 'https://24.chat';
const androidPackageName = 'com.twentyfour';
const iosBundleId = 'org.ridiculous.TwentyFour';

export const generateLink = async (inboxToken) => {
  const resp = await fetch(
    `https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=${apiKey}`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify({
        dynamicLinkInfo: {
          dynamicLinkDomain,
          link: `${baseLink}/join/${inboxToken}`,
          androidInfo: {
            androidPackageName,
          },
          iosInfo: {
            iosBundleId,
          },
        },
        suffix: {
          option: 'SHORT',
        },
      }),
    },
  );
  const data = await resp.json();
  return data.shortLink;
};
