import {
  backend,
  creator,
  web,
  javascript,
 
  reactjs,
  redux,
  meta,
  tailwind,
  nodejs,
  mongodb,
  git,
  figma,
  docker,
  starbucks,
  shopify,
  tesla,
  carrent,

  
  threejs,
} from "../assets";

export const navLinks = [
  {
    id: "about",
    title: "About",
  },
  {
    id: "work",
    title: "Work",
  },
  {
    id: "contact",
    title: "Contact",
  },
];

const services = [
  {
    title: "Web Developer",
    icon: web,
  },
  {
    title: "Backend Developer",
    icon: backend,
  },
  {
    title: "3D Model with three.js",
    icon: creator,
  },
];

const technologies = [
 
  {
    name: "JavaScript",
    icon: javascript,
  },
  {
    name: "React JS",
    icon: reactjs,
  },
  {
    name: "Redux Toolkit",
    icon: redux,
  },
  {
    name: "Tailwind CSS",
    icon: tailwind,
  },
  {
    name: "Laravel",
    icon: docker,
  },
  {
    name: "Node JS",
    icon: nodejs,
  },
  {
    name: "MongoDB",
    icon: mongodb,
  },
  {
    name: "Three JS",
    icon: threejs,
  },
  {
    name: "git",
    icon: git,
  },
  {
    name: "Graphql",
    icon: figma,
  },
];

const experiences = [
  {
    title: "Ecommerce Laravel Backend",
    company_name: "kurazTech",
    icon: starbucks,
    iconBg: "#383E56",
    date: "2024",
    points: [
      "Software development Intern",
      "Assisted in developing and debugging web applications using PHP and Laravel.",
      "Gained hands-on experience in database management and REST API integration.",
      "Received a certificate of completion for outstanding performance and dedication.",
      "Participating in code reviews and providing constructive feedback to other developers.",
    ],
  },
  {
    title: "Broker Web MERN Stack",
    company_name: "Addisway", 
    icon: tesla,
    iconBg: "#E6DEDD",
    date: "2024",
    points: [
      "Software development Intern",
      "Assisted in developing and debugging web applications using React.js and MongoDB.",
      "Supported the development team in troubleshooting and resolving technical issues.",
      "Collaborated with designers, PMs, and developers to create high-quality products.",
      "Implemented responsive design and ensured cross-browser compatibility.",
      "Participated in team meetings to brainstorm innovative solutions for workflow automation.",
    ],
  },
];

const testimonials = [
  {
    testimonial:
      "I thought it was impossible to make a website as beautiful as our product, but Rick proved me wrong.",
    name: "Sara Lee",
    designation: "CFO",
    company: "Acme Co",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
  },
  {
    testimonial:
      "I've never met a web developer who truly cares about their clients' success like Rick does.",
    name: "Chris Brown",
    designation: "COO",
    company: "DEF Corp",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
  },
  {
    testimonial:
      "After Rick optimized our website, our traffic increased by 50%. We can't thank them enough!",
    name: "Lisa Wang",
    designation: "CTO",
    company: "456 Enterprises",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
  },
];

const projects = [
  {
    name: "Car Rent",
    description:
      "Web-based platform that allows users to search, book, and manage car rentals from various providers, providing a convenient and efficient solution for transportation needs.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "mongodb",
        color: "green-text-gradient",
      },
      {
        name: "tailwind",
        color: "pink-text-gradient",
      },
    ],
    image: carrent,
    source_code_link: "https://github.com/",
  },
  {
    name: "Job IT",
    description:
      "Web application that enables users to search for job openings, view estimated salary ranges for positions, and locate available jobs based on their current location.",
    tags: [
      {
        name: "react",
        color: "blue-text-gradient",
      },
      {
        name: "restapi",
        color: "green-text-gradient",
      },
      {
        name: "scss",
        color: "pink-text-gradient",
      },
    ],
    image: "https://via.placeholder.com/600x400", // ✅ placeholder
    source_code_link: "https://github.com/",
  },
  {
    name: "Trip Guide",
    description:
      "A comprehensive travel booking platform that allows users to book flights, hotels, and rental cars, and offers curated recommendations for popular destinations.",
    tags: [
      {
        name: "nextjs",
        color: "blue-text-gradient",
      },
      {
        name: "supabase",
        color: "green-text-gradient",
      },
      {
        name: "css",
        color: "pink-text-gradient",
      },
    ],
    image: "https://via.placeholder.com/600x400", // ✅ placeholder
    source_code_link: "https://github.com/",
  },
];

export { services, technologies, experiences, testimonials, projects };
