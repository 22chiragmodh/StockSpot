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

#### 1. [Lottie React Native](https://github.com/lottie-react-native/lottie-react-native) 🔗

- **Why:**
  - Easily add high-quality animations to React Native apps.
  - Ideal for creating animated error highlights and other engaging animations.

- **Usage:**
  - Used for displaying animated error highlights view.
  - **Key point:** Enhances user experience with visually appealing animations.

#### 2. [Moti](https://moti.fyi/) 🔗

- **Why:**
  - Simplifies animations in React Native.
  - Provides a clean and concise API for creating complex animations with ease.

- **Usage:**
  - Used to show skeleton loading states in the UI.
  - **Key point:** Improves user experience by providing smooth and visually appealing loading states.

#### 3. [Tamagui](https://tamagui.dev/) 🔗

- **Why:**
  - A library for creating responsive and beautifully designed UIs with React Native.
  - Simplifies the theming and layout process with a compelling set of tools.

- **Usage:**
  - Used to create awesome UI and themes.
  - **Key point:** Streamlines the process of building responsive and visually consistent UIs.

#### 4. [SWR](https://swr.vercel.app/docs/getting-started) 🔗

- **Why:**
  - Offers powerful data fetching and caching capabilities, making it easy to handle remote data.
  - Efficiently manages caching, revalidation, focus tracking, and more.

- **Usage:**
  - Fetch data from APIs with minimal configuration and manage cache automatically.
  - **Key point:** Simplifies handling of remote data fetching while enhancing performance.

#### 5. [Expo Router](https://docs.expo.dev/tutorial/introduction/) 🔗

- **Why:**
  - Simplifies navigation in React Native projects by using a file-based routing system, similar to popular web frameworks.
  - Enhances maintainability and scalability of navigation logic.

- **Usage:**
  - Define routes in a more intuitive way using the file structure.
  - **Key point:** Provides a clean and maintainable way to manage navigation in React Native projects.



#### 6. [react-native-gifted-charts](https://www.npmjs.com/package/react-native-gifted-charts) 🔗

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
   
