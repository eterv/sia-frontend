import { css } from '@emotion/react';

const style = css`
  display: flex;
  align-items: center;
  height: 64px;
  min-height: 64px;
  padding-left: 56px;
  border-bottom: 1px solid #ebedf2;
  background: #fcfcfc;
  opacity: 1;

  h1 {
    margin: 0;
    color: #141746;
    font-size: 20px;
    font-weight: 600;
  }
`;

export default function Title() {
  return (
    <div css={style}>
      <h1>Dataset Label</h1>
    </div>
  );
}
