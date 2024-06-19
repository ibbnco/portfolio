
import React, { useState } from 'react';
import MainPage from './pages/MainPage';
import HomePage from './pages/HomePage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import '.././src/css/style.css';
interface Props { }

interface State {

}

class App extends React.Component<Props, State> {

  constructor(props: any) {
    super(props);

  }

  componentDidMount(): void {
  }

  state: State = {

  };


  render() {

    return (
      <>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<MainPage />} />
              <Route path='/portfolio' element={<HomePage />} />
            </Routes>
        </BrowserRouter >
      </>
    )
  }
}

export default App;