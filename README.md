# Stocks Application Documentation

### Installation

1. **Create a New Expo Project**

    ```sh
    npx create-expo-app MyNewApp --template
    ```

2. **Navigate into Your Project Directory**

    ```sh
    cd MyNewApp
    ```

3. **Install Dependencies**

    To run the project on the web, install the following dependencies:

    ```sh
    npx expo install react-dom react-native-web @expo/metro-runtime
    ```

### Custom Fonts

This project uses the Axiforma font.

1. **Download the Font Files**

    Download the Axiforma font files and place them in an `assets/fonts` directory within your project.

### Third-Party Libraries Used

This project utilizes several third-party libraries to enhance its functionality and development experience:

#### 1. [React Native Paper](https://callstack.github.io/react-native-paper/docs/guides/getting-started/) 🔗

- **Why:**
  - Provides a collection of customizable and easily implementable UI components.
  - Designed to follow Material Design guidelines, making it ideal for creating modern and appealing user interfaces.

- **Usage:**
  - Used for creating consistent and visually appealing UI components like buttons, text inputs, and other interactive elements.
  - **Key point:** Simplifies the creation of a professional-looking UI with minimal configuration.

#### 2. [Expo Router](https://docs.expo.dev/tutorial/introduction/) 🔗

- **Why:**
  - Simplifies navigation in React Native projects by using a file-based routing system, similar to popular web frameworks.
  - Enhances maintainability and scalability of navigation logic.

- **Usage:**
  - Define routes in a more intuitive way using the file structure.
  - **Key point:** Provides a clean and maintainable way to manage navigation in React Native projects.

#### 3. [SWR](https://swr.vercel.app/docs/getting-started) 🔗

- **Why:**
  - Offers powerful data fetching and caching capabilities, making it easy to handle remote data.
  - Efficiently manages caching, revalidation, focus tracking, and more.

- **Usage:**
  - Fetch data from APIs with minimal configuration and manage cache automatically.
  - **Key point:** Simplifies handling of remote data fetching while enhancing performance.

#### 4. [react-native-gifted-charts](https://www.npmjs.com/package/react-native-gifted-charts) 🔗

- **Why:**
  - Provides beautifully crafted and easy-to-use chart components for React Native.
  - Ideal for creating rich data visualizations without complex implementations.

- **Usage:**
  - Render various types of charts, such as bar charts, line charts, and pie charts.
  - **Key point:** Enables the creation of engaging, interactive data visualizations seamlessly.

### Running the Project

To start the project, run:

```sh
npx expo start
```
   
