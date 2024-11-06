import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { chatBot } from "../Utils/Apis";

const TawkTo = () => {

  useEffect(() => {
    getChat();

  }, []);

  const [chatURL, setchatURL] = useState()
  

  const getChat = async () => {
    try {
        const response = await chatBot();
        console.log(response, "chat")
        if (response?.status === 200) {
            toast.success("Got Product successfully");
            setchatURL(response?.data?.data?.chat_url);
        } else {
            toast.error("Failed to fetch categories");
        }
    } catch (err) {
        toast.error(err?.message);
    }
};


  useEffect(() => {
    // Create a new script element
    var Tawk_API = Tawk_API || {};
    var Tawk_LoadStart = new Date();

    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];

    // Set the script attributes
    s1.async = true;
    s1.src = chatURL;
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');

    // Append the script to the DOM
    s0.parentNode.insertBefore(s1, s0);

    // MutationObserver to hide Tawk branding
    const observer = new MutationObserver(() => {
      const branding = document.querySelector('.tawk-branding');
      if (branding) {
        branding.style.display = 'none';  // Hide the branding element
        observer.disconnect();  // Stop observing once it's found and hidden
      }
    });

    // Start observing changes in the document body
    observer.observe(document.body, { childList: true, subtree: true });

    // Cleanup the script and observer when the component unmounts
    return () => {
      s1.remove();
      observer.disconnect();
    };
  }, [chatURL]); // Empty dependency array ensures this runs only once when the component mounts

  return null; // No UI, the script just runs in the background
};

export default TawkTo;



