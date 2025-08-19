import { useSEO } from "@/hooks/useSEO";

const Index = () => {
  useSEO({
    title: "Welcome to Fitflix | Fitness Ecosystem",
    description: "Welcome to Fitflix - your comprehensive fitness ecosystem featuring premium gyms, workout apps, and nutrition products.",
    keywords: "Fitflix, fitness ecosystem, welcome, premium gyms, workout apps, nutrition products",
    noindex: true
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Fitflix</h1>
        <p className="text-xl text-muted-foreground">Your comprehensive fitness ecosystem</p>
      </div>
    </div>
  );
};

export default Index;
