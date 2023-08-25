#!/usr/bin/env node
const program = require("commander");
const inquirer = require('inquirer')
const chalk = require("chalk");
const { init, list } = require('./flows')
const { main, templates, keyColor, valColor, cmdColor } = require('./config')
const { checkName, initTemplateDefault } = require('./utils')

console.log(`
 ___________________________________________________________________________________
|                                                                                   
|                                                                                   
|   ${chalk.hex(keyColor)('命令符')}: ${chalk.hex(cmdColor).bold('souldou')}        
|   ${chalk.hex(keyColor)('帮助')}: ${chalk.hex(valColor)('-h / --help')}           
|                                                                                   
|___________________________________________________________________________________
    
`);

program
    .version('0.0.1')
    .option("-i, --init", "初始化项目")
    .option("-V, --version", "查看版本号信息")
    .option("-l, --list", "查看可用模版列表")

program.parse(process.argv);

const options = program.opts();

options.init && inquirer.prompt(init).then(answers => {
    const { projectName, description, author, template } = answers;
    const { url, downLoadUrl, des } = templates[template];
    initTemplateDefault(answers, downLoadUrl);
})

options.list && list()