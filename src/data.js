// Learning content preserved from the original repository.
export const categories = [
  {
    id: "coc1",
    label: "COC 1",
    description: "Computer essentials",
  },
  {
    id: "coc2",
    label: "COC 2",
    description: "Systems & troubleshooting",
  },
  {
    id: "coc3",
    label: "COC 3",
    description: "Web & development",
  },
  {
    id: "others",
    label: "Others",
    description: "More ICT discoveries",
  },
];
export const terms = [
  {
    id: "adobe xd",
    term: "Adobe XD",
    full: "Adobe Experience Design",
    meaning: "Vector‑based UI/UX design and prototyping tool by Adobe.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Adobe Experience Design. Vector-based UI/UX design and prototyping tool by Adobe.",
      },
    ],
  },
  {
    id: "after effects",
    term: "After Effects",
    full: "Adobe After Effects",
    meaning: "Software for motion graphics and visual effects.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Adobe After Effects. Software for motion graphics and visual effects.",
      },
    ],
  },
  {
    id: "ajax",
    term: "AJAX",
    full: "Asynchronous JavaScript and XML",
    meaning:
      "Technique to fetch data in the background without reloading a page.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Asynchronous JavaScript and XML. Technique to fetch data in the background without reloading a page.",
      },
    ],
  },
  {
    id: "angular",
    term: "Angular",
    full: "Angular Framework",
    meaning: "Google‑maintained TypeScript framework for large‑scale web apps.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Angular Framework. Google-maintained TypeScript framework for large-scale web apps.",
      },
    ],
  },
  {
    id: "antistatic wrist strap",
    term: "Antistatic Wrist Strap",
    full: "Grounding Wrist Strap",
    meaning:
      "Worn to prevent electrostatic discharge that could damage computer components during repair.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "A safety device used when repairing or assembling computers. It prevents electrostatic discharge (ESD) from damaging components.",
      },
    ],
  },
  {
    id: "aspect ratio",
    term: "Aspect Ratio",
    full: "Width‑to‑Height Ratio",
    meaning: "Proportional relationship between width and height of media.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Width-to-Height Ratio. Proportional relationship between width and height of media.",
      },
    ],
  },
  {
    id: "babel",
    term: "Babel",
    full: "Babel Transpiler",
    meaning:
      "JavaScript compiler that converts modern JS/TS into browser‑compatible code.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Babel Transpiler. JavaScript compiler that converts modern JS/TS into browser-compatible code.",
      },
    ],
  },
  {
    id: "bios",
    term: "BIOS",
    full: "Basic Input Output System",
    meaning:
      "The firmware that starts up your PC and prepares hardware before the OS loads.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Basic Input/Output System. It is firmware that initializes and tests hardware during the boot process before the operating system loads.",
      },
    ],
  },
  {
    id: "bios update",
    term: "BIOS Update",
    full: "Firmware Upgrade",
    meaning: "Updates motherboard firmware for stability and new features.",
    categories: ["coc2"],
  },
  {
    id: "bit",
    term: "Bit",
    full: "Binary Digit",
    meaning: "Smallest unit of data.",
    categories: ["others"],
  },
  {
    id: "bootrec",
    term: "Bootrec",
    full: "Boot Recovery Tool",
    meaning: "Repairs MBR, boot sector and BCD store.",
    categories: ["coc2"],
  },
  {
    id: "bootstrap",
    term: "Bootstrap",
    full: "Bootstrap CSS Framework",
    meaning: "Popular CSS & JS toolkit for responsive, mobile‑first websites.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Bootstrap CSS Framework. Popular CSS & JS toolkit for responsive, mobile-first websites.",
      },
    ],
  },
  {
    id: "branch",
    term: "Branch",
    full: "Git Branch",
    meaning: "Parallel line of development in a Git repository.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Git Branch. Parallel line of development in a Git repository.",
      },
    ],
  },
  {
    id: "byte",
    term: "Byte",
    full: "Byte",
    meaning: "Group of 8 bits.",
    categories: ["others"],
  },
  {
    id: "cable tester",
    term: "Cable Tester",
    full: "LAN Cable Tester",
    meaning: "Verifies wiring and continuity of network cables.",
    categories: ["coc2"],
  },
  {
    id: "canvas",
    term: "Canvas",
    full: "HTML Canvas",
    meaning:
      "Bitmap drawing area in HTML5 used for 2‑D games, graphs, and image editing.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "HTML Canvas. Bitmap drawing area in HTML5 used for 2-D games, graphs, and image editing.",
      },
    ],
  },
  {
    id: "chkdsk",
    term: "CHKDSK",
    full: "Check Disk",
    meaning: "Scans file system and repairs logical disk errors.",
    categories: ["coc2"],
  },
  {
    id: "ci/cd",
    term: "CI/CD",
    full: "Continuous Integration / Continuous Deployment",
    meaning: "Practices that automate testing and deployment of code.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Continuous Integration / Continuous Deployment. Practices that automate testing and deployment of code.",
      },
    ],
  },
  {
    id: "cloud computing",
    term: "Cloud Computing",
    full: "Cloud Computing",
    meaning: "Storing data on the internet.",
    categories: ["others"],
  },
  {
    id: "cmos battery",
    term: "CMOS Battery",
    full: "CMOS Battery",
    meaning:
      "A small battery on the motherboard that provides power to store BIOS settings.",
    categories: ["coc2", "others"],
  },
  {
    id: "codec",
    term: "Codec",
    full: "Coder‑Decoder",
    meaning:
      "Software or hardware that compresses/decompresses audio or video.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Coder-Decoder. Software or hardware that compresses/decompresses audio or video.",
      },
    ],
  },
  {
    id: "command prompt",
    term: "Command Prompt",
    full: "CMD",
    meaning: "A command‑line interpreter used to execute commands in Windows.",
    categories: ["coc2"],
  },
  {
    id: "commit",
    term: "Commit",
    full: "Git Commit",
    meaning: "Snapshot of changes saved to a Git repository history.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Git Commit. Snapshot of changes saved to a Git repository history.",
      },
    ],
  },
  {
    id: "container",
    term: "Container",
    full: "Software Container",
    meaning:
      "Isolated runtime environment that bundles application code with its libraries.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Software Container. Isolated runtime environment that bundles application code with its libraries.",
      },
    ],
  },
  {
    id: "cpu",
    term: "CPU",
    full: "Central Processing Unit",
    meaning:
      "The brain of the computer that processes instructions from programs and software.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "Others",
        text: "Brain of the computer.",
      },
      {
        source: "All terms",
        text: "Brain of the computer.",
      },
      {
        source: "COC 1",
        text: "Central Processing Unit. Known as the brain of the computer, it executes instructions and processes data.",
      },
    ],
  },
  {
    id: "css",
    term: "CSS",
    full: "Cascading Style Sheets",
    meaning:
      "Used to style and layout web pages. It controls colors, fonts, and responsive designs.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "Others",
        text: "Used for styling web pages.",
      },
      {
        source: "All terms",
        text: "Used for styling web pages.",
      },
      {
        source: "COC 1",
        text: "Cascading Style Sheets. A stylesheet language used to control the design, layout, and presentation of web pages.",
      },
    ],
  },
  {
    id: "css3",
    term: "CSS3",
    full: "CSS3",
    meaning:
      "Latest CSS specification with features like Flexbox, Grid, animations and variables.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "CSS3. Latest CSS specification with features like Flexbox, Grid, animations and variables.",
      },
    ],
  },
  {
    id: "device manager",
    term: "Device Manager",
    full: "Hardware Manager",
    meaning: "Displays hardware devices and allows driver management.",
    categories: ["coc2"],
  },
  {
    id: "disk management",
    term: "Disk Management",
    full: "Disk Partition Tool",
    meaning: "Utility for creating, deleting and formatting partitions.",
    categories: ["coc2"],
  },
  {
    id: "dns",
    term: "DNS",
    full: "Domain Name System",
    meaning: "Translates domain names to IP addresses.",
    categories: ["others"],
  },
  {
    id: "docker",
    term: "Docker",
    full: "Docker Container Platform",
    meaning:
      "Tool for packaging applications and dependencies into portable containers.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Docker Container Platform. Tool for packaging applications and dependencies into portable containers.",
      },
    ],
  },
  {
    id: "dual boot",
    term: "Dual Boot",
    full: "Multi‑OS Setup",
    meaning:
      "Configuration that lets you choose between two operating systems at startup.",
    categories: ["coc2"],
  },
  {
    id: "dvi",
    term: "DVI",
    full: "DVI",
    meaning:
      "Digital Visual Interface. A video display interface used to connect a video source to a display device.",
    categories: ["coc2", "others"],
  },
  {
    id: "ethernet",
    term: "Ethernet",
    full: "Ethernet",
    meaning: "Wired networking technology.",
    categories: ["others", "coc2"],
    notes: [
      {
        source: "COC 2",
        text: "A networking technology for wired local area networks (LANs) that uses cables to connect devices.",
      },
    ],
  },
  {
    id: "express",
    term: "Express",
    full: "Express JS",
    meaning: "Minimal Node.js web application framework for APIs and servers.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Express JS. Minimal Node.js web application framework for APIs and servers.",
      },
    ],
  },
  {
    id: "fetch api",
    term: "Fetch API",
    full: "Fetch API",
    meaning:
      "Modern JavaScript interface for making HTTP requests and handling promises.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Fetch API. Modern JavaScript interface for making HTTP requests and handling promises.",
      },
    ],
  },
  {
    id: "figma",
    term: "Figma",
    full: "Figma Design Tool",
    meaning:
      "Browser‑based UI/UX design and prototyping platform for collaborative work.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Figma Design Tool. Browser-based UI/UX design and prototyping platform for collaborative work.",
      },
    ],
  },
  {
    id: "firewall",
    term: "Firewall",
    full: "Security System",
    meaning:
      "Protects computers from unauthorized access by monitoring and controlling network traffic.",
    categories: ["coc1", "others", "coc2"],
    notes: [
      {
        source: "Others",
        text: "Security system for networks.",
      },
      {
        source: "All terms",
        text: "Security system for networks.",
      },
      {
        source: "COC 1",
        text: "A network security system that monitors and controls incoming and outgoing traffic to protect systems from threats.",
      },
      {
        source: "COC 2",
        text: "A network security system that monitors and controls incoming and outgoing network traffic.",
      },
    ],
  },
  {
    id: "fps",
    term: "FPS",
    full: "Frames Per Second",
    meaning: "Number of frames displayed each second in video or animation.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Frames Per Second. Number of frames displayed each second in video or animation.",
      },
    ],
  },
  {
    id: "gif",
    term: "GIF",
    full: "Graphics Interchange Format",
    meaning: "Image format supporting 256 colors and simple animations.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Graphics Interchange Format. Image format supporting 256 colors and simple animations.",
      },
    ],
  },
  {
    id: "git",
    term: "Git",
    full: "Git Version Control",
    meaning: "Distributed version‑control system for tracking code changes.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Git Version Control. Distributed version-control system for tracking code changes.",
      },
    ],
  },
  {
    id: "github",
    term: "GitHub",
    full: "GitHub Platform",
    meaning: "Cloud service for hosting Git repositories and collaboration.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "GitHub Platform. Cloud service for hosting Git repositories and collaboration.",
      },
    ],
  },
  {
    id: "gitlab",
    term: "GitLab",
    full: "GitLab Platform",
    meaning: "DevOps lifecycle tool providing Git hosting and CI/CD pipelines.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "GitLab Platform. DevOps lifecycle tool providing Git hosting and CI/CD pipelines.",
      },
    ],
  },
  {
    id: "gui",
    term: "GUI",
    full: "Graphical User Interface",
    meaning: "Visual way to interact with a device.",
    categories: ["others"],
  },
  {
    id: "hardware",
    term: "Hardware",
    full: "Physical Components",
    meaning:
      "The physical parts of a computer like the monitor, keyboard, motherboard, and hard drive.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "The physical components of a computer system such as the CPU, RAM, motherboard, and storage devices.",
      },
    ],
  },
  {
    id: "hdd",
    term: "HDD",
    full: "Hard Disk Drive",
    meaning:
      "A storage device that holds data permanently, such as the operating system and files.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Hard Disk Drive. A traditional storage device that uses spinning disks to read/write data.",
      },
    ],
  },
  {
    id: "hdmi",
    term: "HDMI",
    full: "HDMI",
    meaning:
      "High-Definition Multimedia Interface. A digital interface used for transmitting audio and video signals.",
    categories: ["coc2", "others"],
  },
  {
    id: "heat sink",
    term: "Heat Sink",
    full: "Heat Sink",
    meaning:
      "A device that dissipates heat away from computer components, usually from the CPU or GPU.",
    categories: ["coc2", "others"],
  },
  {
    id: "html",
    term: "HTML",
    full: "HyperText Markup Language",
    meaning:
      "A markup language used to structure content on the web. It defines elements like headings, paragraphs, and links.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "Others",
        text: "Creates web pages.",
      },
      {
        source: "All terms",
        text: "Creates web pages.",
      },
      {
        source: "COC 1",
        text: "HyperText Markup Language. The standard markup language used for creating and structuring web pages.",
      },
    ],
  },
  {
    id: "html5",
    term: "HTML5",
    full: "HTML5",
    meaning:
      "Latest major version of HTML introducing semantic tags, audio/video elements, and Canvas.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "HTML5. Latest major version of HTML introducing semantic tags, audio/video elements, and Canvas.",
      },
    ],
  },
  {
    id: "http",
    term: "HTTP",
    full: "Hypertext Transfer Protocol",
    meaning: "Transfers web content.",
    categories: ["others"],
  },
  {
    id: "https",
    term: "HTTPS",
    full: "Hypertext Transfer Protocol Secure",
    meaning: "Secure version of HTTP.",
    categories: ["others"],
  },
  {
    id: "hub",
    term: "Hub",
    full: "Hub",
    meaning:
      "A basic networking device that connects multiple devices in a LAN but broadcasts data to all devices.",
    categories: ["coc2", "others"],
  },
  {
    id: "hyper‑v",
    term: "Hyper‑V",
    full: "Microsoft Virtualization Platform",
    meaning: "Native hypervisor for creating and managing virtual machines.",
    categories: ["coc2"],
  },
  {
    id: "illustrator",
    term: "Illustrator",
    full: "Adobe Illustrator",
    meaning: "Vector graphics editor used for logos, icons, and illustrations.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Adobe Illustrator. Vector graphics editor used for logos, icons, and illustrations.",
      },
    ],
  },
  {
    id: "ip",
    term: "IP",
    full: "Internet Protocol",
    meaning: "Addresses and routes data on networks.",
    categories: ["others"],
  },
  {
    id: "ip address",
    term: "IP Address",
    full: "Internet Protocol Address",
    meaning: "A unique number assigned to each device connected to a network.",
    categories: ["coc1", "coc2", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Internet Protocol Address. A unique identifier assigned to each device connected to a network for communication purposes.",
      },
      {
        source: "COC 2",
        text: "A numerical label assigned to each device connected to a computer network.",
      },
    ],
  },
  {
    id: "isp",
    term: "ISP",
    full: "Internet Service Provider",
    meaning: "Provides internet access.",
    categories: ["others"],
  },
  {
    id: "javascript",
    term: "JavaScript",
    full: "JavaScript",
    meaning:
      "A programming language used to make web pages interactive (like buttons, sliders, and forms).",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "A programming language mainly used for adding interactivity, dynamic content, and functionality to web pages.",
      },
    ],
  },
  {
    id: "jpeg",
    term: "JPEG",
    full: "Joint Photographic Experts Group",
    meaning: "Common lossy image format balancing quality and size.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Joint Photographic Experts Group. Common lossy image format balancing quality and size.",
      },
    ],
  },
  {
    id: "json",
    term: "JSON",
    full: "JavaScript Object Notation",
    meaning:
      "Lightweight data‑interchange format easy for humans and machines to read/write.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "JavaScript Object Notation. Lightweight data-interchange format easy for humans and machines to read/write.",
      },
    ],
  },
  {
    id: "kubernetes",
    term: "Kubernetes",
    full: "Kubernetes",
    meaning:
      "Open‑source system for automating deployment, scaling, and management of containerized apps.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Kubernetes. Open-source system for automating deployment, scaling, and management of containerized apps.",
      },
    ],
  },
  {
    id: "lan",
    term: "LAN",
    full: "Local Area Network",
    meaning: "Connects computers in a local area.",
    categories: ["others"],
  },
  {
    id: "lan cable",
    term: "LAN Cable",
    full: "Ethernet Cable",
    meaning:
      "Used to connect computers to a network for internet access or local data sharing.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Local Area Network cable. Used to connect computers and devices within a network for wired communication.",
      },
    ],
  },
  {
    id: "less",
    term: "LESS",
    full: "Leaner Style Sheets",
    meaning: "CSS pre‑processor with variables and modularization.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Leaner Style Sheets. CSS pre-processor with variables and modularization.",
      },
    ],
  },
  {
    id: "mac address",
    term: "MAC Address",
    full: "Media Access Control Address",
    meaning: "Unique device identifier.",
    categories: ["others"],
  },
  {
    id: "mbr",
    term: "MBR",
    full: "Master Boot Record",
    meaning:
      "First sector of a drive containing bootloader and partition table.",
    categories: ["coc2"],
  },
  {
    id: "merge",
    term: "Merge",
    full: "Git Merge",
    meaning: "Combines changes from different branches into one.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Git Merge. Combines changes from different branches into one.",
      },
    ],
  },
  {
    id: "mockup",
    term: "Mockup",
    full: "Design Mock‑up",
    meaning: "High‑fidelity static design showing final look before coding.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Design Mock-up. High-fidelity static design showing final look before coding.",
      },
    ],
  },
  {
    id: "motherboard",
    term: "Motherboard",
    full: "Main Circuit Board",
    meaning:
      "Holds and connects all the major components of the computer like CPU, RAM, and storage.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "The main circuit board of a computer that connects and allows communication between all hardware components.",
      },
    ],
  },
  {
    id: "mp3",
    term: "MP3",
    full: "MPEG‑1 Audio Layer III",
    meaning: "Popular lossy audio format (music, podcasts).",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "MPEG-1 Audio Layer III. Popular lossy audio format (music, podcasts).",
      },
    ],
  },
  {
    id: "mp4",
    term: "MP4",
    full: "MPEG‑4 Part 14",
    meaning: "Digital multimedia container format for storing video and audio.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "MPEG-4 Part 14. Digital multimedia container format for storing video and audio.",
      },
    ],
  },
  {
    id: "multimeter",
    term: "Multimeter",
    full: "Digital Multimeter",
    meaning:
      "A tool used to measure voltage, current, and resistance. Essential in diagnosing electrical issues in computers.",
    categories: ["coc1", "coc2", "others"],
    notes: [
      {
        source: "COC 2",
        text: "Measures voltage, current and resistance when servicing hardware.",
      },
      {
        source: "All terms",
        text: "Measures voltage, current and resistance when servicing hardware.",
      },
      {
        source: "COC 1",
        text: "An electronic measuring instrument used to test voltage, current, and resistance in electrical circuits.",
      },
    ],
  },
  {
    id: "nic",
    term: "NIC",
    full: "NIC",
    meaning:
      "Network Interface Card. A hardware component that allows a device to connect to a network.",
    categories: ["coc2", "others"],
  },
  {
    id: "node.js",
    term: "Node.js",
    full: "Node JavaScript Runtime",
    meaning: "Server‑side JavaScript runtime built on Chrome's V8 engine.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Node JavaScript Runtime. Server-side JavaScript runtime built on Chrome's V8 engine.",
      },
    ],
  },
  {
    id: "npm",
    term: "NPM",
    full: "Node Package Manager",
    meaning: "Default package manager for Node.js ecosystems.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Node Package Manager. Default package manager for Node.js ecosystems.",
      },
    ],
  },
  {
    id: "ogg",
    term: "OGG",
    full: "Ogg Vorbis",
    meaning: "Open, patent‑free container often used for Vorbis audio.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Ogg Vorbis. Open, patent-free container often used for Vorbis audio.",
      },
    ],
  },
  {
    id: "os",
    term: "OS",
    full: "Operating System",
    meaning: "Manages computer hardware and software.",
    categories: ["others"],
  },
  {
    id: "package.json",
    term: "package.json",
    full: "Node Package Manifest",
    meaning:
      "File listing project metadata, dependencies, and scripts for Node projects.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Node Package Manifest. File listing project metadata, dependencies, and scripts for Node projects.",
      },
    ],
  },
  {
    id: "partition",
    term: "Partition",
    full: "Disk Partition",
    meaning: "Logical division of a storage device into isolated sections.",
    categories: ["coc2"],
  },
  {
    id: "patch panel",
    term: "PATCH Panel",
    full: "PATCH Panel",
    meaning:
      "A mounted hardware assembly with ports used to connect and manage cables in a network.",
    categories: ["coc2", "others"],
  },
  {
    id: "photoshop",
    term: "Photoshop",
    full: "Adobe Photoshop",
    meaning:
      "Industry‑standard raster graphics editor for images and digital art.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Adobe Photoshop. Industry-standard raster graphics editor for images and digital art.",
      },
    ],
  },
  {
    id: "ping",
    term: "Ping",
    full: "Packet Internet Groper",
    meaning:
      "A command used to test the speed or connectivity between two network devices.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "A network utility used to test connectivity between devices by sending packets of data and measuring response time.",
      },
    ],
  },
  {
    id: "png",
    term: "PNG",
    full: "Portable Network Graphics",
    meaning:
      "Raster image format supporting transparency and lossless compression.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Portable Network Graphics. Raster image format supporting transparency and lossless compression.",
      },
    ],
  },
  {
    id: "post",
    term: "POST",
    full: "POST",
    meaning:
      "Power-On Self Test. A diagnostic testing sequence run by a computer's BIOS to check hardware components before booting the OS.",
    categories: ["coc2", "others"],
  },
  {
    id: "powershell",
    term: "PowerShell",
    full: "Windows PowerShell",
    meaning:
      "Advanced command shell and scripting language for task automation.",
    categories: ["coc2"],
  },
  {
    id: "premiere pro",
    term: "Premiere Pro",
    full: "Adobe Premiere Pro",
    meaning: "Professional video editing software.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Adobe Premiere Pro. Professional video editing software.",
      },
    ],
  },
  {
    id: "prototype",
    term: "Prototype",
    full: "Interactive Prototype",
    meaning: "Clickable model simulating user flow for testing UX.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Interactive Prototype. Clickable model simulating user flow for testing UX.",
      },
    ],
  },
  {
    id: "psu",
    term: "PSU",
    full: "Power Supply Unit",
    meaning:
      "Converts electricity from a wall outlet into power the computer can use safely.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Power Supply Unit. Provides power to all components of a computer by converting electricity from the outlet into usable power for hardware.",
      },
    ],
  },
  {
    id: "pull request",
    term: "Pull Request",
    full: "Merge Request",
    meaning:
      "Proposal to merge code into a branch, enabling review and discussion.",
    categories: ["coc3"],
  },
  {
    id: "ram",
    term: "RAM",
    full: "Random Access Memory",
    meaning:
      "Temporary memory used to store data the computer is currently using. More RAM means better multitasking.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "Others",
        text: "Temporary memory storage.",
      },
      {
        source: "All terms",
        text: "Temporary memory storage.",
      },
      {
        source: "COC 1",
        text: "Random Access Memory. Temporary memory used by the computer to store data and instructions that are currently being used or processed.",
      },
    ],
  },
  {
    id: "react",
    term: "React",
    full: "React JS",
    meaning:
      "JavaScript library for building user interfaces with components and virtual DOM.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "React JS. JavaScript library for building user interfaces with components and virtual DOM.",
      },
    ],
  },
  {
    id: "registry editor",
    term: "Registry Editor",
    full: "Regedit",
    meaning: "Tool for viewing and editing the Windows Registry.",
    categories: ["coc2"],
  },
  {
    id: "resolution",
    term: "Resolution",
    full: "Pixel Dimensions",
    meaning: "Number of pixels in each dimension that can be displayed.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Pixel Dimensions. Number of pixels in each dimension that can be displayed.",
      },
    ],
  },
  {
    id: "rest api",
    term: "REST API",
    full: "Representational State Transfer API",
    meaning:
      "Architectural style for stateless web services using HTTP methods.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Representational State Transfer API. Architectural style for stateless web services using HTTP methods.",
      },
    ],
  },
  {
    id: "rj11",
    term: "RJ11",
    full: "RJ11",
    meaning: "A connector typically used for telephone lines and modems.",
    categories: ["coc2", "others"],
  },
  {
    id: "rj45",
    term: "RJ45",
    full: "RJ45",
    meaning: "A standard connector for Ethernet networking cables.",
    categories: ["coc2", "others"],
  },
  {
    id: "rom",
    term: "ROM",
    full: "Read-Only Memory",
    meaning: "Permanent memory storage.",
    categories: ["others"],
  },
  {
    id: "router",
    term: "Router",
    full: "Network Router",
    meaning:
      "Distributes internet connections to multiple devices via LAN or Wi‑Fi.",
    categories: ["coc1", "coc2", "others"],
    notes: [
      {
        source: "COC 2",
        text: "A device that forwards data packets between computer networks, providing internet connectivity.",
      },
    ],
  },
  {
    id: "safe mode",
    term: "Safe Mode",
    full: "Diagnostic Boot Mode",
    meaning: "Starts Windows with minimal drivers to help troubleshoot issues.",
    categories: ["coc2"],
  },
  {
    id: "sass",
    term: "SASS",
    full: "Syntactically Awesome Style Sheets",
    meaning:
      "CSS pre‑processor adding variables, nesting, mixins and functions.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Syntactically Awesome Style Sheets. CSS pre-processor adding variables, nesting, mixins and functions.",
      },
    ],
  },
  {
    id: "screwdriver",
    term: "Screwdriver",
    full: "Precision Screwdriver",
    meaning:
      "Used to open and assemble parts of computer hardware during repair and maintenance.",
    categories: ["coc1", "coc2", "others"],
    notes: [
      {
        source: "COC 2",
        text: "Used to open, assemble or replace PC components.",
      },
      {
        source: "All terms",
        text: "Used to open, assemble or replace PC components.",
      },
      {
        source: "COC 1",
        text: "A tool used for tightening or loosening screws when assembling or repairing computers and electronic devices.",
      },
    ],
  },
  {
    id: "server",
    term: "Server",
    full: "Server",
    meaning: "Provides data/services to other computers.",
    categories: ["others"],
  },
  {
    id: "sfc",
    term: "SFC",
    full: "System File Checker",
    meaning: "Scans and restores corrupted Windows system files.",
    categories: ["coc2"],
  },
  {
    id: "software",
    term: "Software",
    full: "Application Software",
    meaning:
      "Programs installed on a computer, like browsers, word processors, or games.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Programs, applications, and operating systems that run on a computer and allow users to perform tasks.",
      },
    ],
  },
  {
    id: "ssd",
    term: "SSD",
    full: "Solid State Drive",
    meaning:
      "A faster storage device than HDD, with no moving parts. Improves boot and load times.",
    categories: ["coc1", "others"],
    notes: [
      {
        source: "COC 1",
        text: "Solid State Drive. A storage device that uses flash memory to store data, providing faster speed than traditional HDDs.",
      },
    ],
  },
  {
    id: "startup repair",
    term: "Startup Repair",
    full: "Automatic Repair Tool",
    meaning: "Fixes problems preventing Windows from booting.",
    categories: ["coc2"],
  },
  {
    id: "svg",
    term: "SVG",
    full: "Scalable Vector Graphics",
    meaning:
      "XML-based vector image format for sharp graphics at any resolution.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Scalable Vector Graphics. XML-based vector image format for sharp graphics at any resolution.",
      },
    ],
  },
  {
    id: "svg (file)",
    term: "SVG (File)",
    full: "Scalable Vector Graphics File",
    meaning: "Vector image file rendered via XML; ideal for icons and logos.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Scalable Vector Graphics File. Vector image file rendered via XML; ideal for icons and logos.",
      },
    ],
  },
  {
    id: "switch",
    term: "Switch",
    full: "Switch",
    meaning:
      "A network device that connects devices within a LAN and forwards data only to the intended recipient.",
    categories: ["coc2", "others"],
  },
  {
    id: "system image recovery",
    term: "System Image Recovery",
    full: "Windows Backup Restore",
    meaning: "Restores an entire system from a disk image.",
    categories: ["coc2"],
  },
  {
    id: "system restore",
    term: "System Restore",
    full: "Windows Recovery Tool",
    meaning: "Restores system files and settings to an earlier point in time.",
    categories: ["coc2"],
  },
  {
    id: "tailwind",
    term: "Tailwind",
    full: "Tailwind CSS",
    meaning: "Utility‑first CSS framework for rapidly building custom designs.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Tailwind CSS. Utility-first CSS framework for rapidly building custom designs.",
      },
    ],
  },
  {
    id: "task manager",
    term: "Task Manager",
    full: "Process Monitor",
    meaning: "Monitors running apps, background processes and resource usage.",
    categories: ["coc2"],
  },
  {
    id: "typescript",
    term: "TypeScript",
    full: "TypeScript",
    meaning: "Superset of JavaScript adding static types and modern syntax.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "TypeScript. Superset of JavaScript adding static types and modern syntax.",
      },
    ],
  },
  {
    id: "uefi",
    term: "UEFI",
    full: "Unified Extensible Firmware Interface",
    meaning: "Modern replacement for BIOS with faster boot and secure boot.",
    categories: ["coc2"],
  },
  {
    id: "ups",
    term: "UPS",
    full: "UPS",
    meaning:
      "Uninterruptible Power Supply. A backup power source that keeps computers running during power outages.",
    categories: ["coc2", "others"],
  },
  {
    id: "url",
    term: "URL",
    full: "Uniform Resource Locator",
    meaning: "Address of a web page.",
    categories: ["others"],
  },
  {
    id: "usb",
    term: "USB",
    full: "Universal Serial Bus",
    meaning: "Standard for connecting devices.",
    categories: ["others"],
  },
  {
    id: "vga",
    term: "VGA",
    full: "VGA",
    meaning:
      "Video Graphics Array. An analog interface used to connect monitors to computers.",
    categories: ["coc2", "others"],
  },
  {
    id: "virtual machine",
    term: "Virtual Machine",
    full: "VM",
    meaning: "Software emulation of a computer system running an OS.",
    categories: ["coc2"],
  },
  {
    id: "vpn",
    term: "VPN",
    full: "Virtual Private Network",
    meaning: "Secures private connections over public networks.",
    categories: ["others"],
  },
  {
    id: "vue",
    term: "Vue",
    full: "Vue JS",
    meaning:
      "Progressive JavaScript framework focused on the view layer and reactivity.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Vue JS. Progressive JavaScript framework focused on the view layer and reactivity.",
      },
    ],
  },
  {
    id: "wan",
    term: "WAN",
    full: "Wide Area Network",
    meaning: "Covers large geographical areas.",
    categories: ["others", "coc2"],
    notes: [
      {
        source: "COC 2",
        text: "Wide Area Network. A telecommunications network that extends over a large geographic area.",
      },
    ],
  },
  {
    id: "wav",
    term: "WAV",
    full: "Waveform Audio File Format",
    meaning: "Uncompressed audio format with high fidelity.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Waveform Audio File Format. Uncompressed audio format with high fidelity.",
      },
    ],
  },
  {
    id: "webgl",
    term: "WebGL",
    full: "Web Graphics Library",
    meaning:
      "JavaScript API for rendering interactive 3‑D graphics in the browser using GPU.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Web Graphics Library. JavaScript API for rendering interactive 3-D graphics in the browser using GPU.",
      },
    ],
  },
  {
    id: "webpack",
    term: "Webpack",
    full: "Webpack Module Bundler",
    meaning:
      "Build tool that bundles JavaScript, CSS, images into optimized assets.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Webpack Module Bundler. Build tool that bundles JavaScript, CSS, images into optimized assets.",
      },
    ],
  },
  {
    id: "wireframe",
    term: "Wireframe",
    full: "UI Wireframe",
    meaning: "Basic schematic layout of a web page or app screen.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "UI Wireframe. Basic schematic layout of a web page or app screen.",
      },
    ],
  },
  {
    id: "yarn",
    term: "Yarn",
    full: "Yarn Package Manager",
    meaning: "Fast, secure JavaScript package manager alternative to NPM.",
    categories: ["coc3", "others"],
    notes: [
      {
        source: "COC 3",
        text: "Yarn Package Manager. Fast, secure JavaScript package manager alternative to NPM.",
      },
    ],
  },
];
export const quizzes = {
  easy: [
    {
      question: "What does CPU stand for?",
      choices: [
        "Central Processing Unit",
        "Computer Program Unit",
        "Control Panel Utility",
      ],
      answer: 0,
    },
    {
      question: "What is the purpose of RAM?",
      choices: [
        "To store photos",
        "Temporary memory for active tasks",
        "To power the computer",
      ],
      answer: 1,
    },
    {
      question: "Which device is used to input text?",
      choices: ["Printer", "Monitor", "Keyboard"],
      answer: 2,
    },
    {
      question: "What is the file extension of a webpage?",
      choices: [".html", ".doc", ".exe"],
      answer: 0,
    },
    {
      question: "Which one is an output device?",
      choices: ["Scanner", "Mouse", "Speaker"],
      answer: 2,
    },
    {
      question: "Which device lets you move a cursor?",
      choices: ["Monitor", "Mouse", "Speaker"],
      answer: 1,
    },
    {
      question: "Which storage holds data permanently?",
      choices: ["RAM", "ROM", "Cache"],
      answer: 1,
    },
    {
      question: "What device displays the output visually?",
      choices: ["Keyboard", "Monitor", "CPU"],
      answer: 1,
    },
    {
      question: "Which device is used to print hard copies?",
      choices: ["Printer", "Scanner", "Projector"],
      answer: 0,
    },
    {
      question: "What is an example of system software?",
      choices: ["MS Word", "Windows OS", "Facebook App"],
      answer: 1,
    },
    {
      question: "What part of the computer stores data long-term?",
      choices: ["RAM", "Hard Drive", "Power Supply"],
      answer: 1,
    },
    {
      question: "Which part powers up the computer?",
      choices: ["CPU", "Monitor", "Power Supply Unit"],
      answer: 2,
    },
    {
      question: "Which is not an input device?",
      choices: ["Microphone", "Keyboard", "Speaker"],
      answer: 2,
    },
    {
      question: "What software lets users browse the web?",
      choices: ["Browser", "Compiler", "Media Player"],
      answer: 0,
    },
    {
      question: "What does GUI stand for?",
      choices: [
        "Graphical User Interface",
        "Global Unit Integration",
        "Graphic Usage Input",
      ],
      answer: 0,
    },
  ],
  medium: [
    {
      question:
        "Which of the following is a common file extension for spreadsheets?",
      choices: [".exe", ".xlsx", ".mp4"],
      answer: 1,
    },
    {
      question: "What does LAN stand for?",
      choices: [
        "Large Area Network",
        "Local Area Network",
        "Linked Access Node",
      ],
      answer: 1,
    },
    {
      question: "Which protocol is used to transfer web pages?",
      choices: ["HTTP", "FTP", "IP"],
      answer: 0,
    },
    {
      question: "Which device connects multiple computers in a LAN?",
      choices: ["Router", "Switch", "Firewall"],
      answer: 1,
    },
    {
      question: "What is the main purpose of an operating system?",
      choices: [
        "To manage computer hardware and software",
        "To design graphics",
        "To store photos",
      ],
      answer: 0,
    },
    {
      question: "Which of the following is NOT an operating system?",
      choices: ["Windows", "Linux", "Chrome"],
      answer: 2,
    },
    {
      question: "What is the function of a firewall?",
      choices: [
        "To cool the system",
        "To prevent unauthorized access",
        "To power the CPU",
      ],
      answer: 1,
    },
    {
      question: "What does URL stand for?",
      choices: [
        "Universal Resource Link",
        "Uniform Resource Locator",
        "User Requested Location",
      ],
      answer: 1,
    },
    {
      question: "Which memory is non-volatile?",
      choices: ["RAM", "Cache", "ROM"],
      answer: 2,
    },
    {
      question: "Which of the following is a valid IP address?",
      choices: ["192.168.1.1", "500.300.888.2", "1234.12.12"],
      answer: 0,
    },
  ],
  hard: [
    {
      question: "Which IP address class is reserved for multicast?",
      choices: ["Class A", "Class C", "Class D"],
      answer: 2,
    },
    {
      question: "What does POST stand for during boot-up?",
      choices: [
        "Power-On Self-Test",
        "Programmed Output Software Terminal",
        "Portable Operating System Tool",
      ],
      answer: 0,
    },
    {
      question: "Which logic gate outputs true only if both inputs are true?",
      choices: ["OR", "XOR", "AND"],
      answer: 2,
    },
    {
      question: "Which protocol is used to send emails?",
      choices: ["HTTP", "SMTP", "POP3"],
      answer: 1,
    },
    {
      question: "Which register stores the address of the next instruction?",
      choices: [
        "Instruction Register",
        "Memory Address Register",
        "Program Counter",
      ],
      answer: 2,
    },
    {
      question: "What does ALU stand for?",
      choices: [
        "Arithmetic Logic Unit",
        "Automated Link Utility",
        "Access Logic Unit",
      ],
      answer: 0,
    },
    {
      question: "In binary, what is the result of 1 AND 0?",
      choices: ["1", "0", "Undefined"],
      answer: 1,
    },
    {
      question:
        "Which component handles input/output control and device communication?",
      choices: ["CPU", "Northbridge", "I/O Controller"],
      answer: 2,
    },
    {
      question: "Which type of memory is fastest?",
      choices: ["Hard Drive", "Cache", "RAM"],
      answer: 1,
    },
    {
      question: "What does BIOS stand for?",
      choices: [
        "Basic Integrated Operating System",
        "Binary Input Output System",
        "Basic Input Output System",
      ],
      answer: 2,
    },
  ],
};
