# Doof JS

TypeScript re-implementation of doof.

## Development

1. Set up `pnpm`
1. Install deps

   ```bash
   pnpm install
   ```

1. Set up Inter-Integrated Circuit connection

   With Raspbian Jessie 2015-11-21 or later the complete configuration can be performed with the raspi-config software configuration tool which can be run from a terminal window as follows:

   ```bash
   sudo raspi-config
   ```

   In the raspi-config user interface navigate to Interfacing Options >> I2C and answer the question "Would you like the ARM I2C interface to be enabled?" with <Yes>. After the next reboot user pi will be able to use the I2C bus without root privileges.

   See https://github.com/fivdi/i2c-bus/blob/HEAD/doc/raspberry-pi-i2c.md for more info
