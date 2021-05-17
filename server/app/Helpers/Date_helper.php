<?php

use Carbon\Carbon;

//------------------------------------------------------

/**
 * @param null $format
 *
 * @return mixed
 */
function today($format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    return Carbon::today()->format($format);
}

//------------------------------------------------------

/**
 * @param null $format
 *
 * @return mixed
 */
function tomorrow($format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    return Carbon::tomorrow()->format($format);
}

//------------------------------------------------------

/**
 * @param null $format
 *
 * @return mixed
 */
function yesterday($format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    return Carbon::yesterday()->format($format);
}

//------------------------------------------------------

/**
 * @param        $day
 * @param string $datetime
 * @param string $format
 *
 * @return mixed
 */
function nextDay($day, string $datetime = null, string $format = null)
{
    $day = strtoupper($day);
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    $days = [
        'SUNDAY'    => Carbon::SUNDAY,
        'MONDAY'    => Carbon::MONDAY,
        'TUESDAY'   => Carbon::TUESDAY,
        'WEDNESDAY' => Carbon::WEDNESDAY,
        'THURSDAY'  => Carbon::THURSDAY,
        'FRIDAY'    => Carbon::FRIDAY,
        'SATURDAY'  => Carbon::SATURDAY,
    ];
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->next($days[$day])->format($format);
}

//------------------------------------------------------

/**
 * @param null $datetime
 *
 * @return mixed
 */
function dayOfWeek($datetime = null)
{
    $days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    $datetime = $datetime ?: Carbon::now();
    return $days[Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->dayOfWeek];
}

//------------------------------------------------------

/**
 * @param null $datetime
 * @param bool $timestamp
 *
 * @return mixed
 */
function ukDate($datetime = null, $timestamp = false)
{
    $datetime = $datetime ?: Carbon::now();
    $timestamp = $timestamp ? 'd/m/Y H:ia' : 'd/m/Y';
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->format($timestamp);
}

//------------------------------------------------------

/**
 * @param null $datetime
 * @param bool $timestamp
 *
 * @return mixed
 */
function ukDateToDate($datetime = null, $timestamp = false)
{
    $datetime = $datetime ?: Carbon::now();
    $format = $timestamp ? 'd/m/Y H:i:s' : 'd/m/Y';
    $timestamp = $timestamp ? 'Y-m-d H:i:s' : 'Y-m-d';
    return Carbon::createFromFormat($format, $datetime)->format($timestamp);
}

//------------------------------------------------------

/**
 * @param $datetime
 *
 * @return mixed
 */
function humanDate($datetime)
{
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->diffForHumans();
}

//------------------------------------------------------

/**
 * @param $datetime
 *
 * @return mixed
 */
function age($datetime)
{
    return Carbon::createFromFormat('Y-m-d', $datetime)->age;
}

//------------------------------------------------------

/**
 * @param null $datetime
 *
 * @return mixed
 */
function weekend($datetime = null)
{
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->isWeekend();
}

//------------------------------------------------------

/**
 * @param $datetime
 *
 * @return mixed
 */
function diffInDays($datetime)
{
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->diffInDays();
}

//------------------------------------------------------

/**
 * @param        $years
 * @param string $datetime
 * @param string $format
 *
 * @return mixed
 */
function addYears($years, string $datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->addYears($years)->format($format);
}

//------------------------------------------------------

/**
 * @param        $months
 * @param string $datetime
 * @param string $format
 *
 * @return mixed
 */
function addMonths($months, string $datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->addMonths($months)->format($format);
}

//------------------------------------------------------

/**
 * @param        $weeks
 * @param string $datetime
 * @param string $format
 *
 * @return mixed
 */
function addWeeks($weeks, string $datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->addWeeks($weeks)->format($format);
}

//------------------------------------------------------

/**
 * @param        $days
 * @param string $datetime
 * @param string $format
 *
 * @return mixed
 */
function addDays($days, string $datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->addDays($days)->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfDay($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfDay()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfDay($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfDay()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfWeek($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfWeek()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfWeek($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfWeek()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfMonth($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfMonth()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfMonth($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfMonth()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfYear($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfYear()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfYear($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfYear()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfDecade($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfDecade()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfDecade($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfDecade()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function startOfCentury($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->startOfCentury()->format($format);
}

//------------------------------------------------------

/**
 * @param null   $datetime
 * @param string $format
 *
 * @return mixed
 */
function endOfCentury($datetime = null, string $format = null)
{
    $format = $format ?: 'Y-m-d H:i:s';
    $datetime = $datetime ?: Carbon::now();
    return Carbon::createFromFormat('Y-m-d H:i:s', $datetime)->endOfCentury()->format($format);
}