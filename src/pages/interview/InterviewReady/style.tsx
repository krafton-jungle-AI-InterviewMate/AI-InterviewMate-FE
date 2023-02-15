import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { commonButtonStyle } from "styles/common";
import { ToastOptions } from "react-toastify";

export const Wrapper = styled.section`
  width: 1000px;
`;

export const ReadyContainer = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-top: 100px;
`;

export const Profile = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;

  & dl {
    margin-top: 49px;
  }
  & dd {
    margin-left: 0;
  }
`;

export const commonStyle = css`
  position: relative;
  text-align: center;
  z-index: 9;
  width: 272px;
  height: 204px;
`;

export const wrapStyle = css`
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

export const VideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  border-radius: 5px;
  overflow: hidden;
  box-shadow: var(--box-shadow);

  & video {
    ${commonStyle}
  }
`;

export const Canvas = styled.canvas`
  ${commonStyle}
  position: absolute;
  left: 0;
  right: 0;

  /* border: 2px dashed gray; */
`;

export const ImageWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}

  & img {
    width: 100%;
  }
`;

export const FlexContainer = styled.div`
  display: flex;
  flex-flow: row-reverse nowrap;
  margin-top: 160px;
`;

export const ButtonBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 430px;
`;

export const CancelButton = styled.button`
  ${commonButtonStyle}
  background-color: var(--main-white);
  border: 1px solid var(--main-black);

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
    border-color: transparent;
  }
  &:active {
    background-color: var(--push-alert);
  }
`;

export const GoButtonWrap = styled.div`
  position: relative;
`;

export const GoButton = styled.button`
  ${commonButtonStyle}
  background-color: var(--main-orange);
  color: var(--main-white);
  margin-left: 28px;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }

  ${({ disabled }) => disabled && css`
    background-color: var(--push-gray);
    cursor: not-allowed;

    &:hover {
    background-color: var(--push-gray);
    }
    &:active {
      background-color: var(--push-gray);
    }
  `};
`;

export const Information = styled.div`
  position: absolute;
  left: 24px;
  bottom: -40px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  width: 216px;
  color: var(--font-gray);

  & small {
    display: block;
    width: 100%;
    font-size: 12px;
    text-align: left;
    margin-left: 4px;
    line-height: 1.2;
  }
`;

export const toastOptions: ToastOptions = {
  position: "top-right",
  autoClose: 2000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
  theme: "light",
  progressClassName: "progress-bar",
  type: "warning",
};
