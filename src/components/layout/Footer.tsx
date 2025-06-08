const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-6 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} NFT Reward Hub. All rights reserved.</p>
        <p className="mt-1">Conceptual project for smart contract reward systems.</p>
      </div>
    </footer>
  );
};

export default Footer;
