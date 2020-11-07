import cloudbase from '@cloudbase/js-sdk';

const app = cloudbase.init({
  env: 'wt-share-43bafa',
});
const auth = app.auth();
const db = app.database();

async function login() {
  await auth.anonymousAuthProvider().signIn();
  // 匿名登录成功检测登录状态isAnonymous字段为true
  const loginState = await auth.getLoginState();
  console.log(loginState.isAnonymousAuth); // true
}

login();

export function menuSave(values) {
  return db.collection('menu').add(values);
}

export function menuList() {
  return db.collection('menu').get();
}

export function addArticle(values) {
  return db.collection('article').add(values);
}

export function updateArticle(values) {
  return db
    .collection('article')
    .doc(values._id)
    .update(values);
}

export function getArticles(moduleKey) {
  return db
    .collection('article')
    .where({ moduleKey })
    .limit(10000)
    .get();
}
