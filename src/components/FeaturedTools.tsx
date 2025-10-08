import React from 'react';
import { 
  CheckSquare, 
  Users, 
  Calculator, 
  Clock, 
  ArrowRight 
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedTools = () => {
  const tools = [
    {
      icon: CheckSquare,
      title: 'Wedding Checklist',
      description: 'Stay organized with our comprehensive wedding planning checklist, tailored to your timeline.',
      features: ['12-month timeline', 'Custom reminders', 'Progress tracking'],
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: Users,
      title: 'Guest List Manager',
      description: 'Manage invitations, RSVPs, and seating arrangements all in one place.',
      features: ['RSVP tracking', 'Seating charts', 'Dietary restrictions'],
      color: 'text-wedding-gold',
      bgColor: 'bg-wedding-gold/10'
    },
    {
      icon: Calculator,
      title: 'Budget Calculator',
      description: 'Track expenses and stay within budget with our smart planning tools.',
      features: ['Expense tracking', 'Category breakdown', 'Payment tracking'],
      color: 'text-wedding-sage',
      bgColor: 'bg-wedding-sage/20'
    }
  ];

  return (
    <section className="py-12 bg-gradient-elegant">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-4 mb-16 animate-fade-in">
          <h2 className="text-4xl lg:text-5xl font-heading font-bold text-foreground">
            Everything You Need to Plan Your Perfect Day
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Our comprehensive suite of planning tools helps you organize every detail, 
            from your first engagement to walking down the aisle.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {tools.map((tool, index) => (
            <Card 
              key={tool.title} 
              className="group hover:shadow-card transition-all duration-300 hover:-translate-y-2 animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader>
                <div className={`w-12 h-12 rounded-xl ${tool.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <tool.icon className={`h-6 w-6 ${tool.color}`} />
                </div>
                <CardTitle className="text-xl font-heading">{tool.title}</CardTitle>
                <CardDescription className="text-base">{tool.description}</CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <ul className="space-y-2">
                  {tool.features.map((feature) => (
                    <li key={feature} className="flex items-center space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <Button 
                  variant="ghost" 
                  className="w-full group/btn hover:bg-primary/10"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to action */}
        <div className="text-center animate-fade-in-up">
          <div className="bg-primary rounded-2xl p-8 lg:p-12 text-primary-foreground relative overflow-hidden">
            <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:30px_30px]" />
            <div className="relative z-10 space-y-6">
              <h3 className="text-3xl lg:text-4xl font-heading font-bold">
                Ready to Start Planning?
              </h3>
              <p className="text-lg lg:text-xl text-primary-foreground/90 max-w-2xl mx-auto">
                Join thousands of couples who have planned their dream wedding with our free tools.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button 
                    size="lg" 
                    variant="secondary"
                    className="bg-background text-primary hover:bg-background/90 shadow-lg"
                  >
                    Create Free Account
                  </Button>
                </Link>
                <Link to="#tools">
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    Explore Tools
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTools;