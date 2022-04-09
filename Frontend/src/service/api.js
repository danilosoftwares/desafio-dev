import axios from 'axios';

export default class Api {
    static getHostServer = () => {
        let retorno = '';
        let rawdata = window.location.hostname;
        if (rawdata.indexOf('localhost') > -1)
        {
            retorno = 'http://localhost:4000';
        }
        return retorno; 
    };

    static SendFiles = async (file, callback) => 
    {
        var bodyFormData = new FormData();
        bodyFormData.set('arquivos', file);
        axios(
            {
                method: 'post',
                url:  this.getHostServer()+'/api/cnab/upload',
                data: bodyFormData,
                headers: {'Content-Type': 'multipart/form-data' }
                }
        )
        .then((res) => {            
            callback(res.data);
        })
        .catch((res) => {
            callback(res.response.data);
        })     
    };

    static GetCNABS = async (callback) => 
    {
        let url  = this.getHostServer()+'/api/cnab';
        axios.get(url)
        .then(function(res){            
            callback(res.data);
        })
        .catch((res) => {
            callback(res.response.data);
        })       
    };
}