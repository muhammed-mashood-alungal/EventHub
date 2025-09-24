import React from 'react';
import { Users, Calendar, TrendingUp, Activity } from 'lucide-react';
import StatsCard from '../../components/organizer/StatsCard';

const OrganizerDashboard: React.FC = () => {
  const stats = [
    { title: 'Total Users', value: '2,543', icon: Users, trend: '+12% from last month', trendUp: true },
    { title: 'Events', value: '48', icon: Calendar, trend: '+3 this week', trendUp: true },
    { title: 'Growth Rate', value: '23.5%', icon: TrendingUp, trend: '+2.1% from last month', trendUp: true },
    { title: 'Active Sessions', value: '1,234', icon: Activity, trend: '-5% from yesterday', trendUp: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-800 font-['Inter']">Dashboard Overview</h1>
        <p className="text-slate-600 mt-1 font-['Inter']">
          Welcome back! Here's what's happening with your dashboard today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatsCard key={index} {...stat} />
        ))}
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-4 font-['Inter']">Recent Activity</h2>
        <div className="space-y-4">
          {[
            { action: 'New user registered', time: '2 minutes ago', type: 'user' },
            { action: 'Event "Team Meeting" created', time: '15 minutes ago', type: 'event' },
            { action: 'Profile updated', time: '1 hour ago', type: 'profile' },
            { action: 'System backup completed', time: '2 hours ago', type: 'system' },
          ].map((activity, index) => (
            <div key={index} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-b-0">
              <div className="flex items-center">
                <div className={`w-2 h-2 rounded-full mr-3 ${
                  activity.type === 'user' ? 'bg-green-500' :
                  activity.type === 'event' ? 'bg-blue-400' :
                  activity.type === 'profile' ? 'bg-violet-600' : 'bg-slate-400'
                }`} />
                <span className="text-slate-800 font-['Inter']">{activity.action}</span>
              </div>
              <span className="text-sm text-slate-500 font-['Inter']">{activity.time}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrganizerDashboard;
