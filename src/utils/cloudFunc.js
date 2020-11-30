import cloudbase from '@cloudbase/js-sdk';
import { isFuncAndRun } from '@/utils/helper';
// const app = cloudbase.init({
//   env: 'wt-share-43bafa',
// });
// const auth = app.auth();
// const db = app.database();
// async function login() {
//   await auth.anonymousAuthProvider().signIn();
//   // 匿名登录成功检测登录状态isAnonymous字段为true
//   const loginState = await auth.getLoginState();
//   console.log('loginState.isAnonymousAuth', loginState.isAnonymousAuth); // true
// }
const envId = 'wt-share-43bafa';
let app = null; // 得放到外面才行
let db = null;
let auth = null;

class cloudFunc {
  constructor() {
    // 初始化 CloudBase
    app = cloudbase.init({
      env: envId,
    });
    // 初始化数据库
    db = app.database();
    // console.log('constructor', app, db)
    // this.signIn();
    auth = app.auth({
      persistence: 'local',
    });
  }

  async isLogin() {
    const loginState = await auth.getLoginState();
    console.log('loginState', loginState);
  }

  signUpWithEmailAndPassword() {
    return app
      .auth()
      .signUpWithEmailAndPassword('1946755280@qq.com', 'SA523BER');
    // .then(() => {
    //   // 发送验证邮件成功
    // });
  }

  signInWithEmailAndPassword(cb) {
    if(!app.auth().hasLoginState()){
      app
      .auth()
      .signInWithEmailAndPassword('1946755280@qq.com', 'SA523BER')
      .then(res=>{
        isFuncAndRun(cb);
      })
    }else {
      isFuncAndRun(cb);
    }
  }

  // 匿名登录
  signIn(callBack) {
    if (!auth.hasLoginState()) {
      auth
        .anonymousAuthProvider()
        .signIn()
        .then(() => {
          // this.setButtonStatus(false)
          isFuncAndRun(callBack);
        });
    } else {
      // this.setButtonStatus(false)
      isFuncAndRun(callBack);
    }
  }

  queryNotes() {
    return db
      .collection('notes')
      .orderBy('sort', 'asc')
      .limit(100)
      .get();
  }

  saveNote(values) {
    const { _id = '', edit, _openid, success, ...resValues } = values;
    let id = _id;
    if (_id.startsWith('tmp')) {
      id = '';
    }

    if (id === '') {
      return db.collection('notes').add(resValues);
    }
    return db
      .collection('notes')
      .doc(id)
      .update(resValues);
  }

  deleteNote(id) {
    return db
      .collection('notes')
      .doc(id)
      .remove();
  }

  queryCategories() {
    return db
      .collection('categories')
      .orderBy('sort', 'asc')
      .limit(100)
      .get();
  }

  saveCategory(values) {
    const { _id = '', edit, _openid, success, ...resValues } = values;
    let id = _id;
    if (_id.startsWith('tmp')) {
      id = '';
    }

    if (id === '') {
      return db.collection('categories').add(resValues);
    }
    return db
      .collection('categories')
      .doc(id)
      .update(resValues);
  }

  deleteCategory(id) {
    return db
      .collection('categories')
      .doc(id)
      .remove();
  }
}

export default new cloudFunc();
