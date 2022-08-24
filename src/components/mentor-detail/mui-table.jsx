import React from "react";
import { render } from "react-dom";
import Paper from "@material-ui/core/Paper";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  WeekView,
  Appointments
} from "@devexpress/dx-react-scheduler-material-ui";
import TableCell from "@material-ui/core/TableCell";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { purple } from "@material-ui/core/colors";

export const appointments = [
  {
    title: "Website Re-Design Plan",
    startDate: new Date(2018, 5, 25, 9, 30),
    endDate: new Date(2018, 5, 25, 11, 30),
    id: 0,
    location: "Room 1"
  },
  {
    title: "Book Flights to San Fran for Sales Trip",
    startDate: new Date(2018, 5, 25, 12, 0),
    endDate: new Date(2018, 5, 25, 13, 0),
    id: 1,
    location: "Room 1"
  },
]

const theme = createMuiTheme({
  palette: { type: "light", primary: purple }
});

const dayScaleCell = ({ startDate, endDate, today }) => (
  <TableCell>
    <span>
      {Intl.DateTimeFormat("en-US", { weekday: "short" }).format(startDate)}
    </span>
  </TableCell>
);

class TimeTableMuiComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    console.log(props.appointments)
    this.state = {
      data: props.appointments
    };
  }
  render() {
    const { data } = this.state;

    return (
      <MuiThemeProvider theme={theme}>
        <Paper>
          <Scheduler data={data}>
            <ViewState currentDate="2018-06-28" />
            <WeekView
              startDayHour={9}
              endDayHour={19}
              dayScaleCellComponent={dayScaleCell}
            />
            <Appointments />
          </Scheduler>
        </Paper>
      </MuiThemeProvider>
    );
  }
}

export default TimeTableMuiComponent;