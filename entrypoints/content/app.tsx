import { useState, useEffect } from "react";
import PromptModal from "../../components/modal";
import StickyIcon from "../../assets/Icon.svg";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const createIcon = () => {
    const Icon = document.createElement("img");
    Icon.addEventListener("click", openModal);
    Icon.src = StickyIcon;
    Icon.className = "sticky-icon bg-white p-8 rounded-lg shadow-2xl";
    Icon.style.cssText = `
      width: 40px;
      position: absolute;
      bottom: 0;
      right: 2%;
      draggable: false;
      cursor: pointer;
    `;
    return Icon;
  };

  const insertStickyIcon = () => {
    const messageInput = document.querySelector(".msg-form__contenteditable");
    if (messageInput && !messageInput.querySelector(".sticky-icon")) {
      messageInput.appendChild(createIcon());
    }
  };

  const removeStickyIcon = () => {
    const stickyIcon = document.querySelector(".sticky-icon");
    stickyIcon?.remove();
  };

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      if ((event.target as Element).matches(".msg-form__contenteditable")) {
        insertStickyIcon();
      }
    };

    const handleFocusOut = (event: FocusEvent) => {
      if (!(event.relatedTarget as Element)?.matches(".sticky-icon")) {
        removeStickyIcon();
      }
    };

    document.addEventListener("focusin", handleFocusIn);
    document.addEventListener("focusout", handleFocusOut);

    return () => {
      document.removeEventListener("focusin", handleFocusIn);
      document.removeEventListener("focusout", handleFocusOut);
    };
  }, []);

  return (
    <PromptModal
      modalVisible={isModalOpen}
      handleCloseModal={closeModal}
      setModalVisible={setIsModalOpen}
    />
  );
};

export default App;
