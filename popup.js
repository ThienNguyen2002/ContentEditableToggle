document.addEventListener("DOMContentLoaded", function () {
    const toggleButton = document.getElementById("toggleButton");
  
    toggleButton.addEventListener("click", () => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript({
          target: { tabId: tabs[0].id },
          function: () => {
            const isEditable = document.body.contentEditable === 'true';
            document.body.contentEditable = !isEditable;
            return !isEditable;
          },
        }, (result) => {
          if (chrome.runtime.lastError) {
            console.error("Error handling response:", JSON.stringify(chrome.runtime.lastError));
            return; // Handle the error gracefully
          }
  
          if (result && result.length > 0) {
            const isEditable = result[0].result;
            if (isEditable) {
              toggleButton.textContent = "Stop Editing";
            } else {
              toggleButton.textContent = "Edit Content";
            }
          } else {
            console.error("Result object is empty or does not have index 0.");
          }
        });
      });
    });
  });
  