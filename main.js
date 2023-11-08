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
      trigger.setAttribute("aria-expanded", true);
    };

    const closePanel = (panel, trigger) => {
      panel.style.maxHeight = null;
      trigger.classList.remove("accordion__trigger--open");
      trigger.classList.add("accordion__trigger--closed");
      trigger.setAttribute("aria-expanded", false);
    };

    data.blocks.forEach((section, index) => {
      const accordionSection = document.createElement("div");
      accordionSection.classList.add("accordion__section");

      const header = document.createElement("h2");
      const trigger = document.createElement("button");
      trigger.id = `accordion${index + 1}`;
      trigger.classList.add("accordion__trigger", "accordion__trigger--closed");
      trigger.textContent = section.heading;

      const chevron = document.createElement("span");
      chevron.classList.add("chevron");
      chevron.innerHTML =
        '<svg id="Layer_1" height="20" width="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" data-name="Layer 1"><path d="m12 18a1.021 1.021 0 0 1 -.707-.293l-10-10a1 1 0 0 1 1.414-1.414l9.293 9.293 9.293-9.293a1 1 0 1 1 1.414 1.414l-10 10a1.021 1.021 0 0 1 -.707.293z"/></svg>';

      const panel = document.createElement("div");
      panel.id = `panel${index + 1}`;
      panel.classList.add("accordion__panel");

      const content = document.createElement("p");
      content.classList.add("accordion__content");
      content.textContent = section.content;

      //   Set ARIA attributes for accessibility

      trigger.setAttribute("aria-expanded", false); // indicates if panel is open or closed
      trigger.setAttribute("aria-controls", `panel${index + 1}`); // associates the trigger button with the panel it controls
      panel.setAttribute("aria-labelledby", `accordion${index + 1}`); // connects panel with trigger button to make it easier for screen readers
      panel.setAttribute("role", "region"); // indicates panel is a distinct section of content on the page to help screen readers understand the purpose of the element

      //   Create elements for accordion

      accordion.appendChild(accordionSection);
      accordionSection.appendChild(header);
      header.appendChild(trigger);
      trigger.appendChild(chevron);
      accordionSection.appendChild(panel);
      panel.appendChild(content);

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
    });
  } catch (error) {
    console.error("Error loading accordion content", error);
  }
};

fetchData();
