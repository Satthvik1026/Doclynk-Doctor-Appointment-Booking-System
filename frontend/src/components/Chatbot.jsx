// import React, { useState, useContext, useRef, useEffect } from 'react';
// import { AppContext } from '../context/AppContext';
// import axios from 'axios';

// // A small component for the "typing..." animation
// const TypingIndicator = () => (
//     <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-2xl rounded-bl-md">
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
//         <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
//     </div>
// );

// const CHAT_LIMIT = 5; // Set your desired chat limit here

// const Chatbot = () => {
//     const { backendUrl } = useContext(AppContext);
//     const [isOpen, setIsOpen] = useState(false);
//     // Initialize message count from localStorage or set to 0
//     const [messageCount, setMessageCount] = useState(() => {
//         const savedCount = localStorage.getItem('chatbotMessageCount');
//         return savedCount ? parseInt(savedCount, 10) : 0;
//     });

//     const [messages, setMessages] = useState([
//         { from: 'ai', text: "Hi! I'm Medi, your virtual assistant. How can I help you today?" }
//     ]);
//     const [input, setInput] = useState('');
//     const [isLoading, setIsLoading] = useState(false);
//     const messagesEndRef = useRef(null);

//     const isLimitReached = messageCount >= CHAT_LIMIT;

//     useEffect(() => {
//         // Save the message count to localStorage whenever it changes
//         localStorage.setItem('chatbotMessageCount', messageCount.toString());
//     }, [messageCount]);

//     const scrollToBottom = () => {
//         messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//     };

//     useEffect(scrollToBottom, [messages, isLoading]);

//     const handleSend = async () => {
//         // Check if the limit has been reached
//         if (input.trim() === '' || isLoading || isLimitReached) return;

//         const userMessage = { from: 'user', text: input };
//         setMessages(prev => [...prev, userMessage]);
//         setInput('');
//         setIsLoading(true);
//         setMessageCount(prev => prev + 1); // Increment count on send

//         try {
//             const response = await axios.post(`${backendUrl}/api/chatbot/ask`, { query: input });
//             const { data } = response;
//             const aiMessage = { from: 'ai', text: data.success ? data.answer : "Sorry, something went wrong." };
//             setMessages(prev => [...prev, aiMessage]);
//         } catch (error) {
//             const errorMessage = { from: 'ai', text: "Sorry, I'm having trouble connecting." };
//             setMessages(prev => [...prev, errorMessage]);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     const messageBaseClasses = "py-2 px-4 rounded-2xl max-w-[80%] leading-snug break-words";

//     return (
//         <div className="fixed bottom-6 right-7 flex flex-col items-end">
//             {/* Chat Window */}
//             <div
//                 className={`w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden transition-all duration-300 ease-out origin-bottom-right ${isOpen
//                     ? 'scale-100 opacity-100'
//                     : 'scale-95 opacity-0 pointer-events-none'
//                     }`}
//             >
//                 {/* Header */}
//                 <div className="bg-blue-500 text-white p-4 flex justify-between items-center flex-shrink-0">
//                     <h2 className="text-lg font-semibold">Medi Assistant</h2>
//                     <button
//                         onClick={() => setIsOpen(false)}
//                         className="text-xl hover:opacity-75"
//                     >
//                         ✖
//                     </button>
//                 </div>

//                 {/* Messages */}
//                 <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
//                     {messages.map((msg, index) => (
//                         <div
//                             key={index}
//                             className={`${messageBaseClasses} ${msg.from === 'ai'
//                                 ? 'bg-gray-200 text-gray-800 self-start rounded-bl-md'
//                                 : 'bg-blue-500 text-white self-end rounded-br-md'
//                                 }`}
//                         >
//                             {msg.text}
//                         </div>
//                     ))}
//                     {isLoading && <TypingIndicator />}
//                     {isLimitReached && (
//                         <div className="p-2 text-center text-xs text-gray-500">
//                             You have reached the message limit for this session.
//                         </div>
//                     )}
//                     <div ref={messagesEndRef} />
//                 </div>

//                 {/* Input Area */}
//                 <div className="p-2 border-t border-gray-200 bg-white flex items-center gap-2 flex-shrink-0">
//                     <input
//                         type="text"
//                         value={input}
//                         onChange={(e) => setInput(e.target.value)}
//                         onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//                         placeholder={
//                             isLimitReached ? 'Message limit reached' : 'Ask a question...'
//                         }
//                         disabled={isLoading || isLimitReached}
//                         className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//                     />
//                     <button
//                         onClick={handleSend}
//                         disabled={isLoading || isLimitReached}
//                         className="bg-blue-500 text-white rounded-full px-4 py-2 font-semibold flex-shrink-0 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>

