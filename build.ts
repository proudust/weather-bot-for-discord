import { colors } from "https://deno.land/x/cliffy@v0.20.1/ansi/mod.ts";
import { build } from "https://deno.land/x/esbuild@v0.12.15/mod.js";
import httpPlugin from "https://deno.land/x/esbuild_plugin_http_fetch@v1.0.2/index.js";
import gasPlugin from "https://esm.sh/esbuild-gas-plugin@0.3.2/mod.ts";

async function gasBuild() {
  const bundleTask = build({
    bundle: true,
    charset: "utf8",
    entryPoints: ["src/index.ts"],
    outfile: "dist/out.js",
    target: "es2019",
    plugins: [
      httpPlugin,
      gasPlugin,
    ],
  });
  const copyTask = async (): Promise<void> => {
    await Deno.mkdir("dist", { recursive: true });
    await Deno.copyFile("src/appsscript.json", "dist/appsscript.json");
  };
  await Promise.all([bundleTask, copyTask()]);
  console.log(colors.bold.green("✓"), " Build successful");
}

await gasBuild();

Deno.exit(0);
