# LinkedIn Message Reply Generator - Chrome Extension

This Chrome extension assists LinkedIn users by generating responses to messages. The extension provides a simple user interface and does not make any real API calls, making it ideal for demonstration purposes.

## Features

1. **AI Icon**: 
   - An AI icon appears when the user focuses on the LinkedIn message input field.
   - The icon disappears when the input field loses focus.

2. **Modal**:
   - Clicking on the AI icon opens a center-aligned modal where the user can enter a message or command.
   - The modal is dismissed by clicking outside of it.

3. **Generate Response**:
   - After entering a command in the modal input field, clicking the "Generate" button displays a dummy response: 
     - `Thank you for the opportunity! If you have any more questions or if there's anything else I can help you with, feel free to ask.`
   - Prompts longer than 100 characters are truncated, with the option to expand or collapse the prompt.

4. **Insert Response**:
   - Clicking the "Insert" button places the generated response directly into the LinkedIn message input field.
   - The "Regenerate" button is non-functional (as this is a demo).

## Edge Cases Handled

- Prompts longer than 100 characters are truncated.
- The text area in the modal grows dynamically as more text is entered.
- The modal closes when clicking outside of it.

## Technologies Used

- **[WXT Framework](https://wxt.dev/)**: Demonstrates the ability to learn and apply new frameworks quickly.
- **React with TypeScript**: Provides type-safe, component-based structure.
- **Tailwind CSS**: Used for efficient, utility-first styling.
