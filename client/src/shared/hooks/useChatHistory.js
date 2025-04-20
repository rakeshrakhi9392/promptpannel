import { useEffect } from "react";
import { useStore } from "../../store";
import { getChatHistory, sendChatMessage, closeChatSubscription } from "../../socketConn";
import { useUserDetails } from "./useUserDetails";

export const useChatHistory = (channelId) => {
  const { chatHistory } = useStore();
  const { isLogged, username } = useUserDetails();

  useEffect(() => {
    // Fetch chat history for the given channelId
    getChatHistory(channelId);

    // Cleanup function to close the subscription when channelId changes or component unmounts
    return () => {
      closeChatSubscription(channelId);
    };
  }, [channelId]);  // Dependency array with channelId to trigger the effect when it changes

  const sendMessage = (message) => {
    sendChatMessage(channelId, {
      author: isLogged ? username : "Guest",
      content: message,
    });
  };

  return {
    messages: chatHistory?.channelId === channelId ? chatHistory.messages : [],
    sendMessage,
  };
};
