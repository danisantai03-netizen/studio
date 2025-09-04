
{ pkgs, lib, ... }:
{
  # Use a recent channel
  channel = "stable-24.11";

  # Tools available in the environment
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.typescript
    pkgs.nodePackages.firebase-tools
    pkgs.nodePackages.pnpm
    pkgs.git
    pkgs.jdk17
  ];

  # Useful editor/IDE extensions in Studio
  idx.extensions = [
    "dbaeumer.vscode-eslint"
    "esbenp.prettier-vscode"
    "bradlc.vscode-tailwindcss"
  ];

  # Environment variables (optional)
  env = {
    NEXT_TELEMETRY_DISABLED = "1";
  };

  # Install deps for each app when the workspace is first created
  idx.workspace.onCreate = {
    install-admin = "cd admin && (pnpm install || npm ci || npm install)";
    install-driver = "cd driver && (pnpm install || npm ci || npm install)";
    install-user = "cd user && (pnpm install || npm ci || npm install)";
    # Optionally open these files on first load
    default.openFiles = [
      "admin/package.json"
      "driver/package.json"
      "user/package.json"
      ".idx/dev.nix"
    ];
  };

  # Enable previews and wire each app
  idx.previews = {
    enable = true;
    previews = {
      admin = {
        manager = "web";
        cwd = "admin";
        # Pass flags through "npm run dev -- <flags>" so Next binds correctly
        command = ["npm" "run" "dev" "--" "-p" "$PORT" "-H" "0.0.0.0"];
        env = { };
      };
      driver = {
        manager = "web";
        cwd = "driver";
        command = ["npm" "run" "dev" "--" "-p" "$PORT" "-H" "0.0.0.0"];
        env = { };
      };
      user = {
        manager = "web";
        cwd = "user";
        command = ["npm" "run" "dev" "--" "-p" "$PORT" "-H" "0.0.0.0"];
        env = { };
      };
    };
  };
}
