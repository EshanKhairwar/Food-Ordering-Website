
const express = require('express');
const app = express();
const mongoose = require('mongoose');

app.use(express.json());
const cors=require("cors");
app.use(cors());
const bcrypt=require("bcryptjs");

const jwt=require("jsonwebtoken");

const JWT_SECRET="hwdvayGert272729238()aijfdgs7qt2372332[]";

const mongoUrl="mongodb+srv://eshangpkhairwar:KqDi9GSunzSnqcTI@cluster0.7qafbdk.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(mongoUrl, { useNewUrlParser: true, dbName: 'userForm' })
  .then(() => {
    console.log('Connected to database');
  })
  .catch((e) => console.log(e));

require('./userDetails');

const User = mongoose.model('UserInfo');

app.post('/register', async (req, res) => {
  const { fname, email, password } = req.body;
  const encrptedPassword=await bcrypt.hash(password,10)

  try {
    const oldUser=await User.findOne({email});

    if(oldUser){
      return res.send({error:"User Exist"})
    }

    await User.create({
      fname,
      email,
      password:encrptedPassword,
    });
    res.send({ status: 'ok' });
  } catch (error) {
    res.send({ status: 'error' });
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) {
    return res.json({ error: "User Not Exist" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({}, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ status: "error" });
    }
  }
  res.json({ status: "error", error: "Invalid Password" });
});






app.listen(5000, () => {
  console.log('Server Started at 5000');
});
