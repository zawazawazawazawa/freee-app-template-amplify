import React from 'react';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';

Amplify.configure(awsconfig);

// 認可コードを取得する
function getAuthorizationCode() {
  window.location.replace('https://noil4p56w5.execute-api.ap-northeast-1.amazonaws.com/dev/authorization');
}

let id;
let email;
let displayName;


function App() {
  function handleLogin() {
    const search = window.location.search.substring(1);
    if (search === '') {
      getAuthorizationCode();
    } else {
      const params = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}')
      id = params['id']
      email = params['email']
      displayName = params['displayName']
      // window.history.replaceState({}, '', '/')
    }
  }

  // const [id, setId] = React.useState('')
  // const [email, setEmail] = React.useState('')
  // const [displayName, setDisplayName] = React.useState('')

  handleLogin();
  
  return (
    <div className="demo-layout mdl-layout mdl-js-layout mdl-layout--fixed-header">
      <header
        className="mdl-layout__header mdl-color-text--white mdl-color--light-blue-700"
      >
        <div className="mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-grid">
          <div
            className="mdl-layout__header-row mdl-cell mdl-cell--12-col mdl-cell--12-col-tablet mdl-cell--8-col-desktop"
          >
            <h3>freee sample app on Amplify</h3>
          </div>
        </div>
      </header>
      <main id="main-container" className="mdl-layout__content mdl-color--grey-100">
        <div id="demo-signed-in-card" className="mdl-grid">
          <div className="mdl-card mdl-shadow--2dp mdl-cell--12-col">
            <div className="mdl-card__supporting-text mdl-color-text--grey-600">
              <p>
                ようこそ <span id="demo-name-container">{displayName}</span>さん<br />
                Freee User ID: <span id="demo-uid-container">{id}</span><br />
                Email: <span id="demo-email-container">{email}</span><br />
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
