import mongoose from 'mongoose';
import Activity from '../models/Activity';
import Leaderboard from '../models/Leaderboard';
import Team from '../models/Team';
import User from '../models/User';
import Workout from '../models/Workout';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Team.deleteMany({}),
      User.deleteMany({}),
      Workout.deleteMany({})
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Downtown Sprinters',
        description: 'Interval-focused runners training for city races'
      },
      {
        name: 'Iron Core Crew',
        description: 'Strength-first team building power and consistency'
      }
    ]);

    const users = await User.insertMany([
      {
        name: 'Mia Torres',
        email: 'mia.torres@octofit.dev',
        age: 29,
        fitnessLevel: 'intermediate',
        goals: ['Run a sub-50 10K', 'Improve weekly consistency'],
        team: teams[0]._id
      },
      {
        name: 'Ethan Brooks',
        email: 'ethan.brooks@octofit.dev',
        age: 34,
        fitnessLevel: 'advanced',
        goals: ['Maintain marathon pace', 'Increase mobility'],
        team: teams[0]._id
      },
      {
        name: 'Priya Nair',
        email: 'priya.nair@octofit.dev',
        age: 26,
        fitnessLevel: 'beginner',
        goals: ['Build baseline strength', 'Exercise 4x per week'],
        team: teams[1]._id
      },
      {
        name: 'Lucas Reed',
        email: 'lucas.reed@octofit.dev',
        age: 31,
        fitnessLevel: 'intermediate',
        goals: ['Lower resting heart rate', 'Add lean muscle'],
        team: teams[1]._id
      }
    ]);

    teams[0].members = [users[0]._id, users[1]._id];
    teams[1].members = [users[2]._id, users[3]._id];
    await Promise.all([teams[0].save(), teams[1].save()]);

    const activities = await Activity.insertMany([
      {
        user: users[0]._id,
        team: teams[0]._id,
        type: 'run',
        durationMinutes: 52,
        caloriesBurned: 610,
        date: new Date('2026-08-09T06:30:00Z'),
        notes: 'Tempo run with final 2 km acceleration'
      },
      {
        user: users[1]._id,
        team: teams[0]._id,
        type: 'bike',
        durationMinutes: 70,
        caloriesBurned: 760,
        date: new Date('2026-08-10T05:45:00Z'),
        notes: 'Zone 2 ride on rolling terrain'
      },
      {
        user: users[2]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 45,
        caloriesBurned: 430,
        date: new Date('2026-08-11T18:10:00Z'),
        notes: 'Full-body beginner circuit'
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'yoga',
        durationMinutes: 35,
        caloriesBurned: 190,
        date: new Date('2026-08-12T07:20:00Z'),
        notes: 'Mobility flow for hips and thoracic spine'
      },
      {
        user: users[3]._id,
        team: teams[1]._id,
        type: 'strength',
        durationMinutes: 50,
        caloriesBurned: 520,
        date: new Date('2026-08-13T17:00:00Z'),
        notes: 'Upper body push/pull session'
      }
    ]);

    const leaderboard = await Leaderboard.insertMany([
      { user: users[1]._id, team: teams[0]._id, points: 940, rank: 1 },
      { user: users[3]._id, team: teams[1]._id, points: 870, rank: 2 },
      { user: users[0]._id, team: teams[0]._id, points: 810, rank: 3 },
      { user: users[2]._id, team: teams[1]._id, points: 650, rank: 4 }
    ]);

    const teamPoints = leaderboard.reduce<Record<string, number>>((acc, entry) => {
      const teamId = String(entry.team);
      acc[teamId] = (acc[teamId] || 0) + entry.points;
      return acc;
    }, {});

    teams[0].totalPoints = teamPoints[String(teams[0]._id)] || 0;
    teams[1].totalPoints = teamPoints[String(teams[1]._id)] || 0;
    await Promise.all([teams[0].save(), teams[1].save()]);

    const workouts = await Workout.insertMany([
      {
        title: 'Fast 5K Builder',
        category: 'cardio',
        durationMinutes: 40,
        difficulty: 'intermediate',
        suggestedFor: ['Improve VO2 max', 'Race prep'],
        assignedTo: [users[0]._id, users[1]._id]
      },
      {
        title: 'Foundation Strength Circuit',
        category: 'strength',
        durationMinutes: 35,
        difficulty: 'beginner',
        suggestedFor: ['New lifters', 'General fitness'],
        assignedTo: [users[2]._id]
      },
      {
        title: 'Desk Reset Mobility Flow',
        category: 'mobility',
        durationMinutes: 20,
        difficulty: 'beginner',
        suggestedFor: ['Flexibility', 'Recovery days'],
        assignedTo: [users[1]._id, users[3]._id]
      },
      {
        title: 'Progressive Overload Push Day',
        category: 'strength',
        durationMinutes: 55,
        difficulty: 'advanced',
        suggestedFor: ['Muscle gain', 'Power endurance'],
        assignedTo: [users[3]._id]
      }
    ]);

    console.log(
      `Inserted ${users.length} users, ${teams.length} teams, ${activities.length} activities, ${leaderboard.length} leaderboard entries, and ${workouts.length} workouts.`
    );
    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
