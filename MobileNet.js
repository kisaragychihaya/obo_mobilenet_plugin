let define_mobilenet = function () {
    Blockly.Python.definitions_.mn = "from MobileNet import *"
};
Blockly.Blocks['mn_init'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("初始化变量")
            .appendField(new Blockly.FieldVariable("mobilenet"), "inst")
            .appendField("为物体识别器");
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff8000");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};
Blockly.Python['mn_init'] = function (block) {
    var variable_inst = Blockly.Python.variableDB_.getName(block.getFieldValue('inst'), Blockly.Variables.NAME_TYPE);
    // TODO: Assemble Python into code variable.
    define_mobilenet();
    var code = variable_inst + '=MobileNet()\n';
    return code;
};


Blockly.Blocks['mn_run'] = {
    init: function () {
        this.appendDummyInput()
            .appendField("从变量")
            .appendField(new Blockly.FieldVariable("mobilenet"), "inst");
        this.appendDummyInput()
            .appendField("获取")
            .appendField(new Blockly.FieldVariable("result_dict"), "result_dict")
            .appendField("结果迭代器");
        this.appendDummyInput()
            .appendField("结果弹出到网页")
            .appendField(new Blockly.FieldCheckbox("TRUE"), "play_back");
        this.appendStatementInput("sub_code")
            .setCheck(null);
        this.setPreviousStatement(true, null);
        this.setNextStatement(true, null);
        this.setColour("#ff8000");
        this.setTooltip("");
        this.setHelpUrl("");
    }
};

Blockly.Python['mn_run'] = function (block) {
    var variable_inst = Blockly.Python.variableDB_.getName(block.getFieldValue('inst'), Blockly.Variables.NAME_TYPE);
    var variable_keypoint_dict = Blockly.Python.variableDB_.getName(block.getFieldValue('result_dict'), Blockly.Variables.NAME_TYPE);
    var checkbox_play_back = block.getFieldValue('play_back') == 'TRUE';
    var statements_sub_code = Blockly.Python.statementToCode(block, 'sub_code');
    // TODO: Assemble Python into code variable.
    var code="";
    define_mobilenet();
    if (checkbox_play_back) {
        code = 'for ' + variable_keypoint_dict + ' in ' + variable_inst + '.process(playback=False,save_path="/tmp/ajax-cam.jpg"):\n';
    } else {
        code = 'for ' + variable_keypoint_dict + ' in ' + variable_inst + '.process(playback=False):\n';
    }
    if(!!statements_sub_code){
        code=code+statements_sub_code;
    }else {
        code=code+"  pass";
    }

    return code;
};
