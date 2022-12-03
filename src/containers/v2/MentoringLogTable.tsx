/* eslint-disable react/jsx-props-no-spreading */
import { Column, useTable } from 'react-table';
import styled from 'styled-components';

interface Data {
  topic: string;
  status: string;
  date: string;
}

const data: Data[] = [
  { topic: '취업1', status: '완료', date: '22.10.28' },
  { topic: '취업2', status: '완료', date: '22.10.28' },
  { topic: '취업3', status: '완료', date: '22.10.28' },
  { topic: '취업4', status: '완료', date: '22.10.28' },
  { topic: '취업5', status: '완료', date: '22.10.28' },
];

const columns: Column<Data>[] = [
  {
    Header: '주제',
    accessor: 'topic',
  },
  {
    Header: '상태',
    accessor: 'status',
  },
  {
    Header: '일시',
    accessor: 'date',
  },
];

export default function MentoringLogTable() {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable<Data>({ columns, data });

  return (
    <Table {...getTableProps()}>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => {
                return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

const Table = styled.table`
  ${({ theme }) => theme.typography.middleSebang};

  width: 30%;
  border-top: 1px solid #444444;
  border-collapse: collapse;
  th,
  td {
    border-bottom: 1px solid #aaaaaa;
    padding: 10px;
  }
`;
