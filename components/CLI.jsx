"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Balancer from "react-wrap-balancer";
import { GetServerSideProps } from "next";

const CLI = ({ secrets }) => {
  const { secretOne, secretTwo } = secrets;
  var [command, setCommand] = useState("");
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [theme, setTheme] = useState("dark");

  const [output, setOutput] = useState([
    "Hii There!",
    "Type 'help' to get a list of available commands.",
    "Use ↑ and ↓ to navigate command history.",
  ]);

  //useRef to create a new reference
  const outputEndRef = useRef(null);
  const errorAudioRef = useRef(null);
  const startupAudioRef = useRef(null);
  const keyAudioRef = useRef(null);
  const activeAudioRef = useRef(null); // Tracks the most recent non-keypress sound

  //useEffect to use scrollToBottom feature
  useEffect(() => {
    // Scroll to the bottom whenever the output changes
    outputEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [output]);

  // Preload the error sound so it can play immediately on wrong commands.
  useEffect(() => {
    errorAudioRef.current = new Audio(
      "https://www.myinstants.com/media/sounds/faahhhhhhhh.mp3"
    );
    errorAudioRef.current.preload = "auto";

    // Play a startup sound once when the page loads.
    const startupAudio = new Audio("/salam-aleykum-memes-mp3cut.mp3");
    startupAudio.preload = "auto";
    startupAudioRef.current = startupAudio;

    playUiSound(startupAudio).catch(() => {
      // Autoplay may be blocked; will be retried on first user interaction.
      const retry = () => {
        playUiSound(startupAudioRef.current);
        window.removeEventListener("keydown", retry);
        window.removeEventListener("mousedown", retry);
      };
      window.addEventListener("keydown", retry, { once: true });
      window.addEventListener("mousedown", retry, { once: true });
    });
  }, []);

  // Use Web Audio to decode and play the local keypress sound (stored in public/).
  const audioContextRef = useRef(null);
  const keypressBufferRef = useRef(null);

  useEffect(() => {
    if (!window.AudioContext && !window.webkitAudioContext) return;

    const AudioContext = window.AudioContext || window.webkitAudioContext;
    const ctx = new AudioContext();
    audioContextRef.current = ctx;

    // Decode local audio file once so playback is instant.
    fetch("/dragon-studio-single-key-press-393908.mp3")
      .then((res) => res.arrayBuffer())
      .then((buffer) => ctx.decodeAudioData(buffer))
      .then((audioBuffer) => {
        keypressBufferRef.current = audioBuffer;
      })
      .catch(() => {
        // ignore; keypress sound will simply not play
      });
  }, []);

  const playKeySound = () => {
    const ctx = audioContextRef.current;
    const buffer = keypressBufferRef.current;

    if (!ctx || !buffer) return;

    if (ctx.state === "suspended") {
      ctx.resume().catch(() => {});
    }

    const source = ctx.createBufferSource();
    const gain = ctx.createGain();

    source.buffer = buffer;
    gain.gain.value = 0.25;

    source.connect(gain).connect(ctx.destination);
    source.start();
  };

  const stopActiveUiSound = () => {
    const current = activeAudioRef.current;
    if (current && !current.paused) {
      current.pause();
      current.currentTime = 0;
    }
  };

  const playUiSound = (audio, volume = 0.5) => {
    if (!audio) return;
    stopActiveUiSound();
    audio.volume = volume;
    activeAudioRef.current = audio;
    return audio.play().catch(() => {});
  };

  const commands = {
    help: (
      <div>
        <div className="text-blue-600 font-semibold">Available commands:</div>
        <div className="flex flex-col">
          <div className="flex gap-2 items-center">
            <Link href="https://facebook.com" target="_blank">
              <p className="text-orange-500"> about</p>
            </Link>{" "}
            <p className="font-thin">- Learn more about me</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-orange-500"> socials </p>{" "}
            <p className="font-thin">- Find me on the web</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-orange-500"> skills </p>{" "}
            <p className="font-thin">- Check out my technical skills</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-orange-500"> projects </p>{" "}
            <p className="font-thin">- View some of my cool projects</p>
          </div>
          <div className="flex gap-2 items-center">
            <p className="text-orange-500"> resume </p>{" "}
            <p className="font-thin">- Show my resume</p>
          </div>

          <div className="flex gap-2 items-center">
            <p className="text-orange-500"> clear </p>{" "}
            <p className="font-thin">- Clear the terminal</p>
          </div>
        </div>
      </div>
    ),

    about: (
      <div className="max-w-prose text-justify">
        <Balancer>
          <span className="text-orange-500">Hi, I’m Abdul Rehman</span>, a Full-Stack Developer with a strong interest in building scalable, modern web applications and solving real-world problems through technology.
          <br />
          I primarily work with JavaScript ecosystems including <span className="text-lime-500">React, Next.js, and the MERN stack</span>, and I enjoy creating clean, efficient, and user-focused digital products.
          <br />
          My experience includes developing dynamic web platforms, integrating complex backend services, and designing responsive interfaces that deliver smooth user experiences.
          <br />
          I’ve built projects ranging from real-time applications to large-scale web platforms, focusing on performance optimization, system architecture, and seamless API integrations.
          <br />
          One key project was an educational marketplace platform where I helped integrate a headless architecture combining an LMS with a CMS, enabling scalable course management and modern frontend experiences.
          <br />
          Beyond coding, I’m passionate about continuously improving my skills, exploring new tools in the web ecosystem, and building projects that push my technical abilities further.
          <br />
          My goal is to contribute to impactful products while growing as an engineer and problem solver.
        </Balancer>
      </div>
    ),
    socials: (
      <div>
        <span>Find me on:</span>
        <div className="flex gap-2">
          <Link
            href="https://github.com/abdul-rehman411"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-500">GitHub</span>
          </Link>
          <Link
            href="https://twitter.com/abdulrehman411"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-500">Twitter</span>
          </Link>
          <Link
            href="mailto:abdulrehman4070411@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="text-blue-500">Email</span>
          </Link>
        </div>
      </div>
    ),

    skills: (
      <pre>
        <span className="text-orange-500">Technical Skills:</span>
        <ul className="pl-9">
          <li>
            <span className="text-orange-500">Frameworks and Libraries:</span>{" "}
            React.js, Next.js, Node.js, Express.js, Tailwind CSS, Bootstrap,
            WordPress
          </li>
          <li>
            <span className="text-orange-500">Databases:</span> MongoDB, MySQL,
            PostgreSQL
          </li>
          <li>
            <span className="text-orange-500">Languages:</span> JavaScript (ES6+),
            PHP, HTML5, CSS3
          </li>
          <li>
            <span className="text-orange-500">Version Control:</span> Git,
            GitHub
          </li>
          <li>
            <span className="text-orange-500">Miscellaneous:</span> REST APIs,
            Firebase, NPM, Postman, Vercel
          </li>
        </ul>
      </pre>
    ),

    projects: (
      <pre className="whitespace-pre-wrap break-words">
        <span className="text-orange-500">Projects</span>
        <br />
        <span className="text-green-500">
          <a
            href="https://iqrasity.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Iqrasity — Next-Gen Educational Marketplace
          </a>
        </span>{" "}
        - A modern headless educational marketplace integrating Moodle LMS with
        Strapi CMS. Built a scalable Next.js frontend with hybrid data
        orchestration, dynamic mega-menu navigation, SSO authentication,
        automated LMS-CMS synchronization, and advanced SEO optimization for
        thousands of course pages.
        <br />
        <br />
        <span className="text-green-500">
          <a
            href="https://github.com/Abdul-Rehman411/whatchat"
            target="_blank"
            rel="noopener noreferrer"
          >
            WhatChat
          </a>
        </span>{" "}
        - A full-stack real-time chat application built with the MERN stack
        featuring Socket.IO messaging, JWT authentication, Cloudinary file
        uploads, and a responsive UI inspired by WhatsApp.
        <br />
        <br />
        <span className="text-green-500">
          <a
            href="https://tailorease.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
          >
            TailorEase Platform
          </a>
        </span>{" "}
        - A custom tailoring platform connecting customers with tailors for
        personalized orders, featuring 3D virtual try-on, AI chatbot support,
        wallet payouts, and real-time order tracking.
        <br />
        <br />
        <span className="text-green-500">
          <a
            href="https://medalignsolutions.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            MedAlign Solutions
          </a>
        </span>{" "}
        - A healthcare portfolio website built in WordPress with responsive
        layouts, chatbot integration, and consultation request forms.
        <br />
        <br />
        <span className="text-green-500">
          <a
            href="https://vltadvisors.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            VLT Advisers
          </a>
        </span>{" "}
        - A financial consulting website built with WordPress featuring
        responsive layouts, modern design, and interactive client inquiry forms.
        <br />
      </pre>
    ),

    resume: (
      <pre>
        <span className="text-orange-500">Resume: </span>
        <span className="text-green-500">
          <a
            href="resume.pdf" // Change this to your actual resume path
            target="_blank"
            rel="noopener noreferrer"
            className="underline"
          >
            View Resume (PDF)
          </a>
        </span>
      </pre>
    ),

    clear: "clear",
  };

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.style.setProperty("--bg-color", "#010101");
      // document.documentElement.style.setProperty('--text-color', '#f1f1f1');
    }
    if (theme === "light") {
      document.documentElement.style.setProperty("--bg-color", "#940044"); //940064
      // document.documentElement.style.setProperty('--text-color', '#f1faf1');
    }
  }, [theme]);

  //handle every new keypress
  const handleKeyPress = (event) => {
    const shouldPlayKeySound =
      event.key.length === 1 ||
      event.key === "Backspace" ||
      event.key === "Enter" ||
      event.key === " ";

    if (shouldPlayKeySound) {
      playKeySound();
    }

    if (event.key == "Enter") {
      if (command === secretOne || command === "light") {
        setTheme("light");
      } else if (command === secretTwo || command === "dark") {
        setTheme("dark");
      }
    }

    if (event.key == "Tab") {
      event.preventDefault();

      const matchingCommands = Object.keys(commands).filter((cmd) =>
        cmd.startsWith(command.toLowerCase())
      ); //finds the number of matching commands

      if (matchingCommands.length >= 1) {
        setCommand(matchingCommands[0]); //sets first suggestion to command
      } //checks for number of matching commands available
    }
    //Arrow key navigation
    if (event.key == "ArrowUp" || event.key == "ArrowDown") {
      event.preventDefault();

      setHistoryIndex((historyIndex) => {
        if (event.key == "ArrowUp") {
          const newIndex = Math.max(historyIndex - 1, 0);
          setCommand(history[newIndex] || "");
          return newIndex;
        } else if (event.key == "ArrowDown") {
          const newIndex = Math.min(history.length - 1, historyIndex + 1);
          setCommand(history[newIndex] || "");
          return newIndex;
        }
        return historyIndex;
      });
    }
  };

  //handle every new key change/updation
  const handleChange = (event) => {
    setCommand(event.target.value); //updates command state as user types
  };

  const handleCommand = (e) => {
    e.preventDefault();

    //handle whitespaces--------------------------------------------------//
    command = command.trim();

    let newOutput = [...output];

    setHistory([...history, command]);
    setHistoryIndex(history.length);

    if (commands[command]) {
      if (command === "clear") {
        // Play clean-up sound on clear command
        const cleanupAudio = new Audio("/sad-meow-song.mp3");
        playUiSound(cleanupAudio, 0.5);

        newOutput = [
          "Welcome to my portfolio!",
          "Type 'help' to get a list of available commands.",
          "Use ↑ and ↓ to navigate command history.",
        ];
      } else if (command === "help") {
        // Play the help sound
        const helpAudio = new Audio("/acha-ji-aisa-hai-kya.mp3");
        playUiSound(helpAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      } else if (command === "about") {
        // Play the chalo sound for about command
        const chaloAudio = new Audio("/chalo.mp3");
        playUiSound(chaloAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      } else if (command === "skills") {
        // Play the chalo sound for skills command
        const chaloAudio = new Audio("/chalo.mp3");
        playUiSound(chaloAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      } else if (command === "projects") {
        // Play the counter sound for projects command
        const counterAudio = new Audio("/counter-ok-elts-go.mp3");
        playUiSound(counterAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      } else if (command === "resume") {
        // Play the FBI sound for resume command
        const fbiAudio = new Audio("/fbi-open-up_dwLhIFf.mp3");
        playUiSound(fbiAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      }
       else if (command === "socials") {
        // Play the FBI sound for resume command
        const fbiAudio = new Audio("/man-snoring-meme_ctrllNn.mp3");
        playUiSound(fbiAudio, 0.5);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      }
      else {
        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-purple-600">{command}</span>
          </div>,
          commands[command],
          <br />
        );
      }
    } else {
      if (
        command == secretOne ||
        command == secretTwo ||
        command === "light" ||
        command === "dark"
      ) {
        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            <span className="text-yellow-200">{command}</span>
          </div>
        );
      } else {
        // Play error sound for unknown commands
        playUiSound(errorAudioRef.current);

        newOutput.push(
          <div>
            <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
            {command}
          </div>,
          <div>
            <span className="text-red-700">command not found</span>&nbsp;
            {command}
          </div>,
          <br />
        );
      }
    }

    setOutput(newOutput);
    setCommand("");
  };

  return (
    <div className="text-white  font-mono flex flex-col justify-start items-start h-screen ">
      {output.map((line, index) => (
        <div
          key={index}
          className={`whitespace-pre-wrap
           ${
             typeof line == "string" &&
             (line.includes("help") || line.includes("commands"))
               ? "text-orange-400"
               : "text-white"
           }`}
        >
          {line}
        </div>
      ))}
      {/* ################################   Use Reference    #####################################*/}
      <div ref={outputEndRef} />
      {/* ################################   Use Reference    #####################################*/}{" "}
      {/* keeps the view scrolled to the bottom  */}
      <form onSubmit={handleCommand} className="flex">
        <span className="text-cyan-400">visitor@abdulrehman~$</span>&nbsp;
        <input
          type="text"
          value={command}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
          className="bg-transparent outline-none text-purple-600 flex-1"
          autoFocus
        />
      </form>
    </div>
  );
};

export default CLI;
