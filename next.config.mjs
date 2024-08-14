/** @type {import('next').NextConfig} */
import createNextJsObfuscator from "nextjs-obfuscator";

const withNextJsObfuscator = createNextJsObfuscator({
  optionsPreset: "high-obfuscation",
});
const nextConfig = withNextJsObfuscator({
  output: "export",
});

export default nextConfig;
