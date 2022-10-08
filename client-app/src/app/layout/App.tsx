import axios from 'axios'
import {useState, useEffect} from 'react';
import { Activity } from 'types';

function App() {
    const [activities, setActivities] = useState<Activity[]>([]);
    useEffect(() => {
        axios.get<Activity[]>('http://localhost:5000/api/activities').then(response => {
            setActivities(response.data)
        });
    }, [])
    return (
        <div>
            <ul>
                {activities.map((activity) => <li key={activity.id}>{activity.title}</li>)}
            </ul>
        </div>
    );
}

export default App;
