const { uploadFile } = require("../../src/upload");
const sequelize = require("../../config/database");
const { getSummary } = require("../../src/read");

describe("Testando api de cnab", () => {

  const contentCNAB = "3201903010000014200096206760174753****3153153453JOÃO MACEDO   BAR DO JOÃO       \n5201903010000013200556418150633123****7687145607MARIA JOSEFINALOJA DO Ó - MATRIZ";

  test('Envio de arquivo cnab com sucesso', (done) => {
    const requisicao = { files:{
      arquivos:[
        {buffer: Buffer.from(contentCNAB, 'utf8')}
      ],
  }};
    function response () {      
      this.send = (data) => {
        const { status } = data;        
        expect(status).toStrictEqual(true);      
        done()
      }
    }    
    uploadFile(requisicao,new response());
  })

  test('Envio de arquivo cnab com erro', (done) => {
    const requisicao = { files:{
      arquivos:[
        {buffer: Buffer.from("---------", 'utf8')}
      ],
  }};
    function response () { 
      this.status = (value) => {
        console.log(value);
        return this;
      }
      
      this.send = (data) => {
        const { status } = data;        
        expect(status).toStrictEqual(false);      
        done()
      }
    }    
    uploadFile(requisicao,new response());
  })  

  test('Buscar conteudo cnab enviado', (done) => {
    const requisicao = {};
    function response () { 
      
      this.send = (data) => {
        const { status } = data;        
        expect(status).toStrictEqual(true);      
        done()
      }
    }    
    getSummary(requisicao,new response());
  })  
  
})