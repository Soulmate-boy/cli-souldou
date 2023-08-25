
const { templates } = require('./config')

module.exports = {
    init: [
        {
            type: 'input',
            name: 'projectName',
            message: '请输入项目名称'
        },
        {
            type: "input",
            name: "description",
            message: "请输入项目简介",
        },
        {
            type: "input",
            name: "author",
            message: "请输入作者名称",
        },
        {
            type: 'list',
            name: 'template',
            message: "选择其中一个作为项目模版",
            choices: Object.keys(templates),
        }
    ],
    list: () => {
        for (let key in templates) {
            console.log(`${key} : ${templates[key].des || null}`);
        }
    }
}