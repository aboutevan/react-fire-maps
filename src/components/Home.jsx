import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => (
  <div>
    <h1>React Fire Maps</h1>
    <p>This project is an exploration in authenticating routes in <a href="https://reacttraining.com/react-router/" target="_blank" rel="noopener noreferrer">React Router 4</a> with <a href="https://firebase.google.com/" target="_blank" rel="noopener noreferrer">Firebase</a> serving as the backend.</p>
    <p>The home view is an unprotected route and accesible by all.  The dashboard is only available if you are logged in to the app.</p>
    <p>To get started you will need to <Link to='/register'>register</Link>, otherwise you can just <Link to='/login'>login</Link></p>
  </div>
);

export default Home;