import React, { useEffect, useRef, useState } from "react";
import botIcon from "./icons/bot.svg";
import geminiIcon from "./icons/gemini.svg";
import groqIcon from "./icons/groq.svg";

const CHAT_API = process.env.REACT_APP_CHAT_API || "http://localhost:5000";
const TOKEN_EXPIRED_MESSAGE = "The token has expired and no more questions can be asked.";
const QUOTA_EXCEEDED_MESSAGE = "The API quota has been exceeded. No more questions can be asked right now. Please try again later.";
const PROVIDER_ICONS = {
    gemini: geminiIcon,
    groq: groqIcon
};
const PROVIDER_LABELS = {
    gemini: "Gemini",
    groq: "Groq"
};

function providerTooltip(provider, model) {
    const apiName = PROVIDER_LABELS[provider] || provider;
    return model ? apiName + " · " + model : apiName;
}

function Chatbot({ onClose }) {
    const [messages, setMessages] = useState([
        {
            role: "bot",
            text: "Hi, I can answer questions about Meghsham's resume, skills, and projects."
        }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [tokenExpired, setTokenExpired] = useState(false);
    const [quotaExceeded, setQuotaExceeded] = useState(false);
    const [editingIndex, setEditingIndex] = useState(null);
    const [editText, setEditText] = useState("");
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [activeProvider, setActiveProvider] = useState(null);
    const [activeModel, setActiveModel] = useState("");
    const listRef = useRef(null);
    const chatLocked = tokenExpired || quotaExceeded;

    function scrollToLatest() {
        if (listRef.current) {
            listRef.current.scrollTop = listRef.current.scrollHeight;
        }
    }

    function historyFrom(messageList) {
        return messageList
            .filter((message) => message.text)
            .slice(-16)
            .map((message) => ({
                role: message.role,
                text: message.text
            }));
    }

    useEffect(() => {
        scrollToLatest();
    }, [messages, tokenExpired, editingIndex]);

    useEffect(() => {
        const editor = document.querySelector(".chatEditInput");
        if (editor) {
            editor.style.height = "auto";
            editor.style.height = Math.min(Math.max(editor.scrollHeight, 160), 280) + "px";
            editor.focus();
        }
    }, [editingIndex]);

    useEffect(() => {
        async function checkStatus() {
            try {
                const response = await fetch(CHAT_API + "/api/chat/status");
                const data = await response.json();
                if (data.tokenExpired) {
                    setTokenExpired(true);
                }
                if (data.quotaExceeded && data.groqReady === false) {
                    setQuotaExceeded(true);
                }
                if (data.activeProvider) {
                    setActiveProvider(data.activeProvider);
                }
                if (data.activeModel) {
                    setActiveModel(data.activeModel);
                }
            } catch (error) {
                // Backend may still be starting; keep chat available until a send fails.
            }
        }
        checkStatus();
        const timer = setInterval(checkStatus, 8000);
        return () => clearInterval(timer);
    }, []);

    async function askBot(question, history) {
        try {
            const response = await fetch(CHAT_API + "/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    message: question,
                    history: history
                })
            });
            const data = await response.json();
            const errorText = String(data.error || "").toLowerCase();
            const quotaHit = Boolean(data.quotaExceeded) || response.status === 429 || errorText.includes("quota") || errorText.includes("too many requests");

            if (data.tokenExpired) {
                setTokenExpired(true);
                setMessages((current) => [...current, { role: "bot", text: TOKEN_EXPIRED_MESSAGE }]);
                return;
            }

            if (quotaHit && !data.reply) {
                setQuotaExceeded(true);
                setMessages((current) => [...current, { role: "bot", text: data.error || QUOTA_EXCEEDED_MESSAGE }]);
                return;
            }

            if (!response.ok) {
                setMessages((current) => [
                    ...current,
                    { role: "bot", text: data.error || "Something went wrong. Please try again." }
                ]);
                return;
            }

            if (data.provider) {
                setActiveProvider(data.provider);
            }
            if (data.activeModel) {
                setActiveModel(data.activeModel);
            }
            setMessages((current) => [...current, { role: "bot", text: data.reply }]);
        } catch (error) {
            setMessages((current) => [
                ...current,
                { role: "bot", text: "Chat is unavailable right now. Please try again in a moment." }
            ]);
        } finally {
            setLoading(false);
        }
    }

    async function sendQuestion(question) {
        if (!question || loading || chatLocked) {
            return;
        }

        const nextMessages = [...messages, { role: "user", text: question }];
        setInput("");
        setMessages(nextMessages);
        setLoading(true);
        await askBot(question, historyFrom(nextMessages));
    }

    function handleSubmit(event) {
        event.preventDefault();
        sendQuestion(input.trim());
    }

    function handleKeyDown(event) {
        if (event.key === "Enter" && !event.shiftKey) {
            event.preventDefault();
            sendQuestion(input.trim());
        }
    }

    function handleCopy(text, index) {
        if (!text) {
            return;
        }
        navigator.clipboard.writeText(text).then(() => {
            setCopiedIndex(index);
            setTimeout(() => {
                setCopiedIndex((current) => (current === index ? null : current));
            }, 1200);
        });
    }

    function handleStartEdit(index, text) {
        if (loading || chatLocked) {
            return;
        }
        setEditingIndex(index);
        setEditText(text);
    }

    function handleCancelEdit() {
        setEditingIndex(null);
        setEditText("");
    }

    async function handleSaveEdit(index) {
        const question = editText.trim();
        if (!question || loading || chatLocked) {
            return;
        }

        const nextMessages = [...messages.slice(0, index), { role: "user", text: question }];
        setEditingIndex(null);
        setEditText("");
        setMessages(nextMessages);
        setLoading(true);
        await askBot(question, historyFrom(nextMessages));
    }

    return (
        <div className="chatbot">
            <div className="chatHeader">
                <img className="chatBotIcon" src={botIcon} alt="AI bot" />
                <h3>Ask AI</h3>
                {activeProvider && PROVIDER_ICONS[activeProvider] ? (
                    <div className="chatProviderWrap">
                        <img
                            className="chatProviderIcon"
                            src={PROVIDER_ICONS[activeProvider]}
                            alt={PROVIDER_LABELS[activeProvider] || activeProvider}
                            tabIndex="0"
                        />
                        <span className="chatProviderTip" role="tooltip">
                            {providerTooltip(activeProvider, activeModel)}
                        </span>
                    </div>
                ) : null}
                {onClose ? (
                    <button type="button" className="chatHeaderClose" onClick={onClose} aria-label="Close chat">
                        ⨯
                    </button>
                ) : null}
            </div>
            <div className="chatMessages" ref={listRef}>
                {messages.map((message, index) => (
                    <div key={index} className={"chatRow chatRow-" + message.role + (editingIndex === index ? " chatRow-editing" : "")}>
                        <div className={"chatBubble chat-" + message.role + (editingIndex === index ? " chatBubble-editing" : "")}>
                            {message.role === "bot" ? <span>MJ</span> : null}
                            {editingIndex === index ? (
                                <textarea
                                    className="chatEditInput"
                                    value={editText}
                                    onChange={(event) => {
                                        setEditText(event.target.value);
                                        event.target.style.height = "auto";
                                        event.target.style.height = Math.min(event.target.scrollHeight, 280) + "px";
                                    }}
                                    rows="8"
                                />
                            ) : (
                                <p>{message.text}</p>
                            )}
                            <div className="chatActions">
                                <button
                                    type="button"
                                    className="chatActionBtn"
                                    onClick={() => handleCopy(editingIndex === index ? editText : message.text, index)}
                                >
                                    {copiedIndex === index ? "Copied" : "Copy"}
                                </button>
                                {message.role === "user" && editingIndex !== index ? (
                                    <button
                                        type="button"
                                        className="chatActionBtn"
                                        onClick={() => handleStartEdit(index, message.text)}
                                        disabled={loading || chatLocked}
                                    >
                                        Edit
                                    </button>
                                ) : null}
                                {editingIndex === index ? (
                                    <>
                                        <button
                                            type="button"
                                            className="chatActionBtn"
                                            onClick={() => handleSaveEdit(index)}
                                            disabled={loading || chatLocked}
                                        >
                                            Save
                                        </button>
                                        <button
                                            type="button"
                                            className="chatActionBtn"
                                            onClick={handleCancelEdit}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : null}
                            </div>
                        </div>
                    </div>
                ))}
                {loading ? (
                    <div className="chatRow chatRow-bot">
                        <div className="chatBubble chat-bot">
                            <span>MJ</span>
                            <p>Thinking...</p>
                        </div>
                    </div>
                ) : null}
            </div>
            {chatLocked ? (
                <p className="chatExpired">{tokenExpired ? TOKEN_EXPIRED_MESSAGE : QUOTA_EXCEEDED_MESSAGE}</p>
            ) : null}
            <form className="chatComposer" onSubmit={handleSubmit}>
                <textarea
                    className="chatInput"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder={chatLocked ? "Chat locked" : "Type a message"}
                    disabled={chatLocked || loading}
                    rows="3"
                />
                <button className="chatSend" type="submit" disabled={chatLocked || loading}>
                    {loading ? "..." : "➤"}
                </button>
            </form>
        </div>
    );
}

export default Chatbot;
