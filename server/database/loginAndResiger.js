const connect = require('./connect')
const User = require('./schema/user')

exports.login = async ({un, pw}) => {
  await connect();
  return new Promise ((res, rej) => {
    try{
      User.findOne({un: un}, async (err, doc) => {
        if(err) 
          console.log(err)
        else if(doc.pw == pw){
          await User.update({un: un}, {"$set": {lastLoginAt: Date.now()}});
          console.log('登陆成功');
          res({code:200, name: doc.name});
        } else {
          console.log('登录失败');
          res({code: 500});
        }
      });
    } catch(e) {
      console.log(e);
    }
  });
}

exports.register = async ({un, pw, name}) => {
  await connect();
  return new Promise ((res, rej) => {
    try {
      User.findOne({un: un}, (err, doc) => {
        if(doc) {
          console.log('注册失败');
          res({code:500});
        } else {
          User.create({
            un,
            pw,
            name: name || 'shit',
            createAt: Date.now(),
            lastLoginAt: Date.now()
          });
          console.log('注册成功');
          res({code: 200});
        }
      });
    } catch(e) {
      console.log(e);
    }
  });
}