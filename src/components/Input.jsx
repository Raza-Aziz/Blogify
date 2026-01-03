import React from "react";
// Import forwardRef to pass refs from parent to child
import { forwardRef, useId } from "react";

/**
 * Input component
 * - Uses forwardRef so parent components can directly access the <input> element
 * - Supports label rendering
 * - Automatically links label and input via a unique ID
 */
const Input = forwardRef(function Input(
  { label, type = "text", className = "", ...props },
  ref, // ref forwarded from parent component
) {
  // Generate a unique ID for this input instance
  // Ensures label is correctly associated with input (accessibility)
  const id = useId();

  return (
    // Wrapper to ensure input takes full width
    <div className="w-full">
      {/* Render label only if `label` prop is provided */}
      {label && (
        <label
          className="inline-block mb-1 pl-1"
          htmlFor={id} // Links label to input using the generated ID
        >
          {label}
        </label>
      )}

      <input
        type={type} // Input type (text, password, email, etc.)
        ref={ref} // Attach forwarded ref to input
        id={id} // Same ID used by label for accessibility
        // Default styling + optional extra classes from parent
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none
          focus:bg-gray-50 duration-200 border border-gray-200 w-full
          ${className}`}
        // Spread remaining props (onChange, value, placeholder, disabled, etc.)
        {...props}
      />
    </div>
  );
});

// Export component for reuse
export default Input;
