
import React from "react";

type Props = {
    onTermsClick: () => void;
}

export const ProfileFooter: React.FC<Props> = ({ onTermsClick }) => {
  const currentYear = new Date().getFullYear();
  return (
    <div className="px-3 mt-8 mb-4 text-center text-xs text-muted-foreground">
      <button onClick={onTermsClick} className="underline hover:text-foreground transition-colors">Terms & Conditions</button>
      <span className="mx-2">•</span>
      <span>© {currentYear} GreenEarth. All rights reserved.</span>
    </div>
  );
};
