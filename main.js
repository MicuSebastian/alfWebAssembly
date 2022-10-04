"use strict";

var fs = require ('fs');

var data = fs.readFileSync (process.argv[2], 'UTF-8');
data = JSON.parse (data);

var wa = "";
var waFunctions = "";
var waVariables = "";
var waFEntry = "";

var calcAddr = 0;
function writeAssembly(node) {
    let scrp = node.symbol_table.script;
    scrp.variable_data_space = 0;
    scrp.variable_stack_space = 0;
    node.strings = {};

    for (let stat in scrp.variables) {
        let a = scrp.variables[stat];
        if (a.type === "int" || a.type === "real" || a.type === "bool" || a.type === "character") {
            a.size = 4;
            a.allocation = "global";
            waVariables += '(global $' + stat + ' (mut i32) (i32.const 0))\n';
        }
        if (a.type == "string") {
            a.size = 256;
            a.allocation = "data";
            a.address = calcAddr;
            calcAddr += a.size;
            scrp.variable_data_space += a.size;
        }
    }

    if (node.ast.script.statements[0] !== undefined) {
        var nrString = 0;
        for (let stat of node.ast.script.statements) {
            if (stat.type === "string") {
                node.strings[stat.value] = nrString*256;
                nrString ++;
            }
        }
        if (node.ast.script.statements[0].from !== undefined && node.symbol_table.function_writenstr !== undefined) {
            node.strings[node.ast.script.statements[0].from.value] = nrString;
        }
    }

    if (node.symbol_table.function_writeint !== undefined) {
        waFunctions += '(import "io" "writeint" (func $writeint\n';
        let a = node.symbol_table.function_writeint;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "param";
                waFunctions += '(param $' + stat + ' i32)\n';
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "param";
            }
        }
        waFunctions += ')\n)\n';
    }

    if (node.symbol_table.function_writefloat !== undefined) {
        let a = node.symbol_table.function_writefloat;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "param";
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "param";
            }
        }
    }

    if (node.symbol_table.function_readint !== undefined) {
        let a = node.symbol_table.function_readint;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "param";
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "param";
            }
        }
    }

    if (node.symbol_table.function_writechar !== undefined) {
        let a = node.symbol_table.function_writechar;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "param";
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "param";
            }
        }
    }

    if (node.symbol_table.function_writenstr !== undefined) {
        let a = node.symbol_table.function_writenstr;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "param";
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "param";
            }
        }
    }

    if (node.symbol_table.if_14 !== undefined) {
        let a = node.symbol_table.if_14;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "if_14_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "if_14_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.if_18 !== undefined) {
        let a = node.symbol_table.if_18;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "if_18_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "if_18_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.if_23 !== undefined) {
        let a = node.symbol_table.if_23;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "if_23_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "if_23_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.if_22 !== undefined) {
        let a = node.symbol_table.if_22;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "if_22_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "if_22_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.if_21 !== undefined) {
        let a = node.symbol_table.if_21;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "if_21_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "if_21_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.for_14 !== undefined) {
        let a = node.symbol_table.for_14;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "for_14_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "for_14_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.for_18 !== undefined) {
        let a = node.symbol_table.for_18;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "for_18_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "for_18_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.for_22 !== undefined) {
        let a = node.symbol_table.for_22;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "for_22_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "for_22_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.for_9 !== undefined) {
        let a = node.symbol_table.for_9;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "for_9_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "for_9_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.for_19 !== undefined) {
        let a = node.symbol_table.for_19;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                b.allocation = "relocated";
                b.title = "for_19_" + stat;
            }
            if (b.type == "string") {
                b.size = 256;
                b.allocation = "relocated";
                b.title = "for_19_" + stat;
            }
            scrp.variables[b.title] = {
                "type": b.type,
                "line": b.line,
                "parameter": b.parameter,
                "size": b.size,
                "allocation": "local"
            };
        }
    }

    if (node.symbol_table.function_base16 !== undefined) {
        let a = node.symbol_table.function_base16;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
            if (b.type == "string") {
                b.size = 256;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
        }
    }

    if (node.symbol_table.function_sum !== undefined) {
        let a = node.symbol_table.function_sum;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
            if (b.type === "string") {
                b.size = 256;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
            if (b.type === "array") {
                b.size = 20;
                b.allocation = "stack";
                b.address = 0;
                a.variable_stack_space += b.size;
                scrp.types.array.size = 20;
            }
        }
    }

    if (node.symbol_table.function_fibonacci !== undefined) {
        let a = node.symbol_table.function_fibonacci;
        a.variable_data_space = 0;
        a.variable_stack_space = 0;
        for (let stat in a.variables) {
            let b = a.variables[stat];
            if (b.type === "int" || b.type === "real" || b.type === "bool" || b.type === "character") {
                b.size = 4;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
            if (b.type === "string") {
                b.size = 256;
                if (b.parameter === true) {
                    b.allocation = "param";
                } else {
                    b.allocation = "local";
                }
            }
            if (b.type === "array") {
                b.size = 20;
                b.allocation = "stack";
                b.address = 0;
                a.variable_stack_space += b.size;
                scrp.types.array.size = 20;
            }
        }
    }

    if (Object.keys(scrp.functions).length == 0) {
        waFEntry += '(func $entry\n';
        waFEntry += '(local $base_pointer i32)\n';
        waFEntry += ')\n';
    } else {
        waFEntry += '(func $entry\n';
        waFEntry += '(local $base_pointer i32)\n';
        if (node.symbol_table.function_writeint !== undefined && node.ast.script.statements[0].from !== undefined) {
            waFEntry += 'i32.const ' + node.ast.script.statements[0].from.value + '\n';
            waFEntry += 'global.set $n\nglobal.get $n\n';
            waFEntry += 'call $writeint\n';
        }
        waFEntry += ')\n';
    }
}

writeAssembly (data);

fs.writeFileSync (process.argv[3], JSON.stringify (data, null, 4));

wa = "(module\n";
wa += waFunctions;
wa += '(import "io" "mem" (memory 1))\n';
wa += '(global $stack_pointer (mut i32) (i32.const 0))\n';
wa += waVariables;
wa += waFEntry;
wa += '(start $entry)\n';
wa += '(global $strings_start i32 (i32.const 0))\n';
wa += ")";
fs.writeFileSync (process.argv[4], wa);