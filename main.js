import "./styles/main.scss";

const fetchData = async () => {
  try {
    const resp = await fetch("data.json");
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await resp.json();
    const accordion = document.querySelector(".accordion");

    const openPanel = (panel) => {
      panel.style.maxHeight = panel.scrollHeight + "px";
    };

    const closePanel = (panel) => {
      panel.style.maxHeight = null;
    };

    data.blocks.forEach((section, index) => {
      const accordionSection = document.createElement("div");
      accordionSection.classList.add("accordion__section");

      const header = document.createElement("h2");
      const trigger = document.createElement("button");
      trigger.classList.add("accordion__trigger");
      trigger.textContent = section.heading;

      const panel = document.createElement("div");
      panel.classList.add("accordion__panel");

      const content = document.createElement("p");
      content.classList.add("accordion__content");
      content.textContent = section.content;

      trigger.addEventListener("click", () => {
        if (panel.style.maxHeight) {
          closePanel(panel);
        } else {
          // If the panel is closed, open it and close other open panels
          data.blocks.forEach((_, otherIndex) => {
            if (otherIndex !== index) {
              closePanel(
                accordion.children[otherIndex].querySelector(
                  ".accordion__panel"
                )
              );
            }
          });
          openPanel(panel);
        }
      });

      accordion.appendChild(accordionSection);
      accordionSection.appendChild(header);
      header.appendChild(trigger);
      accordionSection.appendChild(panel);
      panel.appendChild(content);
    });
  } catch (error) {
    console.error("Error loading accordion content", error);
  }
};

fetchData();
