
const express = require('express');
const router = express.Router();
router.use(express.urlencoded({extended:true}))
router.use(express.json());
const fs = require('fs');


router.get('/',(req,res)=>{

    fs.readFile("./hospital.json", "utf8", (err, jsonString) => {
            if (err) {
              console.log("File read failed:", err);
              return;
            }
            try {
                if (jsonString.length == 0) {
                    res.send({message : "File is empty! "});
                }
                else
                {
                    var hospital = JSON.parse(jsonString);
                    console.log("Hospital_Name:", hospital.name);
                    console.log("Patient_count:", hospital.patient_count);
                    console.log("Location:", hospital.location);
    
                    res.send(hospital);
                }
               

              } catch (err) {
                console.log("Error parsing JSON string:", err);
              }
          });
   
});


router.post('/add',(req,res)=>{

    fs.readFile("./hospital.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            var hos_name = req.query.Hospital_Name;
            var hos_count=req.query.Patient_count;
            var hos_loc=req.query.Location;
           
            if(hos_name!=null && hos_count!=null && hos_loc!=null)
            {
                
                var hosDetail = `{"Hospital_Name":"${hos_name}","Patient_count":"${hos_count}","Location":"${hos_loc}"}`;
                var hosData=JSON.parse(hosDetail);
                //console.log(hosData);
                if (jsonString.length == 0) {
                
                    var hData=[];
                    hData.push(hosData);
                    var newData = JSON.stringify(hData) ;
                }
                else
                {
                    var hospital = JSON.parse(jsonString);
                    var hData=[];
                    hData=JSON.parse(jsonString);
                    hData.push(hosData);
                    //console.log("hData array is :"+hData);
                    var newData = JSON.stringify(hData) 

                }
                //console.log("New Data"+newData);
                    fs.writeFile("hospital.json", newData, (err) => { 
                    // Error checking 
                        if (err)
                        {
                            console.log("Error detected : "+err);
                        } 
                        else{
                            console.log("New data added"); 
                        }
                    }); 
            
                res.send(hData);
            }
            else
            {
                res.send({message : "Please fill all details(Hospital_Name,Patient_count,Location)"});
                return
            }
           
            
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
        
    });
          
});

router.put('/update',(req,res)=>{
    fs.readFile("./hospital.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            
            if (jsonString.length == 0) {
                
                res.send({message : "File is empty! "});
            }
            else
            {
                var hos_name = req.query.Hospital_Name;
                var hos_count=req.query.Patient_count;
                var hos_loc=req.query.Location;
                console.log("hos_name: "+hos_name);
                var readerData=JSON.parse(jsonString);
                var hosExist=0;
                readerData.forEach(function (x) {
                    if (x.Hospital_Name === hos_name) {
                        if(hos_count!=null)
                        {
                            x.Patient_count = hos_count;   
                             
                        }
                        
                        if(hos_loc!=null)
                        {
                            x.Location = hos_loc; 
                        }
                      
                      hosExist=1;
                    }
                    else {
                      console.log('Not found Hospital name : '+hos_name);
                    }
                });
                console.log("Hospitalname exist then value is 1 :"+hosExist);
                if(hosExist==1)
                {
                    var newData = JSON.stringify(readerData) ;
                
                    fs.writeFile("hospital.json", newData, (err) => { 
                    // Error checking 
                        if (err)
                        {
                            console.log("Error detected : "+err);
                        } 
                        else{
                            console.log("Data updated"); 
                        }
                    }); 
                    console.log("updated new data : "+newData)
                    res.send(newData);
                }
                else
                {
                    res.send({message : "Hospital is not exist"});
                }
                
            }
        } catch (err) {
            console.log("Error parsing JSON string:", err);
        }
        
    });
})

router.delete('/del',(req,res)=>{
    fs.readFile("./hospital.json", "utf8", (err, jsonString) => {
        if (err) {
            console.log("File read failed:", err);
            return;
        }
        try {
            if (jsonString.length == 0) {
                
                res.send({message : "File is empty! "});
            }
            else
            {
                var hos_name = req.query.Hospital_Name;
                //console.log("hos_name: "+hos_name);
                var readerData=JSON.parse(jsonString);
                var hosExist=0;
                readerData.forEach((x, index)=> {
                    if (x.Hospital_Name === hos_name) {

                   //console.log("readerData :" +x.index);
                    delete readerData[index];
                      hosExist=1;
                    }
                    else {
                      console.log('Not found Hospital name : '+hos_name);
                    }
                });


               
                console.log("Hospitalname exist then value is 1 :"+hosExist);
                if(hosExist==1)
                {

                    var newArray = readerData. filter(value => Object. keys(value). length !== 0);

                    var newData = JSON.stringify(newArray) ;
                
                    fs.writeFile("hospital.json", newData, (err) => { 
                    // Error checking 
                        if (err)
                        {
                            console.log("Error detected : "+err);
                        } 
                        else{
                            console.log("Data updated"); 
                        }
                    }); 
                    console.log("updated new data : "+newData)
                    res.send(newData);
                }
                else
                {
                    res.send({message : "Hospital is not exist"});
                }
                
            }

        }
        catch(err)
        {
            console.log("Error parsing JSON string:", err);
        }
    });
});


module.exports=router;

