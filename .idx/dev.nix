
{ pkgs, ... }: {
  # Versi Nix channel
  channel = "stable-24.11";

  # Tools yang tersedia di environment
  packages = [
    pkgs.nodejs_20
    pkgs.nodePackages.firebase-tools
    pkgs.git
  ];

  # Konfigurasi Preview
  idx.previews = {
    enable = true;
    previews = {
      user = {
        manager = "web";
        cwd = "user";
        command = [
          "npm" "run" "dev" "--" "-p" "$PORT" "-H" "0.0.0.0"
        ];
      };
    };
  };

  # Lifecycle hooks: install dependency otomatis
  idx.workspace.onCreate = {
    install-user = "cd user && npm install";
  };
}
