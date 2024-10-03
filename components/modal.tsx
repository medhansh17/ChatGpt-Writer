import React, { useState, useRef, useEffect } from "react";
import Button from "./Button";
import Input from "../assets/Insert.svg";
import Reload from "../assets/Regenerate.svg";
import Generate from "../assets/Generate.svg";
import "./modal.css";

const MESSAGE =
  "Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.";

const MAX_PROMPT_LENGTH = 100;

interface PromptModalProps {
  modalVisible: boolean;
  handleCloseModal: () => void;
  setModalVisible: (value: boolean) => void;
}

const PromptModal: React.FC<PromptModalProps> = ({
  modalVisible,
  handleCloseModal,
  setModalVisible,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [generated, setGenerated] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [isPromptExpanded, setIsPromptExpanded] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto resize textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [inputValue]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(e.target.value);
  };

  const handleGenerateClick = () => {
    if (inputValue) {
      setGenerated(true);
      setPrompt(inputValue);
      setInputValue("");
    }
  };
  // Insert the message into the chat input field when the "Insert" button is clicked
  const handleInsertClick = () => {
    setModalVisible(false);
    const messageElement = document.querySelector<HTMLElement>(
      ".msg-form__contenteditable"
    );

    if (messageElement) {
      messageElement.innerHTML = `<p>${MESSAGE}</p>`;
      messageElement.focus();

      const inputEvent = new Event("input", {
        bubbles: true,
        cancelable: true,
      });
      messageElement.dispatchEvent(inputEvent);

      const range = document.createRange();
      const selection = window.getSelection();
      range.selectNodeContents(messageElement);
      range.collapse(false);
      selection?.removeAllRanges();
      selection?.addRange(range);

      const placeholder = document.querySelector<HTMLElement>(
        ".msg-form__placeholder"
      );
      if (placeholder) placeholder.style.display = "none";
    }
  };

  const togglePromptExpansion = () => setIsPromptExpanded(!isPromptExpanded);

  // Truncate prompt if it exceeds the maximum length(100 characters)
  const truncatePrompt = (text: string, maxLength: number) =>
    text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;

  return (
    <>
      <div
        className={`modal flex flex-col bg-white p-4 rounded-lg shadow-2xl fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-[9999] max-w-[500px] w-[90%] ${
          modalVisible ? "block" : "hidden"
        }`}
        style={{ maxHeight: "60vh", overflowY: "auto" }} // Limit height and add scrollbar
      >
        {generated && (
          <div className="chat-area flex flex-col w-[450px] py-4 gap-y-4">
            <div className="message bg-[#DFE1E7] p-2 rounded-lg self-end relative w-[80%]">
              <p className="text-[#666D80] text-[15px]">
                {isPromptExpanded
                  ? prompt
                  : truncatePrompt(prompt, MAX_PROMPT_LENGTH)}
              </p>
              {prompt.length > MAX_PROMPT_LENGTH && (
                <button
                  onClick={togglePromptExpansion}
                  className="absolute bottom-1 right-1 text-[#3B82F6] text-sm"
                >
                  {isPromptExpanded ? "▲" : "▼"}
                </button>
              )}
            </div>
            <div className="reply flex bg-[#DBEAFE] rounded-lg p-2 w-[300px]">
              <p className="reply-msg text-[#666D80] text-[15px]">{MESSAGE}</p>
            </div>
          </div>
        )}

        <textarea
          ref={textareaRef}
          value={inputValue}
          onChange={handleInputChange}
          className="text-[#666D80] text-[15px] p-2 w-full border border-[#C1C7D0] rounded-lg resize-none overflow-y-auto no-scrollbar"
          placeholder="Your prompt"
          rows={1}
          style={{ minHeight: "4rem", maxHeight: "150px" }} 
        />

        <div className="second-button flex justify-end items-center mt-4">
          {!generated ? (
            <Button
              label="Generate"
              action={handleGenerateClick}
              image={Generate}
              buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
              ImgClass="h-[18px] w-[14px] pt-1"
            />
          ) : (
            <div className="flex flex-row gap-x-2">
              <Button
                label="Insert"
                action={handleInsertClick}
                image={Input}
                buttonClass="px-4 py-2 text-[15px] bg-white flex flex-row text-[#666D80] border border-[#666D80] rounded-lg gap-2"
                ImgClass="w-[11px] pt-2"
              />
              <Button
                label="Regenerate"
                action={() => setGenerated(false)}
                image={Reload}
                buttonClass="px-4 py-2 text-[15px] bg-[#3B82F6] flex flex-row text-white rounded-lg gap-2"
                ImgClass="h-[19px] w-[13px] pt-1"
              />
            </div>
          )}
        </div>
      </div>

      {modalVisible && (
        <div
          onClick={handleCloseModal}
          className="fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-20 z-10"
        ></div>
      )}
    </>
  );
};

export default PromptModal;
