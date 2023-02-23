import styled from "@emotion/styled";
import { css } from "@emotion/react";

const commonFlexStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
`;

export const FormWrap = styled.div`
  display: flex;
  flex-flow: column nowrap;
  align-items: flex-start;
  margin: 42px auto 160px;
`;

export const H2 = styled.h2`
  font-weight: 500;
  font-size: 24px;
  margin: 0;
  `;

export const InputWrap = styled.div`
  position: relative;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: center;
  width: 560px;
  margin-top: 36px;
`;

export const Label = styled.label`
  text-align: left;
  font-size: 16px;
  color: var(--main-black);
`;

export const Input = styled.input`
  width: 480px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid var(--main-black);
  padding-left: 10px;
`;

export const KeywordButton = styled.button`
  position: absolute;
  right: -176px;
  ${commonFlexStyle};
  width: 160px;
  height: 32px;
  color: var(--main-white);
  background-color: var(--main-black);
  border-radius: var(--button-border-radius);
`;

export const Small = styled.small`
  position: absolute;
  bottom: -26px;
  left: 65px;
  font-size: 12px;
  color: var(--font-gray);
`;

export const KeywordWrap = styled.div`
  position: absolute;
  ${commonFlexStyle};
  top: 300px;
  left: 132px;
  margin-top: 26px;
`;

export const Keyword = styled.div`
  ${commonFlexStyle};
  height: 28;
  background-color: var(--main-white);
  border: 1px solid var(--main-gray);
  border-radius: 3px;
  box-shadow: var(--box-shadow);
  font-size: 14px;
  color: var(--font-gray);
  margin-right: 24px;
  padding: 6px 8px;

  & .closeButton {
    background-color: transparent;
    padding: 4px;
    color: var(--font-gray);
    transform: translateY(1px);
  }
`;

export const ButtonWrap = styled.div`
  ${commonFlexStyle};
  margin: 0 auto;
`;

export const commonButtonStyle = css`
  ${commonFlexStyle};
  width: 300px;
  height: 54px;
  border-radius: var(--button-border-radius);
`;

export const ConfirmButton = styled.button`
  ${commonButtonStyle}
  margin-right: 48px;

  background-color: var(--main-orange);
  color: var(--main-white);

  transition: all 200ms;

  &:hover {
    background-color: var(--light-orange);
  }
  &:active {
    background-color: var(--push-orange);
  }
`;

export const CancelButton = styled.button`
  ${commonButtonStyle}

  background-color: var(--main-white);
  color: var(--main-black);
  border: 1px solid var(--main-black);

  transition: all 200ms;

  &:hover {
    background-color: var(--main-alert);
    color: var(--main-white);
  }
  &:active {
    background-color: var(--push-alert);
  }
`;
