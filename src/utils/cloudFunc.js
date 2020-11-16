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
  }

  signIn(callBack) {
    var auth = app.auth({
      persistence: 'local',
    });
    if (!auth.hasLoginState()) {
      auth.anonymousAuthProvider().signIn().then(() => {
        // this.setButtonStatus(false)
        isFuncAndRun(callBack);
      });
    } else {
      // this.setButtonStatus(false)
      isFuncAndRun(callBack);
    }
  }

  queryNotes() {
    console.log('cloudFunc', db);
    return db
      .collection('notes')
      .orderBy('sort', 'asc')
      .limit(100)
      .get();
  }
}

export default new cloudFunc();
