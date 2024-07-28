// npm init or npm init -y  karne se package.json  ban jati hai aur folder as a nodejs project initialise hota hai

const express = require('express')
const app = express()
const path = require('path')
const port = 3000
const multer  = require('multer')
const {mergePdfs}  = require('./merger')
// const mergePdfs  = require('./mergePdfs')
const upload = multer({ dest: 'uploads/' })
app.use('/static', express.static('public'))

app.get('/', (req, res) => {
//   res.send('Hello To the Beautiful  World!')
    res.sendFile(path.join(__dirname,"templates/index.html"))
})

app.post('/merge', upload.array('pdfs', 2), async (req, res, next)=> {
    console.log(req.files)
    //  // Dynamically import the ES module
    // const { mergePdfs } = await import('./merger.js');
    await mergePdfs(path.join(__dirname,req.files[0].path),path.join(__dirname,req.files[1].path) )
    res.redirect("http://localhost:3000/static/merged.pdf")
    // res.send({data: req.files})
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
})

app.listen(port, () => {
  console.log(`The app listening on port http://localhost:${port}`)
})

