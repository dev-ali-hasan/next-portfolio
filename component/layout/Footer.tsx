const Footer = () => {
  return (
    <footer>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1040"
        height="200"
        viewBox="0 0 1040 200"
        role="img"
        aria-label="ALI HASAN"
      >
        <defs>
          <linearGradient id="logoGrad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stop-color="#64BC41" />
            <stop offset="0.45" stop-color="#67C143" />
            <stop offset="0.75" stop-color="#9ED83F" />
            <stop offset="1" stop-color="#1B7D31" />
          </linearGradient>

          <filter id="softGlow" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="8" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <text
          x="0"
          y="138"
          font-family="Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial"
          font-size="132"
          font-weight="900"
          letter-spacing="8"
          fill="url(#logoGrad)"
          filter="url(#softGlow)"
        >
          ALI HASAN
        </text>
      </svg>
    </footer>
  );
};

export default Footer;
