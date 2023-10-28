// content.js

// Function to toggle content editable on the page
function toggleContentEditable() {
    const isEditable = document.body.contentEditable === 'true';
    document.body.contentEditable = !isEditable;
    return !isEditable;
  }
  
  // Listen for messages from the popup
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.command === 'toggleEditable') {
      const isEditable = toggleContentEditable();
      sendResponse({ isEditable });
    }
  });
  