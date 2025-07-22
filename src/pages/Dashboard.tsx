import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DollarSign, 
  Users, 
  Eye, 
  Heart, 
  TrendingUp,
  Upload,
  MessageCircle,
  Calendar,
  Star
} from 'lucide-react';

export default function Dashboard() {
  const stats = [
    {
      title: "Total Earnings",
      value: "$12,450",
      change: "+12.5%",
      icon: DollarSign,
      color: "text-green-500"
    },
    {
      title: "Subscribers",
      value: "1,234",
      change: "+8.2%",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "Views",
      value: "45.2K",
      change: "+15.3%",
      icon: Eye,
      color: "text-purple-500"
    },
    {
      title: "Likes",
      value: "8.9K",
      change: "+9.1%",
      icon: Heart,
      color: "text-pink-500"
    }
  ];

  const recentActivity = [
    { type: 'subscription', user: '@sarah_m', amount: '$29.99', time: '2 mins ago' },
    { type: 'like', user: '@john_d', content: 'Beach photoshoot', time: '5 mins ago' },
    { type: 'message', user: '@alex_k', preview: 'Hey! Love your content...', time: '12 mins ago' },
    { type: 'subscription', user: '@mike_r', amount: '$29.99', time: '15 mins ago' },
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gradient">Welcome back!</h1>
          <p className="text-muted-foreground mt-2">
            Here's what's happening with your content today.
          </p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-primary hover:bg-primary/90">
            <Upload className="mr-2 h-4 w-4" />
            Upload Content
          </Button>
          <Button variant="outline">
            <MessageCircle className="mr-2 h-4 w-4" />
            Messages
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-glass">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.color}`}>
                <TrendingUp className="inline h-3 w-3 mr-1" />
                {stat.change} from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activity */}
        <Card className="lg:col-span-2 card-glass">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Your latest interactions and earnings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                    <div>
                      <p className="text-sm font-medium">
                        {activity.type === 'subscription' && `New subscriber: ${activity.user}`}
                        {activity.type === 'like' && `${activity.user} liked "${activity.content}"`}
                        {activity.type === 'message' && `Message from ${activity.user}`}
                      </p>
                      {activity.type === 'message' && (
                        <p className="text-xs text-muted-foreground">{activity.preview}</p>
                      )}
                    </div>
                  </div>
                  <div className="text-right">
                    {activity.amount && (
                      <p className="text-sm font-medium text-green-500">{activity.amount}</p>
                    )}
                    <p className="text-xs text-muted-foreground">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="space-y-6">
          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                <Upload className="mr-2 h-4 w-4" />
                Upload New Content
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <MessageCircle className="mr-2 h-4 w-4" />
                Message Subscribers
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="mr-2 h-4 w-4" />
                Schedule Post
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Star className="mr-2 h-4 w-4" />
                Promote Content
              </Button>
            </CardContent>
          </Card>

          <Card className="card-glass">
            <CardHeader>
              <CardTitle>Creator Tips</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-primary/10 border border-primary/20">
                  <p className="text-sm font-medium">Engagement Boost</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Post content during peak hours (7-9 PM) for maximum engagement.
                  </p>
                </div>
                <div className="p-3 rounded-lg bg-accent/10 border border-accent/20">
                  <p className="text-sm font-medium">Revenue Tip</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Offer exclusive content to boost subscription rates.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}