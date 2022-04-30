import * as React from 'react';
import isWeekend from 'date-fns/isWeekend';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import StaticDatePicker from '@mui/lab/StaticDatePicker';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange} from '@mui/material/colors';
import StaticTimePicker from '@mui/lab/StaticTimePicker';
import styles from "./booking.module.css";

const theme = createTheme({
  palette: {
    primary: {
      main: orange[600],
    },
  },
});

export default function StaticDatePickerLandscape({onvalueChange}) {
  
  const [value, setValue] = React.useState<Date | null>(new Date());
  const [valueTime, setValueTime] = React.useState<Date | null>(new Date());
  const minDate=new Date();
  const maxDate=new Date();

  React.useEffect(() => {
    onvalueChange(String(value.toLocaleDateString())+" "+String(new Date(0,0,0,valueTime.getHours(),0,0).toLocaleTimeString()));
  }, [String(value.toLocaleDateString())+" "+String(new Date(0,0,0,valueTime.getHours(),0,0).toLocaleTimeString())])
  return (
    <ThemeProvider theme={theme}>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <div className={styles.datepicker}>
      <StaticDatePicker<Date>
        orientation="landscape"
        openTo="day"
        minDate={new Date(minDate.setMonth(minDate.getMonth()+1))}
        maxDate={new Date(maxDate.setMonth(maxDate.getMonth()+2))}
        value={minDate}
        shouldDisableDate={isWeekend}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
      </div>
      <div className={styles.timepicker}>
      <StaticTimePicker 
      views={["hours"]}
      minTime={new Date(0,0,0,11,0,0)}
      maxTime={new Date(0,0,0,22,0,0)}
      displayStaticWrapperAs="mobile"
      value ={new Date(0,0,0,valueTime.getHours(),0,0)}
      onChange={(newTime) => {
        setValueTime(newTime);
      }}
      renderInput={props => <TextField {...props} />}>
      </StaticTimePicker>
      </div>
      
    </LocalizationProvider>
    <div className={styles.text}>
    Date choisie: {String(value.toLocaleDateString())}
    <br/>
    Heure choisie: {String(new Date(0,0,0,valueTime.getHours(),0,0).toLocaleTimeString())}
    </div>
    </ThemeProvider>
  );
}