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
import { MuiThemeProvider, createTheme } from "@material-ui/core/styles";




const myTheme = createTheme({
    palette: {
        primary: { main: "#3355D" }
    }
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
      console.log(props.appointments);
    this.state = {
        data: props.appointments,
    };
  }
  render() {
    const { data } = this.state;

    return (
        <MuiThemeProvider theme={myTheme}>
        <Paper>
          <Scheduler data={data}>
            <ViewState currentDate="2018-06-21" />
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