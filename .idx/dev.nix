{ pkgs, ... }: {
  channel = "stable-23.11";

  packages = [
    pkgs.nodejs-18_x
    pkgs.yarn
    pkgs.pnpm
    pkgs.firebase-tools
    pkgs.git
    pkgs.watchman
  ];

  env = {
    NODE_ENV = "development";
  };

  idx = {
    extensions = [
      "ms-vscode.vscode-typescript-next"
      "esbenp.prettier-vscode"
      "dbaeumer.vscode-eslint"
    ];

    previews = {
      enable = true;

      previews = {
        frontend = {
          manager = "web";
          cwd = "frontend";
          command = [
            "npm"
            "run"
            "dev"
            "--"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
        };

        backend = {
          manager = "web";
          cwd = "backend";
          command = [
            "firebase"
            "emulators:start"
            "--import=./emulator-data"
            "--export-on-exit"
          ];
        };
      };
    };
  };

  workspace = {
    onCreate = {
      install_frontend = "cd frontend && npm install";
      install_backend = "cd backend && npm install";
    };

    onStart = {
      dev_frontend = "cd frontend && npm run dev";
      dev_backend = "cd backend && firebase emulators:start";
    };
  };
}
