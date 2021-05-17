<?php

/**
 * This is a helper file that helps with objects and classes
 *
 * @link     https://codeigniter4.github.io/CodeIgniter4/general/helpers.html
 * @link     https://opensource.org/licenses/MIT
 * @license  MIT License
 *
 * @package  RESTful\Helpers
 * @author   Jason Napolitano <jnapolitanoit@gmail.com>
 * @updated  Jan 16th, 2020
 *
 */

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('get_namespace') ) {
    /**
     * Retrieves the namespace for a provided class
     *
     * @param string $class Get the namespace of this class
     *
     * @return string
     *
     * @throws ReflectionException
     */
    function get_namespace(string $class): string
    {
        $reflection = new ReflectionClass($class);
        return $reflection->getNamespaceName();

    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('get_fqcn') ) {
    /**
     * Retrieves the FQCN for a provided class
     *
     * @param string $class Get the FQCN of this class
     *
     * @return string
     *
     * @throws ReflectionException
     */
    function get_fqcn(string $class): string
    {
        $reflection = new ReflectionClass($class);
        return '\\' . $reflection->getNamespaceName() . '\\' . basename($class);

    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('get_class_path') ) {
    /**
     * Determine file path of a class
     *
     * @param string $class
     *
     * @return string
     *
     * @throws ReflectionException
     */
    function get_class_path(string $class)
    {
        $reflection = new ReflectionClass($class);
        return $reflection->getFileName();
    }
}

// ----------------------------------------------------------------------------
// If the function does not exist, let's create it!
if ( ! function_exists('load_from_class') ) {

    /**
     * A utility function for loading the values of class properties
     * and functions
     *
     * @param string        $item  The class property/method to load and return
     * @param object|string $class The class file to load the property/method from
     *
     * @return mixed|null
     *
     * @throws ReflectionException
     */
    function load_from_class(string $item, string $class = null)
    {
        // Instantiate the new $class
        $newClass = new $class();

        // If $item is a property in $class
        if ( ! method_exists($class, $item) && property_exists($class, $item) ) {
            // Return its value
            return $newClass->$item;

            // If $item is a method in $class
        } else if ( ! property_exists($class, $item) && method_exists($class, $item) ) {
            // Return its value
            return $newClass->$item();

            // Else if nothing applies, log an error message and return null
        } else {
            $message = get_fqcn($class) . "::{$item} not found";
            log_message('INFO', $message);

            return null;
        }
    }
}
