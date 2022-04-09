import { useState } from 'react';
import Area from './components/Area';
import Board from './components/Board';
import ButtonCustom from './components/ButtonCustom';
import Header from './components/Header'
import Message from './components/Message';
import TableCustom from './components/TableCustom';
import Api from './service/api';
import GlobalStyle from './Styles/global';

function App() {

  const [data, setData] = useState([]);
  const [msg, setMsg] = useState({open:false, message:''});

  const importing = (file) => {
    Api.SendFiles(file, (resultFiles) => {
      if (resultFiles.status){
        Api.GetCNABS((resultData) => {
          if (resultData.status){
            let tab = resultData.result;
            for (const key in tab) {
              if (tab[key]["data"] !== null){
                const dt = tab[key]["data"].split("-");
                tab[key]["data"] = new Date(dt[0],dt[1],dt[2]).toLocaleDateString();
              }
              if (tab[key]["valor"] !== null){
                tab[key]["valor"] = parseFloat(tab[key]["valor"]).toFixed(2).replace(".",",")
              }
            }
            setData(tab);
          } else {
            setMsg({open:true,message:resultFiles.result})
          }
        })
      } else {
        setMsg({open:true,message:resultFiles.result})
      }
    });
  }

  return (
    <div className="App">
      <Board>
        <Message visible={msg.open} onClick={(e) => setMsg({open:false,message:''})}>{msg.message}</Message>
        <Header>
          <ButtonCustom onClick={importing} >Importar Arquivo CNAB</ButtonCustom>
        </Header>
        { data.length > 0 && 
        <Area>
          <TableCustom columns={[
            {name:"loja", title:"Loja"},
            {name:"dono", title:"Dono"},            
            {name:"cpf", title:"CPF"},
            {name:"cartao", title:"Cartão"},
            {name:"descricao", title:"Descrição"},  
            {name:"natureza", title:"Natureza"},   
            {name:"valor", title:"Valor"},
            {name:"data", title:"Data"},       
            {name:"hora", title:"Hora"},            
          ]} rows={data}></TableCustom> 
        </Area> }
       </Board>
       <GlobalStyle />
    </div>
  );
}

export default App;
