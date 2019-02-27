/*
 * Copyright Camunda Services GmbH and/or licensed to Camunda Services GmbH
 * under one or more contributor license agreements. See the NOTICE file
 * distributed with this work for additional information regarding copyright
 * ownership. Camunda licenses this file to you under the Apache License,
 * Version 2.0; you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

let { promisify } = require('util');
let exec = promisify(require('child_process').exec);
let path = require('path');
let libs = ['vendor/superagent', 'vendor/fast-xml-parser'];

module.exports = function(grunt) {
  grunt.registerTask('compileLibs', function() {
    let done = this.async();

    let cmd = 'npm run build';
    if (process.platform === 'win32') {
      cmd = cmd.replace(/\//g, '\\');
    }

    let builds = libs.map(lib => {
      let libPath = path.join(__dirname, `../../${lib}/`);      
      return exec(cmd, { maxBuffer: 1024 * 500, cwd: libPath });
    });

    Promise.all(builds)
      .then(() => done())
      .catch(console.error);
  });
};
