import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import Context from './Context.jsx'


createRoot(document.getElementById('root')).render(
    <Context>
        <App />
    </Context>
    
)
