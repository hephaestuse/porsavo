import React, { useState } from "react";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react"; // آیکون‌ها

interface FormFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "password" | "file";
  description?: boolean;
}

function FormField<T extends FieldValues>({
  control,
  name,
  label,
  placeholder,
  description = false,
  type = "text",
}: FormFieldProps<T>) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="label">{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input
                className="input pr-10" // فضای اضافه برای آیکون
                placeholder={placeholder}
                {...field}
                type={type === "password" && !showPassword ? "password" : "text"}
              />
              {type === "password" && (
                <button
                  type="button"
                  className="absolute inset-y-0 right-2 flex items-center text-gray-400 hover:text-background"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              )}
            </div>
          </FormControl>
          {description && (
            <FormDescription className="text-amber-200">
              {type === "password" && "at least 6 characters"}
            </FormDescription>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

export default FormField;
