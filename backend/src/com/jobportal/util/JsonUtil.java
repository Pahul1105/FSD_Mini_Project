package com.jobportal.util;

// JsonUtil is a small helper class for working with JSON strings.
// Since we are building JSON manually (without Gson or Jackson library),
// we need to escape special characters to avoid breaking the JSON format.

public class JsonUtil {

    // This method escapes special characters in a string.
    // For example, if a job description has a quote ("), it would break the JSON.
    // So we replace " with \" to keep the JSON valid.
    public static String escape(String value) {
        if (value == null) {
            return "";
        }

        return value
                .replace("\\", "\\\\")   // escape backslash
                .replace("\"", "\\\"")    // escape double quote
                .replace("\n", "\\n")     // escape new line
                .replace("\r", "");       // remove carriage return
    }
}
