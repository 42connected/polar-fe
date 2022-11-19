import Button from '../Button';
import defaultTheme from '@/styles/themeV2';

interface Props {
  status:
    | '확정'
    | '작성 완료'
    | '완료'
    | '작성 불가'
    | '취소'
    | '작성 필요'
    | '대기중'
    | '작성중'
    | '수정 기간';
}

const statusColor = {
  확정: defaultTheme.colors.polarBlue,
  '작성 완료': defaultTheme.colors.polarBlue,
  완료: defaultTheme.colors.darkGray,
  '작성 불가': defaultTheme.colors.darkGray,
  취소: defaultTheme.colors.red,
  '작성 필요': defaultTheme.colors.yellow,
  대기중: defaultTheme.colors.green,
  작성중: defaultTheme.colors.green,
  '수정 기간': defaultTheme.colors.brightBlue,
};

function StatusButton(props: Props) {
  const { status } = props;
  return (
    <Button
      type="button"
      size="small"
      radius="0.5rem"
      shadow="false"
      fullWidth
      bgColor={statusColor[status]}
    >
      {status}
    </Button>
  );
}

export default StatusButton;
