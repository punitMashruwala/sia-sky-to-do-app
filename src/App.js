import React, { useEffect, useState } from 'react';
import './App.css';
import Header from './components/header/Header';
// import Home from './components/Home/Home';
import Alert from './components/alert/Alert';
import { SkynetClient } from "skynet-js";




import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import TodoForm from './components/todo/TodoForm';


const portal =
  window.location.hostname === 'localhost' ? 'https://siasky.net' : undefined;

// Initiate the SkynetClient
// const client = new SkynetClient(portal);
const client = new SkynetClient();
function App() {
  const [title, updateTitle] = useState(null);
  const [userID, setUserID] = useState();
  const [mySky, setMySky] = useState();
  const [loggedIn, setLoggedIn] = useState(null);
  const [filePath, setFilePath] = useState();
  const [loading, setLoading] = useState(false);
  const [errorMessage, updateErrorMessage] = useState(null);
  const [todos, setTodos] = useState([]);
  const dataDomain = 'localhost';


  useEffect(() => {

    setLoading(true)
    async function initMySky() {

      try {
        const mySky = await client.loadMySky(dataDomain);
        // check if user is already logged in with permissions
        const loggedData = await mySky.checkLogin();
        setMySky(mySky);
        setLoggedIn(loggedData);
        if (loggedData) {
          setUserID(await mySky.userID());
        }

        setLoading(false)
      } catch (e) {
        setLoading(false)
        console.error(e);
      }
    }

    initMySky();
  }, []);

  const handleMySkyLogin = async () => {

    const status = await mySky.requestLoginAccess();
    // set react state
    setLoggedIn(status);

    if (status) {
      setUserID(await mySky.userID());
    }

  };

  const handleMySkyLogout = async () => {
    await mySky.logout();

    //set react state
    setLoggedIn(false);
    setUserID('');
  };

  // define async setup function

  return (
    <>
      <div className="todoApp">
        <Router>
          <div >
            <Header title={title} loggedIn={loggedIn} handleMySkyLogout={handleMySkyLogout} handleMySkyLogin={handleMySkyLogin} />
            <div className="container d-flex align-items-center flex-column">
              <Switch>
                <Route path="/" exact={true}>
                  <br />

                  <div className="justify-content-center">
                    {loggedIn === true && (
                      <div>
                        <span className="h2"> Hello Logged In user - What is your plan for today?</span>
                        <br />
                        <br />
                        <TodoForm
                          mySky={mySky}
                          filePath={filePath}
                          userID={userID}
                          todos={todos}
                          setTodos={setTodos}
                          updateErrorMessage={updateErrorMessage}
                          loading={loading}
                        />
                      </div>

                    )}

                    {/* <br /> */}
                    {loggedIn === false && (
                      <div> <span className="h2">Please log in or sign up to use the app! Thank you.</span> </div>
                    )}

                  </div>
                </Route>



              </Switch>
            </div>
          </div>
        </Router>
      </div>
      <Alert errorMessage={errorMessage} hideError={updateErrorMessage} />
    </>
  );
}

export default App;
