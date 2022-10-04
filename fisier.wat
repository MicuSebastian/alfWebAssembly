(module
(import "io" "writeint" (func $writeint
(param $nr i32)
)
)
(import "io" "mem" (memory 1))
(global $stack_pointer (mut i32) (i32.const 0))
(global $a (mut i32) (i32.const 0))
(func $entry
(local $base_pointer i32)
i32.const false
global.set $n
global.get $n
call $writeint
)
(start $entry)
(global $strings_start i32 (i32.const 0))
)