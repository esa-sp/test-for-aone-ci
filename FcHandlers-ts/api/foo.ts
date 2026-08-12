// Node classic style handler — TypeScript version
// Tests FC handler TS precompile: esbuild transforms .ts → .js before fc-bundle scan
module.exports = (req: any, res: any) => {
  res.setHeader('content-type', 'application/json');
  res.end(JSON.stringify({ from: 'foo' }));
};
