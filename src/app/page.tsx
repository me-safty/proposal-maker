'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Checkbox } from '@/components/ui/checkbox';
import PlainTextProposal from '@/components/PlainTextProposal';
interface Review {
  name: string;
  company: string;
  avatar: string;
  testimonial: string;
}

interface Data {
  clientName: string;
  projectType: string;
  timeline: string;
  includeTimelineStatement: string;
  responsive: string;
  testTask: string;
  lowPriceStatement: string;
  introduction: string;
  developerIntro: string;
  selectedProjects: string[];
  rate: string;
  githubProfile: string;
  clientReviews: Review[];
}
export default function Home() {
  const [formData, setFormData] = useState<Data>({
    clientName: '',
    projectType: '',
    timeline: '2-4 weeks',
    includeTimelineStatement: 'no',
    responsive: 'no',
    testTask: 'no',
    lowPriceStatement: 'no',
    introduction: 'I saw your requirements, and It seems you are looking for a skilled developer to do some fixes and add some features to the project. I am interested in working on your project and I believe I have the skills and expertise to deliver a high-quality product.',
    developerIntro: "I’ve worked on similar projects and know what it takes to build reliable, scalable applications. I take pride in writing clean code, communicating clearly, and delivering on time.",
    selectedProjects: [],
    rate: '',
    githubProfile: 'github.com/me-safty',
    clientReviews: [],

  });

  const handleChange = (field: string, value: string) => {
    if (field === 'clientName' && value.length > 0) {
      value = value.charAt(0).toUpperCase() + value.slice(1);
    }
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="container mx-auto max-w-7xl">
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight mb-3">Job Proposal Maker</h1>
          <p className="text-muted-foreground text-lg">Create professional job proposals in minutes</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Edit Proposal</h2>
            </div>
            <form>
              <div className="grid gap-8 md:grid-cols-2">
                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Client Information</CardTitle>
                    <CardDescription>Enter the client details for your proposal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label htmlFor="clientName">Client Name</Label>
                        <Input
                          id="clientName"
                          placeholder="Enter client name or company"
                          value={formData.clientName}
                          onChange={(e) => handleChange('clientName', e.target.value)}
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="timeline">Completion Timeline</Label>
                        <div className="flex gap-2 items-center">
                          <Input
                            id="timeline"
                            placeholder="e.g. 2 weeks"
                            value={formData.timeline ?? ""}
                            onChange={(e) => handleChange('timeline', e.target.value)}
                            className="flex-1"
                          />
                          <div className="flex items-center space-x-2">
                            <Checkbox
                              id="includeTimelineStatement"
                              checked={formData.includeTimelineStatement === 'yes'}
                              onCheckedChange={(checked) => {
                                handleChange('includeTimelineStatement', checked ? 'yes' : 'no');
                              }}
                            />
                            <Label htmlFor="includeTimelineStatement" className="text-sm">Include statement</Label>
                          </div>
                        </div>
                      </div>

                      <div className="grid gap-2">
                        <Label htmlFor="introduction">Developer Introduction</Label>
                        <Textarea
                          id="introduction"
                          placeholder="Introduce yourself and your expertise..."
                          className="min-h-32"
                          value={formData.developerIntro}
                          onChange={(e) => handleChange('developerIntro', e.target.value)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Proposal Introduction</CardTitle>
                    <CardDescription>Write a compelling introduction for your proposal</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Textarea
                      placeholder="Write your proposal introduction here..."
                      className="min-h-48"
                      value={formData.introduction}
                      onChange={(e) => handleChange('introduction', e.target.value)}
                    />
                  </CardContent>
                </Card>                

                

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Project Examples</CardTitle>
                    <CardDescription>Select relevant project examples to showcase your work</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Tabs defaultValue="web">
                      <TabsList className="grid w-full grid-cols-2 mb-6">
                        <TabsTrigger value="web">Web Development</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile Apps</TabsTrigger>
                      </TabsList>
                      <TabsContent value="web" className="space-y-4">
                        <div className="grid grid-cols-1 gap-6">
                          {webProjects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              project={project}
                              onSelect={(checked) => {
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedProjects: [...prev.selectedProjects, project.title]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedProjects: prev.selectedProjects.filter(p => p !== project.title)
                                  }));
                                }
                              }}
                              isSelected={formData.selectedProjects.includes(project.title)}
                            />
                          ))}
                        </div>
                      </TabsContent>
                      <TabsContent value="mobile" className="space-y-4">
                        <div className="grid grid-cols-1 gap-6">
                          {mobileProjects.map((project, index) => (
                            <ProjectCard
                              key={index}
                              project={project}
                              onSelect={(checked) => {
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedProjects: [...prev.selectedProjects, project.title]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    selectedProjects: prev.selectedProjects.filter(p => p !== project.title)
                                  }));
                                }
                              }}
                              isSelected={formData.selectedProjects.includes(project.title)}
                            />
                          ))}
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Client Reviews</CardTitle>
                    <CardDescription>Showcase testimonials from your previous clients</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 gap-6">
                      {clientReviews.map((review, index) => (
                        <div key={index} className="flex flex-col p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow">
                          <div className="">
                            <span className="font-medium ">{review.name}: </span>
                            <span className="italic">"{review.testimonial}"</span>
                          </div>
                          <div className="flex mt-4">
                            <Checkbox
                              id={`include-review-${index}`}
                              className="mr-2"
                              checked={formData.clientReviews.includes(review)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setFormData(prev => ({
                                    ...prev,
                                    clientReviews: [...prev.clientReviews, review]
                                  }));
                                } else {
                                  setFormData(prev => ({
                                    ...prev,
                                    clientReviews: prev.clientReviews.filter(r => r !== review)
                                  }));
                                }
                              }}
                            />
                            <Label htmlFor={`include-review-${index}`} className="text-sm">Include in proposal</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>Additional Options</CardTitle>
                    <CardDescription>Configure additional options for your proposal</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div>
                        <Label>Responsive Design</Label>
                        <RadioGroup
                          defaultValue={formData.responsive}
                          onValueChange={(value) => handleChange('responsive', value)}
                          className="grid grid-cols-1 gap-3 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="r1" />
                            <Label htmlFor="r1">Yes, responsive design included</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="r2" />
                            <Label htmlFor="r2">No, desktop only</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div>
                        <Label>Test Task Option</Label>
                        <RadioGroup
                          defaultValue={formData.testTask}
                          onValueChange={(value) => handleChange('testTask', value)}
                          className="grid grid-cols-1 gap-3 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="tt1" />
                            <Label htmlFor="tt1">Yes, I'm willing to do a test task</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="tt2" />
                            <Label htmlFor="tt2">No test task needed</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      <Separator />

                      <div>
                        <Label>Low Price Statement</Label>
                        <RadioGroup
                          defaultValue={formData.lowPriceStatement}
                          onValueChange={(value) => handleChange('lowPriceStatement', value)}
                          className="grid grid-cols-1 gap-3 mt-2"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="yes" id="lp1" />
                            <Label htmlFor="lp1">Include low price statement</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="no" id="lp2" />
                            <Label htmlFor="lp2">Exclude low price statement</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <Separator />
                      <div className="grid gap-2">
                        <Label htmlFor="projectType">Project Type</Label>
                        <Select
                          value={formData.projectType}
                          onValueChange={(value) => handleChange('projectType', value)}
                        >
                          <SelectTrigger id="projectType">
                            <SelectValue placeholder="Select project type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="website">Website Development</SelectItem>
                            <SelectItem value="webapp">Web Application</SelectItem>
                            <SelectItem value="mobileapp">Mobile Application</SelectItem>
                            <SelectItem value="ecommerce">E-commerce Solution</SelectItem>
                            <SelectItem value="design">UI/UX Design</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Separator />
                      <div className="grid gap-2">
                        <Label htmlFor="rate">Your Rate</Label>
                        <Input
                          id="rate"
                          placeholder="e.g. $50/hour or $2000 fixed price"
                          value={formData.rate}
                          onChange={(e) => handleChange('rate', e.target.value)}
                        />
                      </div>

                    </div>
                  </CardContent>
                </Card>
                

                <Card className="col-span-2">
                  <CardHeader>
                    <CardTitle>GitHub Profile</CardTitle>
                    <CardDescription>Showcase your open source contributions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center space-x-4 p-4 border rounded-lg bg-secondary/20">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src="https://github.com/identicons/jsmith.png" alt="GitHub" />
                        <AvatarFallback>GH</AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-medium text-lg">{formData.githubProfile}</h4>
                        <p className="text-muted-foreground">View my open source contributions</p>
                        <Input
                          className="mt-2 max-w-md"
                          placeholder="Enter your GitHub username"
                          value={formData.githubProfile}
                          onChange={(e) => handleChange('githubProfile', e.target.value)}
                        />
                      </div>

                     
                    </div>
                  </CardContent>
                </Card>
              </div>
            </form>
          </div>

          <div className="space-y-6 sticky top-6 h-[calc(100vh-2rem)] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold">Proposal Preview</h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <PlainTextProposal
                data={formData}
                projects={{
                  web: webProjects,
                  mobile: mobileProjects,
                  design: [] // Add empty design projects array to match the required type
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const webProjects = [
  {
    title: 'Software development with Monorepo',
    description: 'A browser-based game and a SaaS application using a monorepo architecture',
    link: 'https://universe-dawn.com',
    technologies: ['React', "Next.js", 'TypeScript', 'Node.js', 'MongoDB', 'Monorepo', 'SASS', 'Jest', 'Storybook']
  },
  {
    title: 'Safty Blog',
    description: 'A modern blog platform featuring user authentication, rich content management, and responsive design.',
    link: 'https://safty-blog.vercel.app',
    technologies: ['React', 'TypeScript', 'Next.js', 'NextAuth', 'Tailwind CSS', 'Sanity CMS']
  },
  {
    title: 'Universe Dawn',
    description: 'An immersive sci-fi themed landing page showcasing advanced UI animations and interactive elements. Features responsive design and cross-browser compatibility.',
    link: 'https://universe-dawn.com',
    technologies: ['React', "Next.js", 'TypeScript', 'SASS', 'Arwes Framework', 'Storybook']
  },
  {
    title: 'SaftyTube',
    description: 'A YouTube clone with real-time search, video categorization, channel pages, and detailed video statistics.',
    link: 'https://saftytube.netlify.app',
    technologies: ['React', 'TypeScript', 'Material UI', 'YouTube API']
  },
  // {
  //   title: 'Personal Portfolio',
  //   description: 'A professionally crafted portfolio website demonstrating modern web design principles. Features include smooth scrolling navigation, dynamic project galleries, contact forms, and optimized performance.',
  //   link: 'https://me-safty.github.io/personal-portfolio',
  //   technologies: ['HTML', 'CSS', 'JavaScript']
  // },
  // {
  //   title: 'Bootstrap Landing Page',
  //   description: "A high-performance landing page with custom animations, responsive navigation, testimonial carousel, and contact forms. Optimized for various screen sizes with a focus on user experience and conversion.",
  //   link: 'https://me-safty.github.io/bootstrap-temp-1',
  //   technologies: ['HTML', 'CSS', 'Bootstrap 5']
  // }
];

const mobileProjects = [
  {
    title: 'Fitness Tracking App',
    description: 'Mobile app for tracking workouts and nutrition',
    technologies: ['React Native', 'Firebase', 'Redux']
  },
  {
    title: 'Food Delivery App',
    description: 'On-demand food delivery application with real-time tracking',
    technologies: ['Flutter', 'Firebase', 'Google Maps API']
  },
];

const clientReviews = [
  {
    name: 'Jake',
    testimonial: 'Mohamed is professional and great to work with. Excellent communication and the project was delivered quickly to a high standard. He answered all of my questions and was very helpful. I will definitely work with him again!'
  },
  // {
  //   name: 'Shri',
  //   testimonial: 'He is a humble and responsible individual who produces clean and impressive work.'
  // },
  {
    name: 'Marcel',
    testimonial: 'It was a pleasure to work with him. He always took responsibility and knew how to read and solve issues in a fast and efficient way.'
  },
  {
    name: 'Mohamed',
    testimonial: 'Working with Mohamed was a fantastic experience. He delivered exceptional results, demonstrating professionalism and expertise in his field. His timely and effective communication made the process smooth. Highly recommend for quality work!'
  },
];

function ProjectCard({ 
  project, 
  onSelect, 
  isSelected 
}: { 
  project: any; 
  onSelect: (checked: boolean) => void;
  isSelected: boolean;
}) {  
  return (
    <div className="border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all">
      {/* <img src={project.image} alt={project.title} className="w-full h-48 object-cover" /> */}
      <div className="p-5">
        <h3 className="font-medium text-lg">
          {project.link ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className=" hover:underline">
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>
        <p className="text-sm text-muted-foreground mt-2">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech: string, index: number) => (
            <span key={index} className="text-xs bg-secondary px-2 py-1 rounded-md">{tech}</span>
          ))}
        </div>
        <div className="mt-4 flex items-center">
          <Checkbox 
            id={`select-${project.title}`} 
            checked={isSelected}
            onCheckedChange={onSelect}
          />
          <label htmlFor={`select-${project.title}`} className="text-sm ml-2 cursor-pointer">
            Include in proposal
          </label>
        </div>
      </div>
    </div>
  );
}