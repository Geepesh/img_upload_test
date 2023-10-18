const express = require('express')
const app = express()
const os = require('os')
const mongoose = require("mongoose")
const port = 3010 || process.env.PORT
const multer = require('multer')
const DB = require('./db/db')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
  cb(null, 'uploads');
},
filename: (req, file, cb) => {
  cb(null, Date.now() + '-' + file.originalname);
}})
const cloudinary = require('cloudinary').v2;
const upload = multer({storage}) 
mongoose.connect("mongodb+srv://geepesh_agrawal:geepesh__agrawal@cluster0.cp7uxdr.mongodb.net/",{
  useNewUrlParser: true
}).then(()=>{
  console.log('connected')
})



          
cloudinary.config({ 
  cloud_name: 'dpgsc8qup', 
  api_key: '959553657589253', 
  api_secret: 'XmB5xd9tMmRltuezT3LYaPstRWo' 
});


app.set('view engine','ejs')
app.use(express.static(__dirname + "/static_files"))
app.use('/uploads',express.static("/uploads"))
const get =(root,file)=>{
  app.get(root,(req,res)=>{
    res.render(file)
  })
}


  app.post("/uploaded",upload.single('file'),(req,res)=>{
    res.json({
      status : "uploaded",
      file_name : req.file.filename,
      mime_type : req.file.mimetype
    })
    cloudinary.uploader.upload(`./uploads/${req.file.filename}`,
    { public_id: "olympic_flag" }, 
     function(error, result) {
      console.log(result.url);
      const dta = {
        url : result.url
      }
      const data = new DB(dta)
      data.save().then((x)=>{
        console.log('data saved')
      })
    });
    
  })


get('/',"main")



app.get('/all',(req,res)=>{
  DB.find({}).then((r)=>{
    res.render("all",{
      r : r
    })
  })
  
})


app.listen(port,()=>{
  console.log(port)
})













