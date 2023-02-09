import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&display=swap");
  @import url(//spoqa.github.io/spoqa-han-sans/css/SpoqaHanSansNeo.css);

  :root {
    /** 색상 변수 */
    --main-orange: #ff9900;
    --main-blue: #146eb4;
    --main-black: #181818;
    --main-gray: #eeeeee;
    --main-white: #ffffff;
    --font-gray: #777777;
    --push-blue: #0065b4;
    --push-orange: #ed8e00;
    --light-orange: #ffa620;
    --light-blue: #1785db;
    --push-gray: #d9d9d9;
    --main-alert: #dc3545;
    --push-alert: #c20013;
    --light-alert: #ff3c4e;
    /** 스타일 변수 */
    --box-shadow: 0px 6px 24px 0px rgba(var(--main-black), 0.03);
    --button-border-radius: 15px 30px;

    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 400;

    color-scheme: light dark;
    color: rgba(255, 255, 255, 0.87);
    background-color: var(--main-black);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;

    *::selection {
      color: var(--main-white);
      background: var(--main-blue);
    }
  }

  a {
    font-weight: 500;
    color: var(--main-black);
    text-decoration: inherit;
  }
  a:hover {
    color: var(--light-black);
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
    background-color: var(--main-black);
    cursor: pointer;
    transition: border-color 0.25s;
  }
  button:hover {
    border-color: var(--push-blue);
  }
  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }

  @media (prefers-color-scheme: light) {
    :root {
      color: var(--main-black);
      background-color: var(--main-white);
    }
    a:hover {
      color: var(--main-black);
    }
    button {
      background-color: var(--push-gray);
    }
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