//             {/* Floating Action Button (FAB) */}
//             {!isOpen && (
//                 <button
//                     className="bg-blue-500 text-white rounded-full w-16 h-16 text-3xl shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:scale-110 mt-3"
//                     onClick={() => setIsOpen(true)}
//                 >
//                     <span className="w-full h-full flex items-center justify-center">
//                         💬
//                     </span>
//                 </button>
//             )}
//         </div>
//     );


// };

// export default Chatbot;

import React, { useState, useContext, useRef, useEffect } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';

// A small component for the "typing..." animation
const TypingIndicator = () => (
    <div className="flex items-center gap-2 p-3 bg-gray-200 rounded-2xl rounded-bl-md">
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></span>
        <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></span>
    </div>
);

const CHAT_LIMIT = 5; // lifetime limit (stored in localStorage)

const Chatbot = () => {
    const { backendUrl } = useContext(AppContext);
    const [isOpen, setIsOpen] = useState(false);

    // Initialize message count from localStorage or set to 0
    const [messageCount, setMessageCount] = useState(() => {
        const savedCount = localStorage.getItem('chatbotMessageCount');
        return savedCount ? parseInt(savedCount, 10) : 0;
    });

    const [messages, setMessages] = useState([
        { from: 'ai', text: "Hi! I'm Medi, your virtual assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);

    const isLimitReached = messageCount >= CHAT_LIMIT;

    useEffect(() => {
        localStorage.setItem('chatbotMessageCount', messageCount.toString());
    }, [messageCount]);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(scrollToBottom, [messages, isLoading]);

    const handleSend = async () => {
        if (input.trim() === '' || isLoading || isLimitReached) return;

        const userMessage = { from: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);
        setMessageCount(prev => prev + 1);

        try {
            const response = await axios.post(`${backendUrl}/api/chatbot/ask`, { query: input });
            const { data } = response;
            const aiMessage = {
                from: 'ai',
                text: data.success ? data.answer : "Sorry, something went wrong."
            };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            const errorMessage = { from: 'ai', text: "Sorry, I'm having trouble connecting." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };

    const messageBaseClasses =
        "py-2 px-4 rounded-2xl max-w-[80%] leading-snug break-words";

    return (
        <div className="fixed bottom-6 right-7 flex flex-col items-end z-[9999]">
            {/* Chat Window */}
            {isOpen && (
                <div className="w-[350px] h-[500px] bg-white rounded-xl shadow-2xl flex flex-col overflow-hidden mb-3">
                    {/* Header */}
                    <div className="bg-blue-500 text-white p-4 flex justify-between items-center flex-shrink-0">
                        <h2 className="text-lg font-semibold">Medi Assistant</h2>
                        <button
                            onClick={() => setIsOpen(false)}
                            className="text-xl hover:opacity-75"
                        >
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-grow p-4 overflow-y-auto bg-gray-50 flex flex-col gap-3">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`${messageBaseClasses} ${msg.from === 'ai'
                                        ? 'bg-gray-200 text-gray-800 self-start rounded-bl-md'
                                        : 'bg-blue-500 text-white self-end rounded-br-md'
                                    }`}
                            >
                                {msg.text}
                            </div>
                        ))}
                        {isLoading && <TypingIndicator />}
                        {isLimitReached && (
                            <div className="p-2 text-center text-xs text-gray-500">
                                You have reached the message limit for this session.
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {/* Input Area */}
                    <div className="p-2 border-t border-gray-200 bg-white flex items-center gap-2 flex-shrink-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                            placeholder={
                                isLimitReached ? 'Message limit reached' : 'Ask a question...'
                            }
                            disabled={isLoading || isLimitReached}
                            className="flex-grow border border-gray-300 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
                        />
                        <button
                            onClick={handleSend}
                            disabled={isLoading || isLimitReached}
                            className="bg-blue-500 text-white rounded-full px-4 py-2 font-semibold flex-shrink-0 hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            {/* Floating Action Button (FAB) */}
            {!isOpen && (
                <button
                    className="bg-blue-500 text-white rounded-full w-16 h-16 text-3xl shadow-xl flex items-center justify-center cursor-pointer transition-all duration-300 ease-out hover:scale-110"
                    onClick={() => setIsOpen(true)}
                >
                    💬
                </button>
            )}
        </div>
    );
};

export default Chatbot;
