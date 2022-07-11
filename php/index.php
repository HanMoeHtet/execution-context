<?php

class Counter
{
  static $count = 0;

  public function __construct()
  {
    self::$count++;
  }
}
new Counter();

echo "Count: " . Counter::$count . "\n";
