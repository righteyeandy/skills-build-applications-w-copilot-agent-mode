import express, { Express, Request, Response } from 'express';
import './config/database';
import Activity from './models/Activity';
import Leaderboard from './models/Leaderboard';
import Team from './models/Team';
import User from './models/User';
import Workout from './models/Workout';

const app: Express = express();
const PORT = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${PORT}`;

// Middleware
app.use(express.json());

// Basic route
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'OK',
    message: 'OctoFit Tracker API is running',
    baseUrl
  });
});

app.get('/api/users/', (req: Request, res: Response) => {
  User.find()
    .select('-__v')
    .then((users) => {
      res.json({ resource: 'users', count: users.length, data: users });
    })
    .catch((error) => {
      res.status(500).json({ resource: 'users', message: 'Failed to fetch users', error: String(error) });
    });
});

app.get('/api/teams/', (req: Request, res: Response) => {
  Team.find()
    .populate('members', 'name email fitnessLevel')
    .select('-__v')
    .then((teams) => {
      res.json({ resource: 'teams', count: teams.length, data: teams });
    })
    .catch((error) => {
      res.status(500).json({ resource: 'teams', message: 'Failed to fetch teams', error: String(error) });
    });
});

app.get('/api/activities/', (req: Request, res: Response) => {
  Activity.find()
    .sort({ date: -1 })
    .populate('user', 'name email')
    .populate('team', 'name')
    .select('-__v')
    .then((activities) => {
      res.json({ resource: 'activities', count: activities.length, data: activities });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ resource: 'activities', message: 'Failed to fetch activities', error: String(error) });
    });
});

app.get('/api/leaderboard/', (req: Request, res: Response) => {
  Leaderboard.find()
    .sort({ rank: 1 })
    .populate('user', 'name email')
    .populate('team', 'name')
    .select('-__v')
    .then((leaderboardEntries) => {
      res.json({ resource: 'leaderboard', count: leaderboardEntries.length, data: leaderboardEntries });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ resource: 'leaderboard', message: 'Failed to fetch leaderboard', error: String(error) });
    });
});

app.get('/api/workouts/', (req: Request, res: Response) => {
  Workout.find()
    .populate('assignedTo', 'name email fitnessLevel')
    .select('-__v')
    .then((workouts) => {
      res.json({ resource: 'workouts', count: workouts.length, data: workouts });
    })
    .catch((error) => {
      res.status(500).json({ resource: 'workouts', message: 'Failed to fetch workouts', error: String(error) });
    });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on ${baseUrl}`);
});
