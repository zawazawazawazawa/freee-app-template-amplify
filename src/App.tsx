import React from 'react';

let token;

const request = require("request");
const token_url = "https://accounts.secure.freee.co.jp/public_api/token";
const authorizaton_url = "https://accounts.secure.freee.co.jp/public_api/authorize";
const redirect_uri = "";
const client_id = "";
const client_secret = "";
// const code = "取得した認可コード";
// const access_token = null;
// const refresh_token = null;

// 認可コードを取得する
function getAuthorizationCode() {
  window.location.replace(authorizaton_url + "?client_id=" +  client_id + "&redirect_uri=" + redirect_uri + "&response_type=code");
}

function handleLogin() {
  if (token === undefined) {
    getAuthorizationCode();
  }
}

// // アクセストークンを取得する。
// const options = {
//   method: 'POST',
//   url: token_url,
//   headers: {
//     'cache-control': 'no-cache',
//     'Content-Type': 'application/json'
//   },
//   form: {
//     grant_type: "authorization_code",
//     redirect_uri: redirect_uri,
//     client_id: client_id,
//     client_secret: client_secret,
//     code: code
//   },
//   json: true
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   console.log(body);
//   //リクエストレスポンスからアクセストークンを取得する。
//   const response = body;
//   access_token = response.access_token;
//   refresh_token = response.refresh_token;
// });

// //リフレッシュトークンを用いてアクセストークンを取得する。
// const options = {
//   method: 'POST',
//   url: token_url,
//   headers: {
//     'cache-control': 'no-cache',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
//   form: {
//     grant_type: "refresh_token",
//     redirect_uri: redirect_uri,
//     client_id: client_id,
//     client_secret: client_secret,
//     refresh_token: refresh_token
//   },
//   json: true
// };

// request(options, function (error, response, body) {
//   if (error) throw new Error(error);
//   //リクエストレスポンスからアクセストークンを取得する。
//   const response = body;
//   access_token = response.access_token;
//   refresh_token = response.refresh_token;
// });


function App() {
  getAuthorizationCode();
  
  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header
        className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700"
      >
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div
            className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
          >
            <h3>freee sample app on firebase</h3>
          </div>
        </div>
      </header>
      <div id="loading-container" className="loading">
        <div
          className="mdl-spinner mdl-js-spinner is-active"
          style={{width: "80px", height: "80px"}}
        ></div>
        <div>ユーザー情報読み込み中</div>
      </div>
      <main id="main-container" className="mdl-layout__content mdl-color--grey-100">
        <div id="demo-signed-in-card" className="mdl-grid">
          <div className="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              <p>
                ようこそ <span id="demo-name-container"></span>さん<br />
                Freee User ID: <span id="demo-uid-container"></span><br />
              </p>
              <div>
                <div
                  id="companies-select"
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-select"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="select-section"
                  />
                  <label className="mdl-textfield__label" htmlFor="sample3"
                    >現在の事業所</label
                  >
                  <ul
                    id="companies-select-ul"
                    className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                  ></ul>
                </div>
              </div>

              <div>
                <div
                  id="types-select"
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-select"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="types-select-section"
                  />
                  <label className="mdl-textfield__label" htmlFor="sample3"
                    >収支区分 </label
                  >
                  <ul
                    id="types-select-ul"
                    className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                  ></ul>
                </div>
              </div>

              <div>
                <div
                  id="account_items-select"
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label mdl-select"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="account_items-select-section"
                  />
                  <label className="mdl-textfield__label" htmlFor="account_items-select-section"
                    >勘定科目</label
                  >
                  <ul
                    id="account_items-select-ul"
                    className="mdl-menu mdl-menu--bottom-left mdl-js-menu mdl-js-ripple-effect mdl-js-ripple-effect--ignore-events"
                  ></ul>
                </div>
              </div>
              <div>
                <div
                  id="amount-input"
                  className="mdl-textfield mdl-js-textfield mdl-textfield--floating-label"
                >
                  <input
                    className="mdl-textfield__input"
                    type="text"
                    id="amount-input-section"
                  />
                  <label className="mdl-textfield__label" htmlFor="amount-input-section"
                    >金額</label
                  >
                </div>
              </div>

              <button
                id="demo-post-deal-button"
                className="mdl-button--primary mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect"
              >
                取引をPOST
              </button>
              <button
                id="demo-sign-out-button"
                className="mdl-color-text--grey-700 mdl-button--raised mdl-button mdl-js-button mdl-js-ripple-effect"
                style={{marginLeft: "8px"}}
              >
                ログアウト
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
