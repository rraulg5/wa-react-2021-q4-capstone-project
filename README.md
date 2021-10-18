# Wizeline Academy - React Bootcamp 2021/Q4

## Introduction

Thank you for participating in the 2021 - Q4 React Bootcamp! Here you will find all the instructions to complete your **Capstone Project**.

The purpose of this project is for you to demonstrate your React skills. This is your chance to show off everything you have learned during this bootcamp!

You will build and deliver an entire React application on your own from scratch. The project is divided into weekly deliverables, in which you will apply the concepts learned in the assignments and live sessions. Each deliverable has its own information on what and how we expect you to deliver throughout the bootcamp.

We hope you find this project challenging and engaging!

## The Project

Create an Ecommerce Store where you can buy furniture and home decor items. It should have the following sections:

- Home Page
- Product List Page
- Product Detail Page
- Search Results Page
- Shopping Cart Page
- Checkout Page

We don’t want to limit you or bias your implementation by providing some demo application with a specific design, but instead, ask you to choose your own and build it from scratch. Here’s a link where you can find great ideas and inspiration for your UI design: https://dribbble.com/search/ecommerce

## Deliverables

We provide the delivery dates to plan accordingly; please take this project seriously and try to make progress constantly. If you are struggling with something or get stuck at some point, please schedule a mentoring session to get help on time. Feel free to use the slack channel available.

