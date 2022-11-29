const express = require('express');
const sql = require('mssql');
const { listenerCount } = require('process');
const PORT = 3001;

const app = express();

const sqlConfig ={
    user:"group7",
    password:"group7",
    server:"LAPTOP-A3DJ90N5\\MSSQLSERVER01",
    databse:"cs179G",
    TrustServerCertificate:"true",
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,
    
      },
};

app.get('/', function(req,res){
    let connection = sql.connect(sqlConfig,(err)=>{
        if(err){
            console.log(err)
        }
        else{
            sql.connect(sqlConfig).then(pool => {
                // Query
                
                return pool.request()
                    .input('input_parameter', sql.Int, 2022)
                    .query('select top(100) * from searchBar where year = @input_parameter')
            }).then(result => {
                res.send(result)
            }).catch(err => {
              // ... error checks
            });
            
        }
    })
})

app.listen(PORT, function(){
    console.log('server started at ${PORT}')
})
