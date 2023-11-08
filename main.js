import "./styles/main.scss";

const fetchData = async () => {
  try {
    const resp = await fetch("data.json");
    if (!resp.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await resp.json();
    const accordion = document.querySelector(".accordion");

    data.blocks.forEach((section) => {
      const accordionSection = document.createElement("div");
      accordionSection.classList.add("accordion_item");

      // For accordion header, wrap button in heading
      const header = document.createElement("h2");
      const trigger = document.createElement("button");
      trigger.classList.add("accordion__trigger");
      trigger.textContent = section.heading;

      const panel = document.createElement("div");
      panel.classList.add("accordion__panel");

      const content = document.createElement("p");
      content.classList.add("accordion__content");
      content.textContent = section.content;

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
