import { css } from '@emotion/react';
import svgCreate from '@/assets/images/toolbar-create.svg';
import svgSelect from '@/assets/images/toolbar-select.svg';
import ToolBarItem from '@/components/ToolBarItem';

const style = css`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 56px;
  padding: 8px;
  border-right: 1px solid #ebedf2;
  background: #fcfcfc;
  opacity: 1;
  user-select: none;

  h1 {
    margin: 0;
    color: #141746;
    font-size: 20px;
    font-weight: 600;
  }
`;

export default function ToolBar() {
  return (
    <div css={style}>
      <ToolBarItem name="select" alt="Select" icon={svgSelect} />
      <ToolBarItem name="create" alt="Create" icon={svgCreate} />
    </div>
  );
}
