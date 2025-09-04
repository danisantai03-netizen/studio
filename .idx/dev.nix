{ pkgs, ... }: {
  # Gunakan channel stable terbaru yang didukung Studio
  channel = "stable-24.11";

  # System tools yang dibutuhkan
  packages = [
    pkgs.nodejs_20
    pkgs.git
  ];

  # Env global untuk workspace (opsional)
  env = {
    NODE_ENV = "development";
    NEXT_TELEMETRY_DISABLED = "1";
  };

  idx = {
    # Extension editor (opsional tapi berguna)
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
      "ms-vscode.vscode-typescript-next"
    ];

    workspace = {
      onCreate = {
        default.openFiles = [
          "src/app/page.tsx"
        ];
      };
    };

    # ==== PREVIEWS ====
    previews = {
      enable = true;
      previews = {
        # Preview untuk app Next.js (user)
        user = {
          # Override script dev supaya listen ke $PORT & 0.0.0.0
          command = ["npm" "run" "dev" "--" "-p" "$PORT" "-H" "0.0.0.0"];
          manager = "web";
          cwd = "."; # root project
        };

        # Preview untuk backend Node/TS (lihat bagian 2)
        backend = {
          command = ["npm" "run" "dev:api" "--" "--port" "$PORT" "--host" "0.0.0.0"];
          manager = "web";
          cwd = "api"; # folder backend
        };
      };
    };
  };
}
