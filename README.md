# Juno Technical Assessment Solution

## Development

To run this project on your local machine, follow these steps:

1. Clone this repository.
2. Open your terminal and navigate to the project directory.
3. Run the following commands:

```sh
npm run install
npm run dev
```

This will start the application in development mode.

## Table of contents

- [Overview](#overview)
  - [Built with](#built-with)
- [My process](#my-process)
  - [Accessibility](#accessibility)
  - [Possible Improvements](#possible-improvements)

## Overview

In this project, users can:

- Interact with an accordion that adheres to the provided design.
- Open and close accordion panels by clicking on the header.
- Navigate the accordion using the keyboard for accessibility.
- View content populated from the JSON file provided.
- Interact with the accordion on various screen sizes.

### 🧰&nbsp;Built with

- [Vite](https://vitejs.dev/)
- HTML
- SCSS
- Vanilla JavaScript

## 💭&nbsp;My process

I used `Vite` to quickly set up the project, which saved time on configuration. Vite also includes built-in support for `Sass` and automatically compiles to CSS, for this reason, you will notice that the SCSS is imported in my main.js file.

While working on this project, I revisited vanilla JavaScript since I hadn't used it in a while. I'm aware that it's possible to create an accordion with minimal JavaScript using the grid method but I thought this would be a good opportunity to brush up on my vanilla JS skills.

### Accessibility

One of the key aspects that I wanted to focus on was creating an accordion that adheres to [W3.org](https://www.w3.org/) best practices. I therefore set attributes on the accordion trigger and panel to include appropriate ARIA tags.

- I used the `aria-expanded` attribute to indicate whether the panel is open or closed.
- I linked the trigger and panel using the `aria-controls` attribute, providing a reference to the panel's ID to help users understand the relationship.
- I set the `aria-labelledby` attribute on the panel to associate it with the trigger's ID, aiding screen readers in understanding the heading-content relationship.
- I assigned `role="region"` to the panel to convey its purpose to screen readers, facilitating comprehension.
- I ensured that the trigger element is a button so keyboard users can easily navigate through the accordion.

### Possible Improvements

After completing the project, I identified areas for potential improvement:

1. Responsive Height: The current implementation dynamically adjusts the panel's height based on the screen size. However, it doesn't update the height if the window is resized. Implementing a listener to track window resize events and updating the panel's height accordingly would be beneficial.

2. Default Open Panel: Setting the first panel to open by default could have provided users with a clearer indication that the panels are collapsible and expandable.

3. External Data Fetching: While fetching data from a local JSON file works fine, for a more realistic scenario I could have improved the project by setting up an external data endpoint and fetching data from there. I haven't had experience setting up an external endpint before, however I have had a lot of experience fetching data, therefore this wasn't something I wanted to invest additional time on.
