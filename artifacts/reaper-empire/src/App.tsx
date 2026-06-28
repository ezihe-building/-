import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';

import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SukunaFrame } from './components/SukunaFrame';
import { SukunaVoice } from './components/SukunaVoice';

import { Home } from './pages/Home';
import { Features } from './pages/Features';
import { Commands } from './pages/Commands';
import { Gallery } from './pages/Gallery';
import { HowItWorks } from './pages/HowItWorks';
import { TestBot } from './pages/TestBot';
import { DashboardPreview } from './pages/DashboardPreview';
import { FAQ } from './pages/FAQ';
import { Pricing } from './pages/Pricing';
import NotFound from '@/pages/not-found';

const queryClient = new QueryClient();

function Router() {
  return (
    <div className="flex flex-col min-h-screen w-full relative">
      <SukunaFrame />
      <Navbar />
      <main className="flex-1">
        <SukunaVoice />
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/features" component={Features} />
          <Route path="/commands" component={Commands} />
          <Route path="/gallery" component={Gallery} />
          <Route path="/how-it-works" component={HowItWorks} />
          <Route path="/test" component={TestBot} />
          <Route path="/dashboard" component={DashboardPreview} />
          <Route path="/faq" component={FAQ} />
          <Route path="/pricing" component={Pricing} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
