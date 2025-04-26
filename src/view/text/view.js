// Function to render a text-based ASCII map to a container
function renderText(asciiText, containerId = "text-container") {
  // Create a container div if it doesn't exist
  let container = document.getElementById(containerId);
  if (!container) {
    container = document.createElement("div");
    container.id = containerId;
    container.style.width = "100%";
    container.style.fontFamily = "monospace";
    container.style.whiteSpace = "pre";

    document.body.appendChild(container);
  } else {
    // Clear previous content
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
  }

  // Create a pre element to preserve formatting
  const preElement = document.createElement("pre");
  preElement.style.margin = "0";
  preElement.style.fontSize = "16px";
  preElement.style.lineHeight = "1";
  preElement.style.border = "1px solid #ccc";
  preElement.style.padding = "10px";
  preElement.style.backgroundColor = "#f8f8f8";
  preElement.style.width = "400px";
  preElement.style.height = "400px";
  preElement.style.boxSizing = "border-box";
  preElement.style.display = "flex";
  preElement.style.justifyContent = "center";
  preElement.style.alignItems = "center";

  // Create a text node with the ASCII representation and append it
  const textNode = document.createTextNode(asciiText);
  preElement.appendChild(textNode);

  // Add the pre element to the container
  container.appendChild(preElement);
}
