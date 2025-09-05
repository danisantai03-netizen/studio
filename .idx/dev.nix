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
        # Preview untuk app Next.js di folder user/
        user = {
          # Gunakan skrip dev yang sudah ada
          command = ["npm" "run" "dev"];
          manager = "web";
          cwd = "user";
        };

        # Preview untuk backend Node/TS di folder Backend/
        backend = {
          # Gunakan skrip dev yang sudah ada
          command = ["npm" "run" "dev"];
          manager = "web";
          cwd = "Backend";
        };
      };
    };
  };
}
