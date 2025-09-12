"use client"

import { useState } from "react"
import { MessageCircle, Send, X } from "lucide-react"

// Utility function to combine class names
const cn = (...classes) => classes.filter(Boolean).join(' ')

const ChatWidget = () => {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = {
      sender: "user",
      text: input,
      timestamp: new Date(),
    }

    // Add user message
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setIsLoading(true)

    try {
      // Call API endpoint (you can replace this with your actual API)
      const res = await fetch("/.netlify/functions/hello")
      const data = await res.json()

      // Add bot message
      const botMessage = {
        sender: "bot",
        text: data.message || "Hello! How can I help you today?",
        timestamp: new Date(),
      }

      setMessages([...newMessages, botMessage])
    } catch (error) {
      // Fallback message if API fails
      const errorMessage = {
        sender: "bot",
        text: "Sorry, I'm having trouble connecting right now. Please try again later.",
        timestamp: new Date(),
      }
      setMessages([...newMessages, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Floating Button */}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "h-14 w-14 rounded-full shadow-lg transition-all duration-300 hover:scale-110",
          "bg-blue-600 hover:bg-blue-700 text-white",
          "md:h-16 md:w-16 flex items-center justify-center",
          open && "rotate-180"
        )}
      >
        {open ? <X className="h-6 w-6 md:h-7 md:w-7" /> : <MessageCircle className="h-6 w-6 md:h-7 md:w-7" />}
      </button>

      {/* Chat Box */}
      {open && (
        <div
          className={cn(
            "absolute bottom-16 right-0 mb-2 shadow-2xl transition-all duration-300",
            "w-80 h-96 sm:w-96 sm:h-[500px]",
            "max-w-[calc(100vw-2rem)] max-h-[calc(100vh-8rem)]",
            "flex flex-col overflow-hidden",
            "border border-blue-200 bg-white dark:bg-gray-900 dark:border-blue-800 rounded-md"
          )}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 bg-blue-600 text-white">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-green-400 rounded-full animate-pulse" />
              <h3 className="font-semibold text-sm sm:text-base">Chat Support</h3>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white hover:bg-blue-700 h-8 w-8 p-0 rounded-md flex items-center justify-center"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-gray-50 dark:bg-gray-800">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 dark:text-gray-400 text-sm">
                <MessageCircle className="h-8 w-8 mx-auto mb-2 text-blue-400" />
                <p>Start a conversation!</p>
              </div>
            )}

            {messages.map((msg, i) => (
              <div key={i} className={cn("flex", msg.sender === "user" ? "justify-end" : "justify-start")}>
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg px-3 py-2 text-sm",
                    msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-sm"
                      : "bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 border border-gray-200 dark:border-gray-600 rounded-bl-sm"
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
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg rounded-bl-sm px-3 py-2">
                  <div className="flex space-x-1">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" />
                    <div
                      className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.1s" }}
                    />
                    <div
                      className="h-2 w-2 bg-blue-400 rounded-full animate-bounce"
                      style={{ animationDelay: "0.2s" }}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type your message..."
                disabled={isLoading}
                className="flex-1 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
              />
              <button
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-md flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ChatWidget