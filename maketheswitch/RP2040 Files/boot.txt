# boot.py (Standard Keyboard/Composite Method - Simplified for Android)
# This version simplifies the USB device by ONLY enabling the keyboard.
# This often resolves compatibility issues on Android devices.

import usb_hid

print("boot.py: Enabling standard Keyboard HID device ONLY.")

try:
    # Enable ONLY the Keyboard device to maximize compatibility.
    usb_hid.enable(
        (
            usb_hid.Device.KEYBOARD,
        )
    )
    print("boot.py: Standard Keyboard device enabled successfully.")
except Exception as e:
    print("--- boot.py ERROR ---")
    print(f"An unexpected error occurred: {e}")

