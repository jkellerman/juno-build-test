import "./styles/main.scss";

const fetchData = async () => {
  try {
    const resp = await fetch("data.json");
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await resp.json();
    const accordion = document.querySelector(".accordion");

    const openPanel = (panel, trigger) => {
      panel.style.maxHeight = panel.scrollHeight + "px";
      trigger.classList.add("accordion__trigger--open");
      trigger.classList.remove("accordion__trigger--closed");
    };

    const closePanel = (panel, trigger) => {
      panel.style.maxHeight = null;
      trigger.classList.remove("accordion__trigger--open");
      trigger.classList.add("accordion__trigger--closed");
    };

    data.blocks.forEach((section, index) => {
      const accordionSection = document.createElement("div");
      accordionSection.classList.add("accordion__section");

      const header = document.createElement("h2");
      const trigger = document.createElement("button");
      trigger.classList.add("accordion__trigger", "accordion__trigger--closed");
      trigger.textContent = section.heading;

      const panel = document.createElement("div");
      panel.classList.add("accordion__panel");

      const content = document.createElement("p");
      content.classList.add("accordion__content");
      content.textContent = section.content;

      trigger.addEventListener("click", () => {
        if (panel.style.maxHeight) {
          closePanel(panel, trigger);
        } else {
          // If the panel is closed, open it and close other open panels
          data.blocks.forEach((_, otherIndex) => {
            if (otherIndex !== index) {
              closePanel(
                accordion.children[otherIndex].querySelector(
                  ".accordion__panel"
                ),
                accordion.children[otherIndex].querySelector(
                  ".accordion__trigger"
                )
              );
            }
          });
          openPanel(panel, trigger);
        }
      });

      //   Create elements for accordion

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
