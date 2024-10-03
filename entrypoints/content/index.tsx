import { defineContentScript } from "wxt/sandbox";
import ReactDOM from "react-dom/client";
import App from "./app";
import "../../assets/main.css";

export default defineContentScript({
  matches: ["*://*/*"],
  cssInjectionMode: "ui", // Inject CSS in the UI layer
  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      // Create a shadow root UI layer for the extension
      name: "language-learning-content-box",
      position: "inline",
      onMount: (container) => {
        const root = ReactDOM.createRoot(container);
        root.render(<App />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
