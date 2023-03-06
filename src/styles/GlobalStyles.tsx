import { Global, css } from "@emotion/react";

const globalStyles = css`
  @import url("https://fonts.googleapis.com/css2?family=Archivo:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=Roboto:wght@500&display=swap");

  :root {
    /** 색상 변수 */
    --main-orange: #ff9900;
    --main-blue: #146eb4;
    --main-black: #181818;
    --main-gray: #cccccc;
    --main-white: #ffffff;
    --font-gray: #777777;
    --push-blue: #0065b4;
    --push-orange: #ed8e00;
    --light-orange: #ffa620;
    --light-blue: #1785db;
    --push-gray: #cccccc;
    --main-alert: #dc3545;
    --push-alert: #c20013;
    --light-alert: #ff3c4e;

    --github-black: #24292f;
    --kakao-black: #000000d8;
    --kakao-yellow: #fee500;

    /** 스타일 변수 */
    --box-shadow: 0px 6px 24px 0px rgba(0, 0, 0, 0.03);
    --button-border-radius: 5px 15px;

    font-family: "Archivo", "Spoqa Han Sans Neo", sans-serif;
    font-size: 16px;
    line-height: 24px;
    font-weight: 500;

    /* color-scheme: light dark; */
    color: var(--main-black);
    background-color: var(--main-white);

    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
    overflow-x: hidden;

    *::selection {
      color: var(--main-white);
      background: var(--main-blue);
    }

    /* react-toastify style override */
    .Toastify__toast {
      border-radius: 10px;
      line-height: 1.5;
      color: #585858;
      font-size: 12px;
    }
    .progress-bar {
      background: linear-gradient(
        -90deg,
        var(--main-alert) 0%,
        var(--main-alert) 35%,
        #fafafa 100%
      );
    }
  }

  div.root {
    overflow-x: hidden;
  }

  a {
    color: var(--main-black);
    text-decoration: inherit;
    transition: color 200ms;
  }
  a:hover {
    color: var(--light-blue);
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
    font-family: inherit;
    background-color: var(--main-black);
    cursor: pointer;
    transition: border-color 0.25s;
    outline: none;
  }
  button:hover {
    outline: none;
  }
`;

const GlobalStyles = () => {
  return <Global styles={globalStyles} />;
};

export default GlobalStyles;