- [**Deliverable 1 - (Due Date: Monday, October 18th)**](#deliverable-1---due-date-monday-october-18th)
- [**Deliverable 2 - (Due Date: Monday, October 25th)**](#deliverable-2---due-date-monday-october-25th)
- **Deliverable 3 - (Due Date: Monday, November 1st)**
- **Deliverable 4 - (Due Date: Monday, November 8th)**
- **Final Deliverable - (Due Date: Monday, November 15th)**

## Deliverable 1 - (Due Date: Monday, October 18th)

**Related topics**: React Fundamentals & CSS Styles in React

In this assignment, you will create the initial version of your Ecommerce Store. It should contain the following:

- Home Page (prototype)

### Before you start

<ol>
  <li>Fork <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project">this repo</a> into your GitHub account
  <li>Please make sure that your new repo is publicly accessible 
  <li>Create a new branch with the name <b>“feat/deliverable1”</b> derived from <b>main</b> on your forked repository
  <li>Start working on the requirements specified below
</ol>

### Requirements

<ol>
  <li>
    Create the <b>UI layout</b> for your app, it should include the following elements:
    <ul>
      <li>1.1. A <b>Header</b> containing your Ecommerce Store logo/name, a search input, and a shopping cart icon. For now, all the elements in the header should be disabled, you only need to create the corresponding UI elements without the functionality.</li>
      <li>1.2. The <b>Content</b> view corresponding to the section that will be rendered (in this case, the Home Page)</li>
      <li>1.3. A <b>Footer</b> containing the message “Ecommerce created during Wizeline’s Academy React Bootcamp”</li>
    </ul>
  </li>
  <li>
    Create the <b>Home Page</b> including the following blocks:
    <ul>
      <li>2.1. A <b>Slider</b> to display the featured banners from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/featured-banners.json">this mock file</a></li>
      <li>2.2. A <b>Carousel</b> or <b>Grid</b> of the product categories from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/product-categories.json">this mock file</a></li>
      <li>2.3. A <b>Grid</b> of <b>Featured Products</b> from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/featured-products.json">this mock file</a>. For each element on this grid, you should show at least the main image of the product, its name, category, and price.</li>
    </ul>
  </li>
</ol>

### Notes

- Try to keep the use of third-party libraries to the minimum, especially the ones related to the topics covered in our bootcamp. Please don’t use any UI library such as Bootstrap or Material UI, we want you to create all of your styles from scratch using the styling techniques learned.
- Please make sure that your UI is responsive and all the elements adapt to different screen sizes (Smartphone, Tablet, Desktop).
- Please make sure that no warnings or errors are logged in the browser console

### Evaluation Criteria

- The Header is rendered correctly (25 points)
- The Featured Banners Slider is rendered correctly using the data from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/featured-banners.json">the mock file</a> (20 points)
- The Categories Carousel/Grid is rendered correctly using the data from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/product-categories.json">the mock file</a> (20 points)
- The Featured Products Grid is rendered correctly using the data from <a href="https://github.com/jparciga/wa-react-2021-q4-capstone-project/blob/main/mocks/en-us/featured-products.json">the mock file</a> (30 points)
- The Footer is rendered correctly (5 points)

### Bonus

- Unit Test to validate that the Ecommerce Store logo/name appears correctly in the Header. (10 points)

### Submitting your Deliverable

- Once you’ve covered all the <a href="#requirements">requirements specified above</a> and completed all the bullets on the <a href="#evaluation-criteria">Evaluation Criteria</a> section, push your changes to your branch and open a **PR** that can be merged into your **main** branch of your own GitHub repository.
- Deploy your app into a hosting service such as Netlify, Firebase, Heroku, GitHub Pages, etc.
- Fill <a href="https://docs.google.com/forms/d/e/1FAIpQLSc3So94j4yoKcyPU1rDQvXweCdn59eoaGeD6tByPRgX_Osmnw/viewform">this Google Form</a> to submit your project before **October 18th at 8:00 AM (CST)**

## Deliverable 2 - (Due Date: Monday, October 25th)

**Related topics:** React lifecycle & Hooks

In this assignment, you will continue working on your Ecommerce Store. It should contain the following:

- Home Page (prototype from previous deliverable)
- Product List Page (prototype)

### Before you start

<ol>
  <li>Merge your branch from the previous deliverable into main in your own GitHub repo</li>
  <li>Create a new branch with the name “feat/deliverable2” derived from main on your repo</li>
  <li>Read carefully all the instructions and notes for this deliverable</li>
  <li>Start working on the requirements specified below</li>
</ol>

### Requirements

1. Add a button with the text “View all products” below your Featured Products Grid on the Home Page.
2. Create a new component for your Product List that returns this React element for now: `<h1>This is the Product List Page</h1>`
3. Modify your App component to implement a conditional rendering logic to navigate through your pages. In this case, you will only need to be able to navigate from Home Page to Product List Page and from Product List Page to Home Page.
4. Add an event handler to your “View all products” button so you can navigate to your Product List Page when you click on it.
5. Test your conditional rendering logic to navigate to the Product List Page. After clicking on the “View all products” button, you should see the following message “This is the Product List Page” replacing the Home Page.
6. Add an event handler to your Ecommerce logo in the header so you can navigate to your Home Page when you click on it.
7. Test your conditional rendering logic to navigate to the Home Page. After clicking on the Ecommerce logo in the header, you should see your Home Page content, replacing the Product List Page.
8. Modify your Product List Page component to contain the following blocks:

- 8.1. A **Sidebar** (left or right side, is up to you), it should contain a list of categories from [this mock file](/blob/main/mocks/en-us/product-categories.json). The elements in this list will work as filters for your products, so, you should render the name of each category and attach to it an empty handler for the onClick event.
- 8.2. A **Grid** of Products from [this mock file](/blob/main/mocks/en-us/products.json). For each element on this grid, you should show at least the main image of the product, its name, category, and price.

9. Add an event handler to the categories in your sidebar, so when you click on each of them, the products in the grid are filtered. The behavior of this filters should be the following:

- 9.1. By default each category filter should be disabled.
- 9.2. When you click on the category filter for the first time, that filter will be enabled and applied to the product grid.
- 9.3. When the filter is active/enabled, you should apply some styling to the selected category so it’s easier to distinguish between active and inactive states.
- 9.4. You can have multiple filters enabled at the same time, so when this happens, the products that will be shown in the grid should have at least one of the categories from the active filters.
- 9.5. To disable a filter, you will have to click on it and it should be removed from the active filters.

10. Add pagination controls to the bottom of your list. For now, you just need to create the UI for these elements, you don’t need to implement the pagination logic on your grid yet.

### Notes

- You won’t need to implement React Router library to navigate through your pages yet, you will only need to implement some conditional rendering logic to show the component for the page that you want to see.
- You should implement functional components with hooks
- Try to keep the use of third-party libraries to the minimum, especially the ones related to the topics covered in our bootcamp. **Please don’t use any components library such as Bootstrap or Material UI.**
- We want you to create all of your styles from scratch using the styling techniques learned, you can use any of the following styling approaches: Plain CSS with classnames, CSS pre-processors, CSS Modules, or CSS-in-JS (styled-components, emotion, or any other library), is totally up to you!
- Please make sure that your UI is responsive and all the elements adapt to different screen sizes (Smartphones, Tablet, and Desktop).
- Please make sure that no warnings or errors are logged in the browser console.

### Evaluation Criteria

- Navigation from Home Page to Product List Page works correctly (15 points)
- Navigation from Product List Page to Home Page works correctly (15 points)
- The Sidebar with the list of categories is rendered correctly using the data from [the mock file](/blob/main/mocks/en-us/product-categories.json) (10 points)
- The Products Grid is rendered correctly using the data from [the mock file](/blob/main/mocks/en-us/products.json) (25 points)
- Filtering behaviors are implemented correctly according to the requirements (30 points)
- Pagination controls are rendered correctly (5 points)

### Bonus

- Emulate loading state for the Products Grid. You should show a loader component immediately after you navigate to the Product List Page and 2 seconds after that, you should remove that loader and show all the products from the mock file (20 points)

### Submitting your Deliverable

- Once you’ve covered all the [requirements specified above](#requirements-1) and completed all the bullets on the [Evaluation Criteria](#evaluation-criteria-1) section, push your changes to your branch and **open a PR that can be merged into your main branch of your own GitHub repository**.
- Deploy your app into a hosting service such as Netlify, Firebase, Heroku, GitHub Pages, etc.
- Fill [this Google Form](https://docs.google.com/forms/d/e/1FAIpQLSc3So94j4yoKcyPU1rDQvXweCdn59eoaGeD6tByPRgX_Osmnw/viewform) to submit your project before **October 25th at 8:00 AM (CST)**
