import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Clipboard } from 'lucide-react';

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
}

interface ProposalTextProps {
  data: {
    clientName: string;
    projectType: string;
    timeline: string;
    responsive: string;
    testTask: string;
    lowPriceStatement: string;
    introduction: string;
    developerIntro: string;
    selectedProjects: string[];
    rate: string;
    githubProfile: string;
    clientReviews: Array<{
      name: string;
      company: string;
      testimonial: string;
    }>;
  };
  projects: {
    web: Project[];
    mobile: Project[];
    design: Project[];
  };
}

const PlainTextProposal: React.FC<ProposalTextProps> = ({ data, projects }) => {
  const selectedProjectsData = [
    ...projects.web.filter(p => data.selectedProjects.includes(p.title)),
    ...projects.mobile.filter(p => data.selectedProjects.includes(p.title))
  ];

  const getProjectTypeLabel = (type: string) => {
    const types: Record<string, string> = {
      website: 'Website Development',
      webapp: 'Web Application',
      mobileapp: 'Mobile Application',
      ecommerce: 'E-commerce Solution',
      design: 'UI/UX Design'
    };
    return types[type] || type;
  };

  const generatePlainText = () => {
    let text = `Hi ${data.clientName || 'Client'},\n\n`;

    if (data.introduction) {
      text += `${data.introduction}\n\n`;
    } else {
      text += `I saw your requirements, and It seems you are looking for a skilled ${getProjectTypeLabel(data.projectType) || 'developer'} to do some fixes and add some features to the project. I am interested in working on your project and I believe I have the skills and expertise to deliver a high-quality product.\n\n`;
    }

    if (data.testTask === 'yes') {
      text += `I am willing to provide a free, 2-3 hour test task for you to assess my abilities before making a hiring decision.\n\n`;
    }

    text += `I can complete it in no longer than ${data.timeline} or earlier.\n\n`;

    if (data.responsive === 'yes') {
      text += `I'll provide you with a completely responsive website from the largest screen size down to 320px "the smallest screen width".\n\n`;
    }

    if (selectedProjectsData.length > 0) {
      text += `You can see my previous work samples in my portfolio, and here are my projects links:\n`;
      selectedProjectsData.forEach((project, index) => {
        text += `${index + 1}- https://example.com/${project.title.toLowerCase().replace(/ /g, '-')} "This is a ${project.description.toLowerCase()} built with ${project.technologies.join(', ')}".\n`;
      });
      text += `\n`;
    }

    if (data.githubProfile) {
      text += `This is my Github profile link: https://${data.githubProfile}\n\n`;
    }

    if (data.developerIntro) {
      text += `${data.developerIntro}\n\n`;
    } else {
      text += `I'm a developer with experience working on similar projects. I'm here to help and sure you will like my work. I have experience working with various frameworks and libraries.\n\n`;
    }

    if (data.clientReviews.length > 0) {
      text += `Here is what my clients are saying about me:\n`;
      data.clientReviews.forEach((review, index) => {
        text += `${index + 1}- "${review.testimonial}" (${review.name}).\n`;
      });
      text += `\n`;
    }

    if (data.rate) {
      text += `My rate is ${data.rate}.`;
      if (data.lowPriceStatement === 'yes') {
        text += ` I accept a low price because this is the first time I have worked with you, where I strive to obtain a good review and provide the best possible service to the Client at the lowest possible cost.`;
      }
      text += '\n\n';
    } else if (data.lowPriceStatement === 'yes') {
      text += `I accept a low price because this is the first time I have worked with you, where I strive to obtain a good review and provide the best possible service to the Client at the lowest possible cost.\n\n`;
    }

    text += `I would love to discuss the project further and address any questions or concerns you may have. I am available for a call or video conference at your convenience. I am eager to learn more about your requirements and how I can contribute to the success of your project. I look forward to hearing from you and potentially collaborating on this project.`;

    return text;
  };

  const [copySuccess, setCopySuccess] = React.useState("");

  const copyToClipboard = () => {
    const text = generatePlainText();
    navigator.clipboard.writeText(text)
      .then(() => {
        setCopySuccess("Copied to clipboard!");
        setTimeout(() => setCopySuccess(""), 3000);
      })
      .catch(err => {
        console.error('Failed to copy: ', err);
      });
  };

  return (
    <Card className="border-2 shadow-lg">
      <div className="justify-start px-6 pt-3">
        <Button 
          onClick={copyToClipboard} 
          variant="outline" 
          size="sm"
          className="flex items-center gap-2"
        >
          <Clipboard className="h-4 w-4" />
          Copy to Clipboard
        </Button>
      {copySuccess && <div className="text-green-500 my-2">{copySuccess}</div>}
      </div>
      <CardContent className="px-6 pb-3">
        <pre className="whitespace-pre-wrap bg-muted p-4 rounded-md text-sm font-mono overflow-auto ">
          {generatePlainText()}
        </pre>
      </CardContent>
    </Card>
  );
};

export default PlainTextProposal;