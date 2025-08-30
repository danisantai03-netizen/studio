
import React from "react";

type Props = {
    onTermsClick: () => void;
    onLogoutClick: () => void;
}

export const ProfileFooter: React.FC<Props> = ({ onTermsClick, onLogoutClick }) => {
  return (
    <div className="px-3 mt-6 mb-4 text-center text-xs text-muted-foreground">
      <button onClick={onTermsClick} className="underline hover:text-foreground transition-colors">Terms & Conditions</button>
      <span className="mx-2">•</span>
      <button onClick={onLogoutClick} className="underline hover:text-foreground transition-colors">Logout</button>
    </div>
  );
};
