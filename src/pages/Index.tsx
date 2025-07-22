import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Users, Zap, Shield } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <div className="float-animation mb-8">
            <h1 className="text-6xl font-bold mb-6">
              Welcome to <span className="text-luxury">Cabana</span>
            </h1>
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            The premium platform for content creators. Build your community, monetize your content, and connect with fans like never before.
          </p>
          <div className="flex gap-6 justify-center flex-wrap">
            <Button className="btn-luxury">Get Started</Button>
            <Button className="btn-glass">Learn More</Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-16 text-gradient">
            Why Choose Cabana?
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="card-luxury text-center">
              <Heart className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Connect</h3>
              <p className="text-muted-foreground">Build meaningful relationships with your audience</p>
            </Card>
            <Card className="card-luxury text-center">
              <Users className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Community</h3>
              <p className="text-muted-foreground">Create exclusive communities for your fans</p>
            </Card>
            <Card className="card-luxury text-center">
              <Zap className="w-12 h-12 mx-auto mb-4 text-primary" />
              <h3 className="text-xl font-semibold mb-2">Monetize</h3>
              <p className="text-muted-foreground">Multiple revenue streams for creators</p>
            </Card>
            <Card className="card-luxury text-center">
              <Shield className="w-12 h-12 mx-auto mb-4 text-accent" />
              <h3 className="text-xl font-semibold mb-2">Secure</h3>
              <p className="text-muted-foreground">Enterprise-level security and privacy</p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <Card className="card-glass p-12">
            <h2 className="text-4xl font-bold mb-6 text-luxury">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of creators who trust Cabana to grow their business
            </p>
            <Button className="btn-luxury text-lg px-12 py-4">
              Create Your Account
            </Button>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Index;
