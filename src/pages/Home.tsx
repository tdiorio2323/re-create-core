import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share, Plus, Search, Bell, Settings } from 'lucide-react';

const Home = () => {
  const { user, signOut } = useAuth();

  const mockPosts = [
    {
      id: 1,
      creator: 'Luna Rose',
      avatar: 'LR',
      content: 'Just dropped some exclusive content! Check it out 💖',
      likes: 234,
      comments: 45,
      image: null,
    },
    {
      id: 2,
      creator: 'Alex Storm',
      avatar: 'AS',
      content: 'Behind the scenes from today\'s photoshoot ✨',
      likes: 189,
      comments: 32,
      image: null,
    },
    {
      id: 3,
      creator: 'Maya Shine',
      avatar: 'MS',
      content: 'Thank you all for the amazing support! New content coming soon 🔥',
      likes: 456,
      comments: 78,
      image: null,
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="border-b border-border backdrop-blur-xl bg-background/80 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-luxury">Cabana</h1>
            
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-primary text-primary-foreground">
                  {user?.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <Button onClick={signOut} variant="outline" size="sm">
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-glass p-6 mb-6">
              <div className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-primary text-primary-foreground text-xl">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <h3 className="font-semibold text-lg">Welcome back!</h3>
                <p className="text-muted-foreground text-sm">{user?.email}</p>
              </div>
            </Card>

            <Card className="card-glass p-6">
              <h3 className="font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <Button className="btn-glass w-full justify-start">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Post
                </Button>
                <Button className="btn-glass w-full justify-start">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Messages
                </Button>
                <Button className="btn-glass w-full justify-start">
                  <Settings className="w-4 h-4 mr-2" />
                  Settings
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Feed */}
          <div className="lg:col-span-2">
            <Card className="card-glass p-6 mb-6">
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarFallback className="bg-muted">
                    {user?.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Button className="btn-glass w-full justify-start text-muted-foreground">
                    What's on your mind?
                  </Button>
                </div>
                <Button className="btn-luxury">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </Card>

            {/* Posts */}
            <div className="space-y-6">
              {mockPosts.map((post) => (
                <Card key={post.id} className="card-luxury p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Avatar>
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        {post.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-semibold">{post.creator}</h4>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>

                  <p className="mb-4">{post.content}</p>

                  {post.image && (
                    <div className="mb-4 rounded-2xl overflow-hidden">
                      <img 
                        src={post.image} 
                        alt="Post content" 
                        className="w-full h-64 object-cover"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-4 border-t border-border">
                    <Button variant="ghost" size="sm" className="gap-2">
                      <Heart className="w-4 h-4" />
                      {post.likes}
                    </Button>
                    <Button variant="ghost" size="sm" className="gap-2">
                      <MessageCircle className="w-4 h-4" />
                      {post.comments}
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share className="w-4 h-4" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1">
            <Card className="card-glass p-6 mb-6">
              <h3 className="font-semibold mb-4">Trending Creators</h3>
              <div className="space-y-3">
                {['Sophia Star', 'Ryan Cloud', 'Emma Glow'].map((creator, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-accent text-accent-foreground text-sm">
                        {creator.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-sm">{creator}</p>
                      <p className="text-xs text-muted-foreground">+{Math.floor(Math.random() * 100)}k followers</p>
                    </div>
                    <Button size="sm" variant="outline" className="text-xs">
                      Follow
                    </Button>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="card-glass p-6">
              <h3 className="font-semibold mb-4">Discover</h3>
              <div className="space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                  #Photography
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  #Fitness
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  #Art
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                  #Music
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;