import child_process from 'child_process';
import os from 'os';

interface IProgram {
  name: string;
  url: string;
  process: child_process.ChildProcessWithoutNullStreams;
}

const programs: IProgram[] = [];

const main = () => {
  const nodeProcess = child_process.spawn(
    'node',
    ['./node/node_modules/ts-node/dist/bin.js', './node'],
    { detached: true }
  );

  programs.push({
    name: 'Node.js',
    url: 'http://localhost:8000',
    process: nodeProcess,
  });

  const phpProcess = child_process.spawn(
    'php',
    ['-S', 'localhost:8001', '-t', 'php'],
    { detached: true }
  );

  programs.push({
    name: 'PHP',
    url: 'http://localhost:8001',
    process: phpProcess,
  });

  const pythonProcess = child_process.spawn('python3', ['python/main.py'], {
    detached: true,
  });

  programs.push({
    name: 'Python',
    url: 'http://localhost:8002',
    process: pythonProcess,
  });

    const javaProcess = child_process.spawn(
      os.platform() === 'win32' ? '.\\java\\gradlew.bat' : './java/gradlew',
      ['-p', 'java', 'bootRun'],
      {
        detached: true,
      }
    );

    programs.push({
      name: 'Java',
      url: 'http://localhost:8003',
      process: javaProcess,
    });

  const csharpProcess = child_process.spawn(
    'dotnet',
    ['run', '--project', 'csharp'],
    { detached: true }
  );

  programs.push({
    name: 'C#',
    url: 'http://localhost:8004',
    process: csharpProcess,
  });

  programs.forEach((p) => {
    p.process.stdout.on('data', (data) => {
      console.log(`${p.name}: ${data}`);
    });

    p.process.stderr.on('data', (data) => {
      console.log(`${p.name}: ${data}`);
    });

    p.process.on('exit', (code) => {
      console.log(`${p.name} exited with code ${code}`);
      programs.splice(programs.indexOf(p), 1);
    });

    p.process.on('error', (err) => {
      console.log(`${p.name} error: ${err}`);
      programs.splice(programs.indexOf(p), 1);
    })
  });

  console.log(`
    Servers started:
  `);

  {
    let serverInfos = '';
    programs.forEach((p) => {
      serverInfos += `
        ${p.name} - ${p.url} | ${p.process.pid}\n`;
    });
    console.log(serverInfos);
  }
};

const stopAllPrograms = () => {
  programs.forEach((p) => {
    if (p.process.pid != null) {
      try {
        process.kill(p.process.pid);
      } catch (e) {
        if ((e as { code: string }).code !== 'ESRCH') {
          throw e;
        }
      }
    }
  });
};

const onExit = () => {
  stopAllPrograms();
  process.exit(0);
};

process.on('SIGINT', onExit);
process.on('SIGTERM', onExit);
process.on('SIGQUIT', onExit);
process.on('exit', () => {
  onExit();
});

try {
  main();
} catch (e) {
  console.log(e);
  stopAllPrograms();
  process.exit(1);
}
