import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from 'components/Header';
import PrivateRoute from 'components/PrivateRoute';
import Home from 'pages/Home';
import Login from 'pages/Login';
import Signup from 'pages/Signup';
import Profile from 'pages/Profile';

const App = () => (
    <main className="App">
        <BrowserRouter>
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<PrivateRoute element={<Profile />} />} />
                <Route path="/users/:userId" element={<PrivateRoute element={<Profile />} />} />
            </Routes>
        </BrowserRouter>
    </main>
);

export default App;
