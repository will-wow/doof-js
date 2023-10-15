declare module "pan-tilt-hat-2" {
  /**
   * Node Wrapper for Pimoroni Pan-Tilt HAT and Waveshare Pan-Tilt HAT
   * Copyright (c) 2017, 2018, 2020 Roger Hardiman
   *
   * The two Pan-Tilt HAT boards have some similarities and some differences
   * Both use standard servos for the Pan and Tilt positions and have 3 pin servo headers on the board
   *
   * Pimoroni use a PIC16F1503 microcontroller chip on the i2c bus to generate PWM signals for the servos
   * Pimoroni has a 3rd PWM output that can be connected to PWM controlled LEDs and Lights
   * Pimoroni also use the HAT ID EEPROM so this board can be auto-detected
   *
   * Waveshare use a standard PCA9685 LED/PWM chip on the i2c bus with PWM channel 0 and PWM channel 1 used for the seros
   * Waveshare also has a Light Sensor on the i2c bus
   *
   * The library autodetects the Pan/Tilt boards by checking the I2C addresses (0x15 and 0x40)
   * Pan=0, Tilt=0 has the camera looking forword.
   * Pan of +90 makes the Pi Camera look to the left
   * Pan of -90 makes the Pi Camera look to the right
   * Tilt of -80 makes the Pi Cammera look up
   * Tilt of +80 makes the Pi Cammera look down
   * (The positive and negative directions are the same as the Pimoroni Python driver)
   * After 2 seconds the servo PWM drive signal on the Pimoroni board is turned off to save power. This has not been implemented on the Waveshare or Arducam board yet
   */
  export default class PanTiltHAT {
    // Absolute Positioning
    pan(
      /** between -90 and 90 */
      angle: number
    ): void;
    servo_one(
      /** between -90 and 90 */
      angle: number
    ): void;
    tilt(
      /** between -90 and 90 */
      angle: number
    ): void;
    servo_two(
      /** between -90 and 90 */
      angle: number
    ): void;
    // CONTINUOUS MOVE API (START AND STOP COMMANDS)
    // The camera will start to turn at the specificated speed and continue to turn until told to stop
    /** start moving with a speed from 0 to 15. 0 means stop */
    pan_left(speed: number): void;
    /** start moving with a speed from 0 to 15. 0 means stop */
    pan_right(spee: number): void;
    /** start moving with a speed from 0 to 15. 0 means stop */
    tilt_up(speed: number): void;
    /** start moving with a speed from 0 to 15. 0 means stop */
    tilt_down(speed: number): void;
    /** stop the pan and the tilt */
    stop(): void;
    // Shutdown
    /** closes the class and frees resources */
    close(): void;
  }
}
