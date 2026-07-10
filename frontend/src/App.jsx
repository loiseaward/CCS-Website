import '../styles/App.css'
import NavBar from "../components/NavBar.jsx"
import { Route, Routes } from "react-router-dom"
import { Home, Gallery, Calendar, Join, Board, Wecap, Developers, Dashboard } from "../pages/index.js"
import { AdminProvider } from "../features/auth/AdminContext.jsx"
import ProtectedRoute from "../features/auth/ProtectedRoute.jsx"
import Footer from "../layouts/Footer.jsx"

function App() {

  return (
    <div className="App">
        <AdminProvider>
          <NavBar/>
          <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/gallery" element={<Gallery />}/>
            <Route path="/calendar" element={<Calendar />}/>
            <Route path="/join" element={<Join />}/>
            <Route path="/board" element={<Board />}/>
            <Route path="/wecap" element={<Wecap />}/>
            <Route path="/developers" element={<Developers />}/>
            <Route element={<ProtectedRoute />}>
              <Route path="/admin" element={<Dashboard />}/>
            </Route>
          </Routes>
        </AdminProvider>
        <Footer/>
    </div>
  )
}

//make the dashboard protected so returns dashboard is admin aka logged in or the login page if not

export default App
