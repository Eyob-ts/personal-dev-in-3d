"use client"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, Send, X, Paperclip, Mic, Bot, User, ThumbsUp, ThumbsDown } from "lucide-react"

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi there! 👋 I'm Eyob virtual assistant. what do you wanna know about Eyob?",
      timestamp: new Date(Date.now() - 60000),
      type: "text"
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
      type: "text"
    }

    // Add user message
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Simulate API delay for better UX
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Call API endpoint (you can replace this with your actual API)
      const res = await fetch("/.netlify/functions/hello")
      const data = await res.json()

      // Add bot message
      const botMessage = {
        sender: "bot",
        text: data.message || "Thanks for your message! I'll help you with that.",
        timestamp: new Date(),
        type: "text",
        quickReplies: ["Tell me more", "Show options", "Not helpful"]
      }

      setMessages([...newMessages, botMessage])
    } catch {
      // Fallback message if API fails
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
        type: "text"
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickReply = (reply) => {
    setInput(reply)
    setTimeout(() => sendMessage(), 100)
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const toggleChat = () => {
    setOpen(!open)
    if (!open) {
      setTimeout(() => inputRef.current?.focus(), 300)
    }
  }

  const minimizeChat = () => {
    setIsMinimized(true)
  }

  const expandChat = () => {
    setIsMinimized(false)
    setTimeout(() => inputRef.current?.focus(), 100)
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={toggleChat}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white",
          "md:h-16 md:w-16 flex items-center justify-center relative",
          open && "rotate-90"
        )}
      >
        {open ? <X className="h-6 w-6 md:h-7 md:w-7" /> : <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />}
        {!open && messages.length > 1 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full h-5 w-5 text-xs flex items-center justify-center">
            {messages.length - 1}
          </span>
        )}
      </button>

      {/* Chat Box */}
      {open && (
        <div className={cn(
          "absolute bottom-16 right-0 mb-2 shadow-2xl transition-all duration-300",
          "w-80 sm:w-96",
          isMinimized ? "h-14" : "h-96 sm:h-[500px]",
          "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]",
          "flex flex-col overflow-hidden",
          "border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 rounded-xl",
          "backdrop-blur-sm bg-opacity-95 dark:bg-opacity-95"
        )}>
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                  <Bot className="h-6 w-6 text-blue-600" />
                </div>
                <div className="absolute bottom-0 right-0 h-3 w-3 bg-green-400 rounded-full border-2 border-white"></div>
              </div>
              <div>
                <h3 className="font-semibold text-sm sm:text-base">Chat Support</h3>
                <p className="text-xs opacity-80">Online • Responds instantly</p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={minimizeChat}
                className="text-white hover:bg-white hover:bg-opacity-10 h-8 w-8 p-0 rounded-md flex items-center justify-center"
              >
                <span className="text-xs">−</span>
              </button>
              <button
                onClick={toggleChat}
                className="text-white hover:bg-white hover:bg-opacity-10 h-8 w-8 p-0 rounded-md flex items-center justify-center"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {isMinimized ? (
            <div className="flex-1 p-4 flex items-center justify-between bg-gray-50 dark:bg-gray-800">
              <p className="text-sm text-gray-600 dark:text-gray-300">Chat minimized</p>
              <button 
                onClick={expandChat}
                className="text-sm bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md"
              >
                Expand
              </button>
            </div>
          ) : (
            <>
              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
                {messages.map((msg, i) => (
                  <div key={i} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                    <div className="flex max-w-[85%] gap-2">
                      {msg.sender === "bot" && (
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center mt-1">
                          <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                        </div>
                      )}
                      <div>
                        <div
                          className={cn(
                            "rounded-2xl px-4 py-3",
                            msg.sender === "user"
                              ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-br-md"
                              : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-100 dark:border-gray-600 rounded-bl-md shadow-sm"
                          )}
                        >
                          <p className="break-words">{msg.text}</p>
                          <p
                            className={cn(
                              "text-xs mt-1 opacity-70",
                              msg.sender === "user" ? "text-blue-100" : "text-gray-500 dark:text-gray-400"
                            )}
                          >
                            {msg.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                          </p>
                        </div>
                        
                        {/* Quick Replies */}
                        {msg.sender === "bot" && msg.quickReplies && (
                          <div className="mt-2 flex flex-wrap gap-2">
                            {msg.quickReplies.map((reply, idx) => (
                              <button
                                key={idx}
                                onClick={() => handleQuickReply(reply)}
                                className="text-xs bg-gray-100 dark:bg-gray-600 hover:bg-gray-200 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 px-3 py-1.5 rounded-full"
                              >
                                {reply}
                              </button>
                            ))}
                          </div>
                        )}
                        
                        {/* Feedback buttons for bot messages */}
                        {msg.sender === "bot" && i === messages.length - 1 && (
                          <div className="flex justify-start mt-2 gap-1">
                            <button className="p-1 text-gray-400 hover:text-green-500">
                              <ThumbsUp className="h-3.5 w-3.5" />
                            </button>
                            <button className="p-1 text-gray-400 hover:text-red-500">
                              <ThumbsDown className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                      {msg.sender === "user" && (
                        <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center mt-1">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}

                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex gap-2">
                      <div className="flex-shrink-0 h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div className="bg-white dark:bg-gray-700 border border-gray-100 dark:border-gray-600 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                        <div className="flex space-x-1.5">
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                          <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <input
                      ref={inputRef}
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Type your message..."
                      disabled={isLoading}
                      className="w-full border border-gray-300 dark:border-gray-600 rounded-full px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                    />
                    <div className="absolute right-3 top-3 flex gap-1">
                      <button className="text-gray-400 hover:text-blue-500">
                        <Paperclip className="h-4 w-4" />
                      </button>
                      <button className="text-gray-400 hover:text-blue-500">
                        <Mic className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={sendMessage}
                    disabled={!input.trim() || isLoading}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white h-12 w-12 rounded-full flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                  >
                    <Send className="h-5 w-5" />
                  </button>
                </div>
                <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-2">
                  Type your message above or use quick replies
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default ChatWidget
