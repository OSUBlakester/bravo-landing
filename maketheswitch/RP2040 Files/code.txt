# code.py (Standard Keyboard Method)
# - For use with a standard boot.py that enables usb_hid.Device.KEYBOARD
# - This version sends a SPACEBAR press for maximum compatibility.
# - Corrected Keycode import and usage.

import time
import board
import digitalio
import usb_hid
from adafruit_hid.keyboard import Keyboard
from adafruit_hid.keycode import Keycode  # ** FIXED: Import Keycode **

print("Starting Standard Keyboard (Spacebar) Code...")

# --- Board-Specific Pin Configuration ---
# Set for your specific board and wiring!
# Example for Waveshare RP2040-Zero or Pico:
PHYSICAL_BUTTON_PIN = board.GP1

# --- Configuration for Physical Button Action ---
DEBOUNCE_DELAY = 0.03

# --- Setup Physical Button ---
try:
    physical_button = digitalio.DigitalInOut(PHYSICAL_BUTTON_PIN)
    physical_button.direction = digitalio.Direction.INPUT
    physical_button.pull = digitalio.Pull.UP
    print(f"Physical button initialized on pin: {PHYSICAL_BUTTON_PIN}")
except Exception as e:
    print(f"Error setting up physical button: {e}")
    while True: time.sleep(1) # Halt

# --- Initialize the Keyboard Class ---
keyboard = None
try:
    # The Keyboard class will find the standard keyboard device enabled in boot.py
    keyboard = Keyboard(usb_hid.devices)
    print("Standard Keyboard class initialized successfully!")
except Exception as e:
    print("--- CRITICAL ERROR ---")
    print(f"Could not initialize Keyboard class: {e}")
    print("Check that boot.py is enabling usb_hid.Device.KEYBOARD.")
    while True: time.sleep(1)


# --- Main Loop ---
if keyboard:
    print("Ready to read physical button to send SPACEBAR press.")

    last_physical_button_state = physical_button.value
    keyboard_key_is_pressed = False
    last_debounce_time = time.monotonic()

    while True:
        current_time = time.monotonic()
        current_physical_button_state = physical_button.value

        # --- Debounce and State Change Logic ---
        if current_physical_button_state != last_physical_button_state:
            if (current_time - last_debounce_time) > DEBOUNCE_DELAY:
                last_debounce_time = current_time

                if not current_physical_button_state:  # PRESSED
                    if not keyboard_key_is_pressed:
                        print("Physical button PRESSED. Sending SPACEBAR down.")
                        try:
                            keyboard.press(Keycode.SPACE) # ** FIXED: Changed Key to Keycode **
                            keyboard_key_is_pressed = True
                        except Exception as e_press:
                            print(f"ERROR sending KEY PRESS report: {e_press}")

                else:  # RELEASED
                    if keyboard_key_is_pressed:
                        print("Physical button RELEASED. Sending SPACEBAR up.")
                        try:
                            keyboard.release(Keycode.SPACE) # ** FIXED: Changed Key to Keycode **
                            keyboard_key_is_pressed = False
                        except Exception as e_release:
                            print(f"ERROR sending KEY RELEASE report: {e_release}")

                last_physical_button_state = current_physical_button_state

        time.sleep(0.001)

else:
    print("Halting because Keyboard was not initialized.")
