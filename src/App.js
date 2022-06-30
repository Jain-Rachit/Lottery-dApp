import "bootstrap/dist/css/bootstrap.min.css";
import {React,useState,useEffect} from 'react';
import NavBar from './components/NavBar';
import Mainpage from './components/Mainpage';
import MainCreateLottery from './components/MainCreateLottery';
import lotteryContract from './Blockchain/extractor';
import Web3 from 'web3';

function App() {
  let display;
  if(localStorage.getItem("display")===null){
    display=false;
  } else{
    if(JSON.parse(localStorage.getItem("display"))===true){
      display=true;
    } else{
      display=false;
    }
  }

  const [displaymainpage,setdisplaymainpage] = useState(display);
  const [lotteryprice,setlotteryprice] = useState(0);
  const [duration,setduration] = useState(0);
  const [ownershare,setownershare] = useState(0);
  const [web3,setweb3] = useState(null);
  const [address,setaddress] = useState(null);
  const [error,seterror] = useState(``);
  const [lottery,setlotterycontract] = useState(null);
  const [lotteryid,setlotteryid] = useState(0);
  const [totalprice,settotalprice] = useState(0);
  const [lotteryplayers,setlotteryplayers] = useState([]);
  const [lotteryhistory,setlotteryhistory] = useState([]);

  useEffect(() => {
    if(displaymainpage){
      localStorage.setItem("display",true);
    }else{
      localStorage.setItem("display",false);
    }
  }, [displaymainpage])
  
  useEffect(() => {
    updateState();
  }, [lotteryid])
  

  const updateState = async () =>{
    if(lottery){
      gethistory();
      // getplayers(false);
      getplayers();
      getpot();
      const lp = await lottery.methods.Lotteries(lotteryid).call();
      setlotteryprice(lp.lotteryPrice);
      setownershare(lp.ownerShare);
      // setlotteryprice()
    }
  }

  const getpot = async() =>{
    const lotterydetails = await lottery.methods.Lotteries(lotteryid).call();
    settotalprice(lotterydetails.totalAmount);
  } 

  // const getplayers = (x)=>{
  const getplayers = async()=>{
    console.log('in get players');
    // console.log(lottery);
    setlotteryplayers([]);
    try{
      const lotterydetails = await lottery.methods.getParticipants().call({
        from : "0x35fb7AFf3713f19937060b3A5671689f40245731"
      });
      console.log(lotterydetails);
      setlotteryplayers(lotterydetails);    
      console.log(`lotterydetails.participants is ${lotterydetails}`);    
      console.log(lotteryplayers);
    } catch(err){
      seterror(err)
    }
    // if(x)
    // {
    //   setlotteryplayers(lotteryplayers => [...lotteryplayers,address]);
    // }
  }

  const gethistory = async()=>{
    setlotteryhistory([]);
    // getplayers();
    for(let i=1;i<=lotteryid;i++){
      console.log(`lotteryid = ${lotteryid}`);
      const winnerdetails = await lottery.methods.Winners(i).call();
      const winnerobj={};
      winnerobj.index = i;
      winnerobj.address = winnerdetails.winnerAddress;
      if(winnerobj.address!=="0x0000000000000000000000000000000000000000"){
        setlotteryhistory(lotteryhistory=>[...lotteryhistory,winnerobj]);
      }
      console.log(winnerdetails,winnerobj);
    }
    console.log(lotteryhistory);
  }

  const createlottery=async (e)=>{
    e.preventDefault();
    
    if(!(lottery && address))
    {
      seterror("Metamask not connected");
    }
    else if(lotteryprice ==="" || duration === "" || ownershare === "") {
      seterror("Please enter all the fields")
    }
    else if(ownershare>50){
      seterror("ownershare can not be greater than 50 percent")
    }
    else
    {

      console.log(typeof duration);
      try{
        const success = await lottery.methods.setLottery(parseInt(duration),parseInt(lotteryprice),parseInt(ownershare)).send({
          from : address
        });
        if(success) {
        // updateState();
        // setlotteryid(lotteryid => lotteryid+1);
        // console.log(lotteryid);
        
        setdisplaymainpage(true);

        seterror("");
        } else {
          seterror("failed");
        }
      }
      catch(err){
        seterror(err);
      }
    }
  }

  const enterlottery = async (e) => {
    e.preventDefault();
    console.log("enter lottery");
    try {
        const success = await lottery.methods.Participate().send({
          from : address,
          value: lotteryprice
        })
        if(success) {
          console.log("successfull participation");
          // getplayers(true);
          getplayers();
        } else{
          console.log("failed participation");
        }        
    } catch (error) {
        seterror(error)
    }
    // settotalprice(totalprice+lotteryprice);

  }

  const drawlottery = async (e)=>{
    e.preventDefault();
        try {
        const success = await lottery.methods.DrawLottery().send({
          from : address,
        })
        if(success) {
          console.log("successfull draw");
          // getplayers();
          // gethistory();          
        } else{
          console.log("failed draw");
        }        
    } catch (error) {
        seterror(error)
    }
    console.log("draw lottery");
  }

  const claimprize=async (e)=>{
    e.preventDefault();
    console.log("claim prize");
    try {
        await lottery.methods.claimPrize(lotteryid).send({
          from : address,
        })

          getplayers();
          gethistory();  
          getpot();        
       
    } catch (error) {
        seterror(error)
    }
    setdisplaymainpage(false);
  }
  
  const connectWallet = async () => 
  {
    if (
      typeof window !== "undefined" &&
      typeof window.ethereum !== "undefined"
    ) {
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        
        const web3 = new Web3(window.ethereum);
        setweb3(web3)
        
        const accounts = await web3.eth.getAccounts();
        setaddress(accounts[0]);

        const lc = lotteryContract(web3)
        setlotterycontract(lc);
        console.log(lc);
        // if(displaymainpage===true){
          const id = await lc.methods.id().call();        
          setlotteryid(id);  

          
        // }  
        console.log(id);
        // gethistory();
        window.ethereum.on('accountsChanged',async()=>{
          const accounts = await web3.eth.getAccounts();
          console.log(accounts[0]);
          setaddress(accounts[0]);          
        })
      } catch (err) {
        seterror(err.message)
      }
    } else {
      seterror("No Metamask");
      console.log("No Metamask");
    }
  };
  return (    
    <div>
      <NavBar connectWallet={connectWallet}/>
      {displaymainpage?
        <Mainpage 
            enterlottery={enterlottery}
            drawlottery={drawlottery}
            claimprize={claimprize}
            lotteryprice={lotteryprice}
            totalprice={totalprice}
            lotteryhistory={lotteryhistory}
            lotteryplayers={lotteryplayers}/>
        :        
        <MainCreateLottery 
            setlotteryprice={setlotteryprice}
            setduration={setduration}
            setownershare={setownershare}
            createlottery={createlottery}
            lotteryhistory={lotteryhistory}/>}   
      <h1>{error}</h1>   
    </div>
  );
}

export default App;
