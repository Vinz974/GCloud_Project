import { useWeb3React } from "@web3-react/core"
import MetaMask  from "../components/Metamask"
// const MetamaskLogo = require("./favicon.svg")
import React from 'react' 
import styles from "./index.module.css";
import DatePicker from "../components/booking";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { grey, orange} from '@mui/material/colors';
import validator from "validator";
import {Button, TextField} from '@mui/material';
import { useAddUserMutation, useAddBookingMutation, useCheckIfAddressInDatabaseQuery, useCheckIfBookingInDatabaseQuery  } from "../generated/graphql";



function App() {

  
  /* const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
      headers: {
        AccessControlAllowOrigin:  "*",
        AccessControlAllowMethods: "POST",
        AccessControlAllowHeaders: "Content-Type",
        Authorization:"http://localhost:4000/graphql"
      },
    }
  }); */
/* 
const queryClient = new QueryClient();

const API_URL = `http://localhost:4000/graphql`;

const graphQLClient = new GraphQLClient(API_URL); */

/* async function useGetPost(address) {
  return useQuery(["get-post", address], async () => {
    const { getPost } = await graphQLClient.request(
      gql`
        query CheckIfAddressInDatabase($address: string!) {
          CheckIfAddressInDatabase(address: $address) 
        }
      `,
      { address }
    );
    return getPost;
  });
}

console.log(useGetPost("12345")); */

  const [,addUser] = useAddUserMutation();
  const [,addBooking]= useAddBookingMutation();
  const [,checkIfAddressInDatabase] = useCheckIfAddressInDatabaseQuery();
  const [,checkIfBookingInDatabase] = useCheckIfBookingInDatabaseQuery();
  
  async function Subscription(address:string,date:string,email:string,emailError:string){
    
  
    console.log(await addUser({address,email})); 
    console.log(await addBooking({date:date,address:address}))
   
   
    console.log("Address: "+address+" Date: "+date+" Email: "+email+" EmailError: "+emailError)
    console.log( checkIfBookingInDatabase({date:date}));
    console.log(checkIfAddressInDatabase({address:address}));
    /* console.log(verifBooking);
    console.log(verifAddress); */
      /* if(emailError=='Valid Email!')
    {
      if(address!=""){
        if(verifBooking.data.checkIfBookingInDatabase =="true" ){
          return "Horaire déjà prise";
        }
        else{
          if(verifAddress.data.checkIfAddressInDatabase=="false"){
            const verif = await addUser({address:address,email:email});
            if(verif.data.AddUser){
              addBooking({address:address,date:date});
            }
          }
          else{
            const verif=await addBooking({address:address,date:date});
            if(verif.data.AddBooking){
              return "You successfully subscribed to have an interview."
            }
            else{
              return "Problem in AddBooking"
            }
          }
        }
      }
      else{
        return "You need to connect to metamask";
      }
  
    }
    else{
      return "Invalid Email";
    }
    } */
  }

  let [emailError, setEmailError] = React.useState('')
  const validateEmail = (e) => {
    var email = e.target.value
  
    if (validator.isEmail(email)) {
      setEmailError('Valid Email!')
    } else {
      setEmailError('Enter valid Email!')
    }
  }

  const theme = createTheme({
    palette: {
      primary: {
        main: orange[700],
      },
      secondary: {
        main: grey[100],
      },
    }
  });

  let [res, setRes] = React.useState<string | null>("");
  let [userAddress, setUserAddress] = React.useState<string | null>("");
  let [email, setEmail] = React.useState<string | null>("");
  /* let [disabled, setDisabled] = React.useState(true); */

  return (/* 
    <Provider value={client}>
    <QueryClientProvider client={queryClient}> */
    <div>
      <div className={styles.title}> RESERVER UN INTERVIEW</div>
      {/* <div className={styles.logoContainer} >
      <img src={String(MetamaskLogo)} height={90}/>
    </div> */}
      <div className={styles.metamask}>
        <MetaMask onAddressChanged={address => { setUserAddress(address); } } />
      </div>
      <div className={styles.datepicker}>
        <DatePicker onvalueChange={value => { setRes(value); } } />
      </div>
      {/* <div className={styles.text}>
        <button className={styles.button} onClick={() => {
          setDisabled(false);
          console.log(disabled);
        } }>
          Choisir cet horaire
        </button>
      </div> */}
      <div className={styles.text}>
        <ThemeProvider theme={theme}>
        
         
          <pre>
        <TextField label="Email" variant="outlined" onChange={(e) => {validateEmail(e); setEmail(e.target.value)}} >
        
  </TextField>
        {/* <span>Enter Email: </span><input type="text" id="userEmail" 
        ></input> */} <br />
        <span style={{
          fontWeight: 'bold',
          color: 'red',
        }}>{emailError}</span>
      </pre>
          <Button color="primary" variant="contained" onClick={()=>{Subscription(userAddress,res,email,emailError)}}>
            Choisir son horaire et s'inscrire
          </Button>
          
        </ThemeProvider>
    </div>
  
      <button>

      </button>
      </div>/* 
      </QueryClientProvider>
      </Provider> */
      

  );
}


export default App;
