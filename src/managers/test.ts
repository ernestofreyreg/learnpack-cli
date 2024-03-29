/*

import * as path from 'path'
import * as shell from 'shelljs'
import * as fs from 'fs'
import { TestingError } from './errors'
import Console from '../utils/console'
import * as color from 'colors'
import bcActivity from './bcActivity.js'
import { CompilerError } from '../utils/errors'
import { ISocket } from '../models/socket'
import { IFile } from '../models/file'
import { IConfig } from '@oclif/config'

module.exports = async function ({ socket, files, config, slug }: {socket: ISocket, files: IFile[], config: IConfig, slug: string}) {

  const configPath = path.resolve(__dirname, `./config/tester/${config.tester}/${config.language}.config.js`);
  if (!fs.existsSync(configPath)) throw CompilerError(`Uknown testing engine for compiler: '${config.language}'`);

  const testingConfig = require(configPath)(files, config, slug);
  testingConfig.validate();

  if (config.ignoreTests) throw TestingError('Grading is disabled on learn.json file.');

  if (!fs.existsSync(`${config.dirPath}/reports`)) {
    fs.mkdirSync(`${config.dirPath}/reports`);
    Console.debug(`Creating the ${config.dirPath}/reports directory`);
  }

  Console.info('Running tests...');

  const command = await testingConfig.getCommand(socket)
  const { stdout, stderr, code } = shell.exec(command);

  if (code != 0) {
    const errors = typeof (testingConfig.getErrors === 'function') ? testingConfig.getErrors(stdout || stderr) : [];
    socket.log('testing-error', errors);
    console.log(errors.join('\n'))

    Console.error("There was an error while testing");
    bcActivity.error('exercise_error', {
      message: errors,
      name: `${config.tester}-error`,
      framework: config.tester,
      language: config.language,
      data: slug,
      compiler: config.compiler
    });
  }
  else {
    socket.log('testing-success', [stdout || stderr].concat(["😁Everything is amazing!"]));
    Console.success("Everything is amazing!");

    bcActivity.activity('exercise_success', {
      language: config.language,
      slug: slug,
      editor: config.editor,
      compiler: config.compiler
    });
    config.exercises = config.exercises.map(e => {
      if (e.slug === slug) e.done = true;
      return e;
    });
  }

  if (typeof testingConfig.cleanup !== "undefined") {
    if (typeof testingConfig.cleanup === 'function' || typeof testingConfig.cleanup === 'object') {
      const clean = await testingConfig.cleanup(socket);
      if (clean) {
        const { stdout, stderr, code } = shell.exec(clean);
        if (code == 0) {
          Console.debug("The cleanup command runned successfully");
        }
        else Console.warning("There is an error on the cleanup command for the test");
      }

    }
  }

  return true;
};

*/
