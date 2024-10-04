import { useEffect } from "react";

const TawkTo = () => {
  useEffect(() => {
    // Create a new script element
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];

    // Set the script attributes
    s1.async = true;
    s1.src = 'https://embed.tawk.to/66ffd16637379df10df1c16d/1i9bkju95';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    // Append the script to the DOM
    s0.parentNode.insertBefore(s1, s0);

    // Cleanup the script when the component unmounts
    return () => {
      s1.remove();
    };
  }, []); // Empty dependency array ensures this runs only once when the component mounts

  return null; // No UI, the script just runs in the background
};

export default TawkTo;
