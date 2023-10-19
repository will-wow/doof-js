# Doof JS

TypeScript re-implementation of doof.

## Development

### Setup

1. Install node

   ```bash
   wget https://nodejs.org/dist/v18.18.2/node-v18.18.2-linux-armv7l.tar.xz
   tar -x -f node-v18.18.2-linux-armv7l.tar.xz
   cd node-v18.18.2-linux-armv7l
   rm -f CHANGELOG.md LICENSE README.md
   sudo cp -R -f * /usr/local
   cd ..
   rm -rf node-v18.18.2-linux-armv7l
   rm node-v18.18.2-linux-armv7l.tar.xz
   sudo npm i -g npm
   ```

1. Set up Inter-Integrated Circuit connection

   With Raspbian Jessie 2015-11-21 or later the complete configuration can be performed with the raspi-config software configuration tool which can be run from a terminal window as follows:

   ```bash
   sudo raspi-config
   ```

   In the raspi-config user interface navigate to Interfacing Options >> I2C and answer the question "Would you like the ARM I2C interface to be enabled?" with <Yes>. After the next reboot user pi will be able to use the I2C bus without root privileges.

   See https://github.com/fivdi/i2c-bus/blob/HEAD/doc/raspberry-pi-i2c.md for more info

1. Install deps for the [canvas](https://github.com/Automattic/node-canvas) polyfill for face-api.js.

   ```bash
   sudo apt-get install build-essential libcairo2-dev libpango1.0-dev libjpeg-dev libgif-dev librsvg2-dev
   ```

1. Install deps

   ```bash
   npm install
   ```

1. Build [tfjs-node](https://www.npmjs.com/package/@tensorflow/tfjs-node#rebuild-the-package-on-raspberry-pi) from source

   Per this is required for running on a Pi.

   ```bash
   npm rebuild @tensorflow/tfjs-node --build-from-source
   ```

### Dev

```bash
npm run dev
```
