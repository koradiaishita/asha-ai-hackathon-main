import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Send as SendIcon, 
  Mic as MicIcon, 
  AttachFile as AttachFileIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { VoiceModal } from './VoiceModal';

// API endpoint for chat
const API_URL = 'https://refactored-chainsaw-4jv645rvqr56cj965-8000.app.github.dev/api/chat';

// Add console log to debug
console.log("Using API URL:", API_URL);

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<{ text: string; isUser: boolean; type?: 'text' | 'file' | 'audio' }[]>([
    { text: 'Hi! How can I help you today?', isUser: false, type: 'text' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isVoiceModalOpen, setIsVoiceModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatWindowRef = useRef<HTMLDivElement>(null);

  // Handle clicks outside the chat window to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (isOpen && 
          chatWindowRef.current && 
          !chatWindowRef.current.contains(event.target as Node) &&
          !(event.target as Element).closest('.chat-bubble') &&
          !(event.target as Element).closest('.voice-modal-content')) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const toggleChat = () => {
    setIsOpen(prev => !prev);
  };

  // Ensure chat widget stays open when opening voice modal
  const openVoiceModal = () => {
    setIsVoiceModalOpen(true);
    setIsOpen(true); // Make sure chat is open when voice modal opens
  };

  // Handle voice modal close without closing chat
  const closeVoiceModal = () => {
    setIsVoiceModalOpen(false);
    // Don't close the chat widget here
  };

  const sendMessageToBackend = async (userMessage: string) => {
    try {
      setIsLoading(true);
      console.log(`Sending request to: ${API_URL} with message: ${userMessage}`);
      
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: userMessage,
          history: messages,
        }),
      });

      console.log(`Response status: ${response.status}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Server responded with status: ${response.status}, message: ${errorText}`);
        throw new Error(`Network response was not ok: ${response.status}`);
      }

      const data = await response.json();
      console.log("Received response:", data);
      return data.response;
    } catch (error) {
      console.error('Error sending message to backend:', error);
      
      // More descriptive error message based on error type
      if (error instanceof TypeError && error.message.includes('Failed to fetch')) {
        return "Cannot connect to the server. Please check if the backend is running.";
      } else {
        return "Sorry, I'm having trouble connecting to the server right now.";
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (message.trim()) {
      const userMessage = message;
      setMessage('');
      
      // Add user message to chat
      setMessages(prev => [...prev, { text: userMessage, isUser: true, type: 'text' }]);
      
      // Get response from backend
      const botResponse = await sendMessageToBackend(userMessage);
      
      // Add bot response to chat
      setMessages(prev => [...prev, { 
        text: botResponse, 
        isUser: false, 
        type: 'text' 
      }]);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setMessages([...messages, { 
        text: `Attached file: ${file.name}`, 
        isUser: true, 
        type: 'file' 
      }]);
      
      // In a real app, you would upload the file to the server here
      // For now, simulate a response
      setTimeout(async () => {
        const botResponse = await sendMessageToBackend(`I've uploaded a file called ${file.name}`);
        setMessages(prev => [...prev, { 
          text: botResponse, 
          isUser: false, 
          type: 'text' 
        }]);
      }, 1000);
      
      // Clear the input for future uploads
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleVoiceInput = async (text: string) => {
    // Ensure chat remains open after voice input
    setIsOpen(true);
    
    setMessages(prev => [...prev, { 
      text: text, 
      isUser: true, 
      type: 'audio' 
    }]);
    
    // Get response from backend for voice input
    const botResponse = await sendMessageToBackend(text);
    
    setMessages(prev => [...prev, { 
      text: botResponse, 
      isUser: false, 
      type: 'text' 
    }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chat-widget">
      <div className="chat-bubble" onClick={toggleChat}>
        🤖
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="chat-window"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            ref={chatWindowRef}
            style={{ maxHeight: 'calc(100vh - 120px)' }}
          >
            <div className="chat-header">
              <div className="chat-header-title">
                <div className="bot-avatar"></div>
                <span>Asha AI Assistant</span>
              </div>
              <button 
                className="chat-icon-button" 
                onClick={() => setIsOpen(false)}
                style={{ 
                  background: 'transparent', 
                  width: '30px', 
                  height: '30px',
                  color: 'white'
                }}
              >
                <CloseIcon />
              </button>
            </div>

            <div className="chat-messages">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message-container ${msg.isUser ? 'user' : ''}`}
                >
                  <div className={`message-avatar ${msg.isUser ? 'user-avatar' : 'bot-message-avatar'}`}>
                  </div>
                  <div className={`message ${msg.isUser ? 'user' : 'bot'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="message-container">
                  <div className="message-avatar bot-message-avatar"></div>
                  <div className="message bot">
                    <span className="typing-indicator"> Thinking......</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="chat-input">
              <input
                type="text"
                placeholder="Type your message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading}
              />
              <div className="chat-icons">
                <button
                  className="chat-icon-button"
                  onClick={openVoiceModal}
                  title="Record audio"
                  disabled={isLoading}
                >
                  <MicIcon />
                </button>
                <button
                  className="chat-icon-button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach file"
                  disabled={isLoading}
                >
                  <AttachFileIcon />
                </button>
                <button 
                  className="chat-icon-button send-button" 
                  onClick={handleSend} 
                  title="Send message"
                  disabled={isLoading || !message.trim()}
                >
                  <SendIcon />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileSelect}
                style={{ display: 'none' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <VoiceModal 
        isOpen={isVoiceModalOpen}
        onClose={closeVoiceModal}
        onSubmit={handleVoiceInput}
      />
    </div>
  );
}