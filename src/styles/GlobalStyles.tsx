import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  :root {
    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: #242424;

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  a:hover {
    color: #535bf2;
  }

  html,
  body {
    min-height: 100vh;
    padding: 0;
    margin: 0;
  }

  body {
    /* display: flex;
		place-items: center; */
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    background-color: #1a1a1a;
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: #646cff;
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: #213547;
      background-color: #ffffff;
    }
    a:hover {
      color: #747bff;
    }
    button {
      background-color: #f9f9f9;
    }
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
