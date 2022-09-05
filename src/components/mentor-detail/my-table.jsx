import { appointmentsInterface } from '../../interface/mentor-detail/appointments.interface';
import { useTable } from 'react-table';
import { useMemo } from 'react';

function MyTableComponents({ data }: any) {
  const columns = useMemo(
    () => [
      {
        startDate: new Date(2018, 5, 29, 14, 30),
        endDate: new Date(2018, 5, 29, 15, 0),
        // location: 'Room 2',
      },
      {
        // title: 'Website Re-Design Plan',
        startDate: new Date(2018, 5, 25, 9, 30),
        endDate: new Date(2018, 5, 25, 11, 30),
        // id: 0,
        // location: 'Room 1',
      },
      {
        // title: 'Book Flights to San Fran for Sales Trip',
        startDate: new Date(2018, 5, 25, 12, 0),
        endDate: new Date(2018, 5, 25, 13, 0),
        // id: 1,
        // location: 'Room 1',
      },
      {
        startDate: new Date(2018, 5, 24, 12, 0),
        endDate: new Date(2018, 5, 24, 13, 0),
      },
    ],
    [],
  );
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div>
      <table></table>
    </div>
  );
}

export default MyTableComponents;
