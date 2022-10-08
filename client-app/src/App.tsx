import logo from './logo.svg';
import './App.css';
import axios from 'axios'
import {useState, useEffect} from 'react';

function App() {
    const [activities, setActivities] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data)
        });
    }, [])
    return (
        <div>
            <ul>
                {activities.map((activity:any)=> <li key={activity.id}>{activity.title}</li> )}
            </ul>
        </div>
    );
}

export default App;
