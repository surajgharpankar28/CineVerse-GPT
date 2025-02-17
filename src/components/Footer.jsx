import { Github, Linkedin, Mail } from "lucide-react";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="footer w-full bg-black shadow ">
      <div className="md:px-12 mx-auto py-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-2">
          {/* Brand and Copyright */}
          <div className="text-white text-md">
            © {new Date().getFullYear()}{" "}
            <span className="font-bold text-yellow-400">CineVerse.</span> All
            rights reserved.
          </div>

          {/* Creator and Social Links */}
          <div className="flex items-center gap-4">
            <span className="text-white text-sm">
              Created by{" "}
              <span className="font-bold text-yellow-400">
                Suraj Gharpankar
              </span>
            </span>
            <div className="flex gap-3">
              <a
                href="https://github.com/surajgharpankar28"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Github size={20} />
              </a>
              <a
                href="https://www.linkedin.com/comm/mynetwork/discovery-see-all?usecase=PEOPLE_FOLLOWS&followMember=surajgharpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://x.com/surajgharpankar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <FaXTwitter size={20} />
              </a>
              <a
                href="mailto:surajgharpankar28@gmail.com"
                className="text-white hover:text-yellow-400 transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
