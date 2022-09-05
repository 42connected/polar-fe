import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

function MarkdownRender(props: any) {
  const { markDown } = props;
  return (
    <Markdown>
      <ReactMarkdown>{markDown}</ReactMarkdown>
    </Markdown>
  );
}

const Markdown = styled.div`
  font-size: 1.4rem;
`;

export default MarkdownRender;
