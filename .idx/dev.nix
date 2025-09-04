{ pkgs, ... }: {
  channel = "stable-24.11";

  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.firebase-tools
    pkgs.git
  ];

  idx.previews = {
    enable = true;
    previews = {
      user = {
        manager = "web";
        cwd = "user";
        command = [
          "npm" "run" "dev" "--" "--turbopack" "-p" "$PORT" "-H" "0.0.0.0"
        ];
      };
    };
  };

  idx.workspace.onCreate = {
    install-user = "cd user && npm install";
  };
}
