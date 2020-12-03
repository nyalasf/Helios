/*
    MIT License

    Copyright (c) 2020 Aigars A

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
*/

/**
 * The main class for handling all of the commands.
 */
class Commands {
    /**
     * @param {*} helios The main class of the client.
     */
    constructor(helios) {
        this.helios = helios;
        this.registered = {};

        this.register();
    }

    /**
     * Registers all of the commands which are contained in /commands
     */
    register = () => {
        this.registered = {};

        this.helios.helpers.readDirectory("./commands/", "js", (command) => {
            let module = require(`../commands/${command}`);
            this.registered[module.info.name] = module;
        });
    };

    /**
     * Returns the command module for the specific name.
     * @param {*} name The name of the command to retrieve.
     */
    get = (name) => {
        for (var key in this.registered) {
            if (key == name && this.registered.hasOwnProperty(key)) {
                return this.registered[key];
            }
        }
    };
}

module.exports = Commands;
