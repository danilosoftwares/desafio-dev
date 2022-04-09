module.exports = class NormalizeCnab {
    constructor(content) {
        this.content = content;        
    }

    toTexting(value){
        return value.normalize('NFD').trim();
    }

    toDating(value){
        const content = this.toTexting(value);
        return new Date(content.substring(0,4),content.substring(4,6),content.substring(6,8));
    }

    toHouring(value){
        const content = this.toTexting(value);
        return content.substring(0,2)+":"+content.substring(2,4)+":"+content.substring(4,6);
    }

    toNumbering(value){
        return parseInt(this.toTexting(value));
    }

    toDecimating(value){
        return this.toNumbering(value) / 100; 
    }

    get(){
        let ret = [];
        const lines = this.content.split("\n");
        for (const key in lines) {
            if (lines[key].length > 0){
                const tipo = this.toNumbering(lines[key].substring(1-1,1));
                const data = this.toDating(lines[key].substring(2-1,9));
                const valor = this.toDecimating(lines[key].substring(10-1,19));
                const cpf = lines[key].substring(20-1,30);
                const cartao = this.toTexting(lines[key].substring(31-1,42));
                const hora = this.toHouring(lines[key].substring(43-1,48));
                const dono = this.toTexting(lines[key].substring(49-1,62));
                const loja = this.toTexting(lines[key].substring(63-1,81));

                if (data.toString() === 'Invalid Date'){
                    throw new Error('Arquivo com formato inválido!')
                }
    
                ret.push({
                    tipo   ,
                    data   ,
                    valor  ,
                    cpf    ,
                    cartao ,
                    hora   ,
                    dono   ,
                    loja   ,
                });
            }
        }
        return ret;
    }
}