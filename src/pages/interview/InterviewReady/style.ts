import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { commonButtonStyle } from "styles/common";
import { ToastOptions } from "react-toastify";

export const Wrapper = styled.section`
  width: 1440px;
`;

export const ConfirmText = styled.p`
  font-size: 1.4rem;
  text-align: center;
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
  position: relative;
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
  width: 640px;
  height: 480px;
`;

export const wrapStyle = css`
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--box-shadow);
`;

export const VideoWrap = styled.div`
  ${commonStyle}
  ${wrapStyle}
  border-radius: 16px;
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

export const ImageWrap = styled.div<{ bgImg: string }>`
  ${commonStyle}
  ${wrapStyle}

  background-image: ${({ bgImg }) => `url(${bgImg})`};
  background-size: cover;
  background-repeat: no-repeat;
  background-position-x: center;
  background-position-y: 20%;
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
`;

export const CancelButton = styled.button`
  ${commonButtonStyle}
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(--light-alert);
    color: var(--main-white);
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
  font-size: 1.4rem;
  font-weight: 500;

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

export const SelectButton = styled.button`
  ${commonButtonStyle}
  position: absolute;
  top: -82px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  box-shadow: var(--box-shadow);
  font-size: 1.4rem;
  font-weight: 500;

  &:hover {
    background-color: var(--main-blue);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-blue);
  }
`;

export const MiniProfile = styled.span`
  position: absolute;
  bottom: -40px;
  width: 272px;
  word-break: keep-all;
  font-size: 1.4rem;
  line-height: 1.2;
  color: var(--font-gray);
`;
