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

function getQueryString(name) { 
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i"); 
  var r = window.location.search.substr(1).match(reg); 
  if (r != null) return unescape(r[2]); 
  return null; 
}

const envId =  getQueryString('env') || 'wt-share-43bafa'; // 'wt-share-43bafa';
if(!envId){
  alert('链接错误！');
}
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

  // 注册邮箱
  signUpWithEmailAndPassword(email, password, callBack, errCallback) {
    return auth
      .signUpWithEmailAndPassword(email, password)
      .then(res => {
        // 发送验证邮件成功
        isFuncAndRun(callBack);
      })
      .catch(res => {
        isFuncAndRun(errCallback);
      });
  }
  checkHasLogin() {
    return auth.hasLoginState();
  }
  signOut() {
    auth.signOut();
  }
  // 邮箱登录
  signInWithEmailAndPassword(email, password, callBack, errCallback) {
    if (!auth.hasLoginState()) {
      auth
        .signInWithEmailAndPassword(email, password)
        .then(res => {
          isFuncAndRun(callBack);
        })
        .catch(res => {
          isFuncAndRun(errCallback);
        });
    } else {
      isFuncAndRun(callBack);
    }
  }
  // 重置邮箱登录密码
  sendPasswordResetEmail(email, callBack, errCallback) {
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        // 发送重置密码邮件成功
        isFuncAndRun(callBack);
      })
      .catch(res => {
        isFuncAndRun(errCallback);
      });
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

  queryCategories(noteId) {
    return db
      .collection('categories')
      .where({ noteId })
      .orderBy('sort', 'asc')
      .limit(1000)
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

  queryArticles(params) {
    return db
      .collection('article')
      .where(params)
      .orderBy('sort', 'asc')
      .limit(1000)
      .get();
  }

  saveArticle(values) {
    const { _id = '', edit, _openid, success, ...resValues } = values;
    let id = _id;
    if (_id.startsWith('tmp')) {
      id = '';
    }

    if (id === '') {
      return db.collection('article').add(resValues);
    }
    return db
      .collection('article')
      .doc(id)
      .update(resValues);
  }

  deleteArticles(id) {
    return db
      .collection('article')
      .doc(id)
      .remove();
  }

  getArticleContent(values) {
    return db
      .collection('articleContent')
      .where(values )
      .limit(1)
      .get();
  }

  addArticleContent(values){
    return db.collection('articleContent').add(values);
  }

  updateArticleContent(values) {
    const { articleId,content } = values;
    return db
      .collection('articleContent')
      .where({ articleId })
      .update({
        content,
      });
  }
}

export default new cloudFunc();
